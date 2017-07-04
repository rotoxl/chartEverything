import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, Button, FlatList, TouchableHighlight} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const colors={
    black:'black',
    darkgray:'#4A4A4A',
    lightgray:'#9B9B9B',
    white:'white',
}


var store={
    user:'rotoxl@gmail.com',
    data:[{
        key:'x0xaw10',
        title:'Programming languages (TIOBE index)',
        author:'rotoxl@gmail.com',
        timestamp:'2017/07/04 20:54:00',
        type:'bar',
        icon:'ios-stats',//Ionicons
        series:[{
            label:'Java', value:14.49,
            label:'C',    value:6.84,
            label:'C++', value:5.72,
            label:'Python', value:4.33,
            label:'C#', value:3.53,
            label:'Visual Basic .NET', value:3.11,
            label:'Javascript', value:3.02,
            label:'PHP', value:2.77,
            label:'Perl', value:2.30,
            label:'Assymbly language', value:2.25,
            label:'Ruby', value:2.22,
        }],
    },{
        key:'ca122010',
        title:'Databases',
        author:'ermolina@e-externas.aena.es',
        timestamp:'2017/07/08 20:00:00',
        type:'pie',
        icon:'ios-pie',//Ionicons
        series:[]
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
            <View>
            <FlatList data={store.data} renderItem={({item}) => this.renderRow(item)} ItemSeparatorComponent={this.renderSeparator}/>
            </View>
            )
        }
    chart_onClick = (item) => {
        this.props.navigation.navigate('chartDetails', item.title)
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
    render() {
        return (<Text style={styles.tabContent}> ChartDetails </Text>)
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
         activeTintColor: colors.darkgray,
         inactiveTintColor:colors.lightgray,
         activeBackgroundColor:colors.white,
         inactiveBackgroundColor:colors.white,
         swipeEnabled:true,
         },
     })
const stack=StackNavigator({
    tabs:{
        screen:Tabs,
        navigationOptions: ({navigation}) => ({
            title: 'Chart everything',
            tabBarIcon: ({ tintColor }) => <Icon name="star" size={26} color={tintColor}/>,

            headerRight:(<Button title='Add' color={colors.darkgray} onPress={function(){
                 navigation.navigate('newChart')
                }} />),
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
        navigationOptions: ({ navigation }) => ({
            title:'Chart details',
            headerTintColor:colors.darkgray,
            }),
        },
    },
)

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

    })


AppRegistry.registerComponent('chartEverything', () => stack)
