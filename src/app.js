import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, FlatList, TouchableHighlight, Dimensions, Platform} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import { FormattedWrapper, FormattedNumber, FormattedDate, FormattedRelativeTime, FormattedMessage } from 'react-native-globalize'

var {height, width} = Dimensions.get('window')

import store from './store'
import {colors, styles} from './styles'
import {messages, getTranslationByLang} from './i18n'

import ChartInfo from './chartInfo'
import ChartDetails from './chartDetails'
import NewChart from './newChart'
import editData from './editData'
import {StarredCharts, MyCharts} from './chartListings'

const tabs=TabNavigator({
     myCharts: {
         screen: MyCharts,
         navigationOptions: ({navigation, navigationOptions}) => {
             return {
                 tabBarLabel: store.getTranslation('My Charts'),
                 tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-contact":"ios-contact-outline"} size={26} color={tintColor}/>)
             }
         }
     },
     starredCharts: {
         screen: StarredCharts,
         navigationOptions: ({navigation, navigationOptions}) => {
             return {
                 tabBarLabel: store.getTranslation('Starred'),
                 tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-star":"ios-star-outline"} size={26} color={tintColor}/>)
             }
         }
     },
     popularCharts: {
         screen: StarredCharts,
         navigationOptions: ({navigation, navigationOptions}) => {
            return {
                tabBarLabel: store.getTranslation('Popular'),
                tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-chatbubbles":"ios-chatbubbles-outline"} size={26} color={tintColor}/>)
            }
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
const stack=StackNavigator({
    tabs:{
        screen:tabs,
        navigationOptions: ({navigation, navigationOptions}) => {
            var params=navigation.state.params
            navigation.store=navigationOptions.store

            return {
                title: 'Chart everything',
                tabBarIcon: <Icon name='ios-star' size={26} color={colors.darkgray}/>,
                headerRight:Platform.OS=='ios'?
                            (<Button title={store.getTranslation('Add')} color={colors.darkgray} onPress={function(){navigation.navigate('newChart')}} />):
                            (<TouchableHighlight style={{width:30, height:35, paddingTop:7,}} onPress={function(){navigation.navigate('newChart')}} >
                                <Icon name='ios-add-circle-outline' size={26} color={colors.darkgray}/>
                            </TouchableHighlight>
                            )
            }
        }
    },
    newChart:{
        screen:NewChart,
        navigationOptions: ({navigation, navigationOptions}) => {
            navigation.store=navigationOptions.store
            return {
                //title:store.getTranslation('New chart'),
                headerTintColor:colors.darkgray,
                headerRight:(<TouchableHighlight style={{width:40, height:35, paddingTop:7, marginRight:8, fontSize:16}} onPress={function(){
                                    try{
                                        store.saveNewChart()
                                        navigation.pop()
                                        }
                                    catch (IncompleteData){
                                        }
                            }}>
                                <Text>{store.getTranslation('SAVE')}</Text>
                            </TouchableHighlight>
                        )
            }
        }
    },
    editData:{
        screen:editData,
        navigationOptions: ({navigation, navigationOptions}) => {
            navigation.store=navigationOptions.store
            return {
                headerTintColor:colors.darkgray,
                // headerRight:(   <TouchableHighlight style={{width:40, height:35, paddingTop:7, marginRight:8, fontSize:16}} onPress={function(){
                //                     try{
                //                         store.setChartData()
                //                         navigation.pop()
                //                         }
                //                     catch (IncompleteData){
                //                         }
                //                 }} >
                //                     <Text>{store.getTranslation('SAVE')}</Text>
                //                 </TouchableHighlight>
                //                )
            }
        }
    },
    chartDetails:{
        screen:ChartDetails,
        navigationOptions: ({navigation, navigationOptions}) => {
            var params=navigation.state.params
            navigation.store=navigationOptions.store

            return {
                title:params.title,
                headerTintColor:colors.darkgray,
                headerRight:Platform.OS=='ios'?
                            (<Button title={store.getTranslation('Info')} color={colors.darkgray} onPress={function(){navigation.navigate('chartInfo')}} />):
                            (<TouchableHighlight style={{width:30, height:35, paddingTop:7,}} onPress={function(){navigation.navigate('chartInfo')}} >
                                <Icon name='ios-information-circle-outline' size={26} color={colors.darkgray}/>
                            </TouchableHighlight>
                            )
                }
            },
    },
    chartInfo:{
        screen:ChartInfo,
        navigationOptions: ({ navigation, navigationOptions }) => {
            navigation.store=navigationOptions.store
            return {
                title:store.getTranslation('Chart info'),
                headerTintColor:colors.darkgray,
            }
        }
    }
},{
    headerMode: 'screen',
    navigationOptions:{
        store:store,
        headerStyle:{
            elevation:0, //next gen hack
            shadowOpacity: 0,
            backgroundColor:colors.white,
        },
    }
})
export const app=stack
