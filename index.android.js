import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, Button, FlatList, TouchableHighlight, Dimensions, Platform} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import { Bar, Pie } from 'react-native-pathjs-charts'


const colors={
    black:'black',
    darkgray:'#4A4A4A',
    lightgray:'#9B9B9B',
    white:'white',
}

var {height, width} = Dimensions.get('window')

var store={
    user:'rotoxl@gmail.com',
    data:[{
        key:'x0xaw10',
        title:'Programming languages (TIOBE index)',
        author:'rotoxl@gmail.com',
        timestamp:'2017/07/04 20:54:00',
        type:'bar',
        icon:'ios-stats',//Ionicons
        series:[
            {label:'Java',               value:14.49},
            {label:'C',                  value:6.84},
            {label:'C++',                value:5.72},
            {label:'Python',             value:4.33},
            {label:'C#',                 value:3.53},
            {label:'Visual Basic .NET',  value:3.11},
            {label:'Javascript',         value:3.02},
            {label:'PHP',                value:2.77},
            {label:'Perl',               value:2.30},
            {label:'Assymbly language',  value:2.25},
            {label:'Ruby',               value:2.22},
            ],
    },{
        key:'ca122010',
        title:'Databases',
        author:'ermolina@e-externas.aena.es',
        timestamp:'2017/07/08 20:00:00',
        type:'pie',
        icon:'ios-pie',//Ionicons
        series:[
            {label:'Oracle',                value:1374.88},
            {label:'MySQL',                 value:1349.11},
            {label:'Microsoft SQL Server',  value:1226.00},
            {label:'PostgreSQL',            value:369.44},
            {label:'MongoDB',               value:332.77},
            {label:'DB2',                   value:191.25},
            {label:'Microsoft Access',      value:126.13},
            {label:'Cassandra',             value:124.12},
            {label:'Redis',                 value:121.51},
            {label:'Elasticsearch',         value:115.98},
            {label:'SQLite',                value:113.86},
            ]
        }
    ]
}

class MyCharts extends React.Component {
    renderSeparator = () => {
        return (
            <View style={{height: 1, width: "88%", backgroundColor: "#CED0CE", marginLeft: "11%"}} />
            )
        }
    renderRow(item){
        return (
                <TouchableHighlight activeOpacity={.9} underlayColor="#e9e9ef" onPress={() => {this.chart_onClick(item)}}>
                <View style={styles.lvrow} key={item.key}>
                    <View style={styles.lvicon}>
                        <Icon name={item.icon} size={26} color={colors.darkgray} style={{alignSelf:'center', }}/>
                    </View>
                    <View style={styles.lvtextcontainer}>
                        <Text style={styles.lvtitle}>{item.title}</Text>
                        <Text style={styles.lvsubtitle}>Created by {item.author}</Text>
                    </View>
                    <View style={styles.lvbadge}>
                        <Icon name='ios-alert-outline' size={18} color={colors.darkgray} style={{alignSelf:'center', }}/>
                    </View>
                </View>
                </TouchableHighlight>
            )
        }
    render() {
        return (
            <View style={{backgroundColor:colors.white, flex:1,}}>
                <FlatList data={store.data} renderItem={({item}) => this.renderRow(item)} ItemSeparatorComponent={this.renderSeparator}/>
            </View>
            )
        }
    chart_onClick = (item) => {
        this.props.navigation.navigate('chartDetails', { ...item })
        }
    }
class StarredCharts extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.tabContent}> Starred Charts </Text>
            </View>
            )
        }
    }
class NewChart extends React.Component{
    render() {
        return (<Text style={styles.tabContent}> NewChart </Text>)
        }
    }
class ChartDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            label:'',
            value:''
            }
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
                r: 50, R: 150,
                label:this.getChart_labelOptions(),
                legendPosition: 'topLeft'
                },
                this.getChart_options()
            )
        return (
            <View style={{marginLeft:20,}}>
                <Pie data={data} options={options} accessorKey="value" onPress={(item) => {this.setActiveSerie(item)}}  />
            </View>)
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
        // return (<Text style={styles.tabContent}> ChartDetails {this.props.navigation.state.params.title} </Text>)
        var data=this.props.navigation.state.params
        var chart=this.getChart(data)
        return (
            <View style={{flex:1, top:0, bottom:0, left:0, right:0,}}>

                {chart}

                <View style={styles.legendcontainer}>
                    <Text style={styles.legend_label}> {this.state.label} </Text>
                    <Text style={styles.legend_value}> {this.state.value} </Text>
                </View>
            </View>)
        }
    }

const Tabs=TabNavigator({
     starredCharts: {
         screen: MyCharts,
         navigationOptions: {
             tabBarLabel: 'My Charts',
             tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-contact":"ios-contact-outline"} size={26} color={tintColor}/>)
             }
         },
     myCharts: {
         screen: StarredCharts,
         navigationOptions: {
             tabBarLabel: 'Starred',
             tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-star":"ios-star-outline"} size={26} color={tintColor}/>)
             }
         },
     popularCharts: {
         screen: StarredCharts,
         navigationOptions: {
             tabBarLabel: 'Popular',
             tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-chatbubbles":"ios-chatbubbles-outline"} size={26} color={tintColor}/>)
             }
         },
     }, {
     tabBarOptions: {
         activeTintColor: colors.darkgray, inactiveTintColor:colors.lightgray,
         style:{backgroundColor:'white', },
         indicatorStyle:{backgroundColor:colors.darkgray},
         swipeEnabled:true,
         },
     })
const stack=StackNavigator(
    {
    tabs:{
        screen:Tabs,
        navigationOptions: ({navigation}) => ({
            title: 'Chart everything',
            tabBarIcon: <Icon name='ios-star' size={26} color={colors.darkgray}/>,
            headerRight:Platform.OS=='ios'?
                        (<Button title='Add' color={colors.darkgray} onPress={function(){navigation.navigate('newChart')}} />):
                        (<TouchableHighlight style={{width:30, height:35, paddingTop:7,}} onPress={function(){navigation.navigate('newChart')}} >
                            <Icon name='ios-add-circle-outline' size={26} color={colors.darkgray}/>
                        </TouchableHighlight>
                        )
            }),
        },
    newChart:{
        screen:NewChart,
        navigationOptions: ({ navigation }) => ({
            title:'New chart',
            headerTintColor:colors.darkgray,
            }),
        },
    chartDetails:{
        screen:ChartDetails,
        navigationOptions: ({ navigation }) => {
            var params=navigation.state.params
            return {
                title:params.title,
                headerTintColor:colors.darkgray,
                }
            }
        },
    },{
        header:{
            style:{
                elevation:0, //es un bug de la versión que salga la sombra, en teoría lo arreglarán
                shadowOpacity: 0,
                backgroundColor:colors.white,
            }
        },
    }
)
// StackNavigator.navigationOptions = {
//     header: {
//         style: {
//             elevation: 0,
//             backgroundColor: 'red',
//         }
//     },
//     headerStyle:{
//         elevation: 0,
//         backgroundColor: 'red',
//     }
// }


const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
        },
    tabContent:{
        marginTop:32,
        marginLeft:3,
        },
    lvrow:{left:0, right:0, flexDirection: 'row'},
        lvicon:{width:40, height:60, paddingTop:15,},
        lvtextcontainer:{flex:1, flexDirection: 'column'},
            lvtitle:{flex:1, color:colors.blackgray, fontSize:14, marginTop:10,},
            lvsubtitle:{flex:1, color:colors.lightgray, fontSize:12, },
        lvbadge:{width:40, height:60, paddingTop:15,},
    legendcontainer:{
        position:'absolute', bottom:0, left:0, right:0, height:60,
        flex:1, flexDirection:'row',
        backgroundColor:colors.darkgray,
        padding:20,
        },
    legend_label:{
        color:colors.white,
        fontSize:14,
        width:'80%',
        },
    legend_value:{
        color:colors.white,
        fontSize:14,
        width:'20%',
        textAlign:'right',
        }

    })


AppRegistry.registerComponent('chartEverything', () => stack)
