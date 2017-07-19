import React, { Component } from 'react'

import {StyleSheet, Text, View, Image, Button, Dimensions, ActivityIndicator} from 'react-native'
import {Bar, Pie} from 'react-native-pathjs-charts'
import { FormattedWrapper, FormattedNumber, FormattedDate, FormattedRelativeTime, FormattedMessage } from 'react-native-globalize'

import store from './store'
import {colors, styles} from './styles'

var {height, width} = Dimensions.get('window')

export default class ChartDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            label:null,
            value:null,
            data:this.props.navigation.state.params,

            series:null,
        }
    }
    componentDidMount(){
        var self=this
    }
    getChart(chart){
        if (chart.type=='bar')
            return this.getChart_bar(chart)
        else if (chart.type=='pie')
            return this.getChart_pie(chart)
        else
            return this.getChart_bar(chart)
    }
    getChart_options(){
        return {
            width: width-40,
            height: height-180,
            margin: {top: 20, left: 20, bottom: 20, right: 20},
            color: '#4A4A4A',
            animate: {type: 'oneByOne', duration: 500, fillTransition: 3},
            legendPosition: 'topLeft',
        }
    }
    getChart_labelOptions(){
        return { fontFamily:'Arial', fontSize:18, fontWeight:true, fill:'#34495E'}
    }
    getChart_pie(chart){
        let data=chart.series
        let options = Object.assign({
                r: 50, R: (width-40)/2,
                label:this.getChart_labelOptions(),
                legendPosition: 'topLeft'
                },
                this.getChart_options()
        )
        return (
            <View style={{marginLeft:20,}}>
                <Pie data={data} options={options} accessorKey="value" onPress={(item) => {this.setActiveSerie(item)}}  />
            </View>
        )
    }
    setActiveSerie(item){
        this.setState({label:item.label, value:item.value})
    }
    getChart_bar(chart){
        let data=[chart.series]
        let options = Object.assign({
            gutter: 10,
            axisX: {
                showAxis:false, showLines:false, showLabels:false, showTicks:true, zeroAxis:false, orient:'bottom',
                label: this.getChart_labelOptions()
            },
            axisY: {
                showAxis:false, showLines:false, showLabels:false, showTicks:false, zeroAxis:false, orient: 'left',
                label: this.getChart_labelOptions()
            }
        }, this.getChart_options()
        )
        return (<Bar data={data} options={options} accessorKey='value' onPress={(item) => {this.setActiveSerie(item)}}/>)
    }
    render() {
        if (this.state.serires==null){
            return (
                <View style={{backgroundColor:colors.white, flex:1,}}>
                    <ActivityIndicator animating={true} style={styles.throbber} size="large"/>
                </View>
            )
        }

        var chart=this.getChart(data)
        return (
            <FormattedWrapper locale={store.i18n.locale} currency={store.i18n.currency} messages={store.i18n.messages}>
            <View style={{flex:1, top:0, bottom:0, left:0, right:0,}}>

                {chart}

                <View style={styles.legendcontainer}>
                    <Text style={styles.legend_label}> {this.state.label} </Text>
                    {this.state.value!=null?<FormattedNumber useGrouping={true} style={styles.legend_value} value={this.state.value}/>:<Text/>}

                </View>
            </View>
            </FormattedWrapper>
        )
    }
}
