import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, FlatList, TouchableHighlight, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FormattedWrapper, FormattedNumber, FormattedDate, FormattedRelativeTime, FormattedMessage } from 'react-native-globalize'

import {colors, styles} from './styles'


class ListingRow extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        var item=this.props.item
        return (
            <TouchableHighlight activeOpacity={.9} underlayColor="#e9e9ef" onPress={() => {this.chart_onClick(item)}}>
                <View style={styles.lvrow} key={item.key}>
                    <View style={styles.lvicon}>
                        <Icon name={item.icon} size={26} color={colors.darkgray} style={{alignSelf:'center', }}/>
                    </View>
                    <View style={styles.lvtextcontainer}>
                        <Text style={styles.lvtitle}>{item.title}</Text>
                        <Text style={styles.lvsubtitle}>
                            <FormattedMessage message='byAuthor' author={item.author} time={<FormattedRelativeTime unit='best' value={item.timestamp?new Date(item.timestamp):new Date() }/>}/>
                        </Text>
                    </View>
                    <View style={styles.lvbadge}>
                        <Icon name='ios-alert-outline' size={18} color={colors.darkgray} style={{alignSelf:'center', }}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
class ListSep extends React.Component{
    render(){
        return (
            <View style={{height: 1, width: "88%", backgroundColor: "#CED0CE", marginLeft: "11%"}} />
        )
    }
}


export class MyCharts extends React.Component {
    constructor(props){
        super(props)

        this.state={
            data:null,
        }
        this.store=props.navigation.store
    }
    componentDidMount(){
        var self=this
        this.store.data_getMyCharts(function(data){
            self.setState({data:data})
        })
    }
    renderSeparator = () => {
        return (
            <ListSep/>
        )
    }
    renderRow(item){
        return (
            <ListingRow item={item}/>
        )
    }
    render() {
        if (this.state.data==null){
            return (
                <View style={{backgroundColor:colors.white, flex:1,}}>
                    <ActivityIndicator animating={true} style={styles.throbber} size="large"/>
                </View>
            )
        }
        else {
            return (
                <FormattedWrapper locale={store.i18n.locale} currency={store.i18n.currency} messages={store.i18n.messages}>
                    <View style={{backgroundColor:colors.white, flex:1,}}>
                        <FlatList data={this.state.data} renderItem={({item}) => this.renderRow(item)} ItemSeparatorComponent={this.renderSeparator}/>
                    </View>
                </FormattedWrapper>
            )
        }
    }
    chart_onClick = (item) => {
        this.props.navigation.navigate('chartDetails', { ...item })
    }
}

export class StarredCharts extends React.Component {
    constructor(props){
        super(props)

        this.state={
            data:null,
        }
        this.store=props.navigation.store
    }
    componentDidMount(){
        var self=this
        this.store.data_getStarredCharts(function(data){
            self.setState({data:data})
            // alert(JSON.stringify(data))
        })
    }
    renderSeparator = () => {
        return (
            <ListSep/>
        )
    }
    renderRow(item){
        return (
            <ListingRow item={item}/>
        )
    }
    render() {
        if (this.state.data==null){
            return (
                <View style={{backgroundColor:colors.white, flex:1,}}>
                    <ActivityIndicator animating={true} style={styles.throbber} size="large"/>
                </View>
            )
        }
        else {
            return (
                <FormattedWrapper locale={store.i18n.locale} currency={store.i18n.currency} messages={store.i18n.messages}>
                    <View style={{backgroundColor:colors.white, flex:1,}}>
                        <FlatList data={this.state.data} renderItem={({item}) => this.renderRow(item)} ItemSeparatorComponent={this.renderSeparator}/>
                    </View>
                </FormattedWrapper>
            )
        }
    }
    chart_onClick = (item) => {
        this.props.navigation.navigate('chartDetails', { ...item })
    }
}
