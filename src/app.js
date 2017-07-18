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
import {StarredCharts, MyCharts} from './chartListings'

function getTranslation(k){
    // return getTranslationByLang(store.i18n.locale, k)
    // return getTranslationByLang('en', k)
    return k
}

const tabs=TabNavigator({
     myCharts: {
         screen: MyCharts,
         navigationOptions: ({navigation, navigationOptions}) => {
             return {
                 tabBarLabel: store.getTranslation('myCharts'),
                 tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-contact":"ios-contact-outline"} size={26} color={tintColor}/>)
             }
         }
     },
     starredCharts: {
         screen: StarredCharts,
         navigationOptions: ({navigation, navigationOptions}) => {
             return {
                 tabBarLabel: store.getTranslation('starred'),
                 tabBarIcon: ({ focused, tintColor }) => (<Icon name={focused?"ios-star":"ios-star-outline"} size={26} color={tintColor}/>)
             }
         }
     },
     popularCharts: {
         screen: StarredCharts,
         navigationOptions: ({navigation, navigationOptions}) => {
            return {
                tabBarLabel: store.getTranslation('popular'),
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
                            (<Button title={store.getTranslation('add')} color={colors.darkgray} onPress={function(){navigation.navigate('newChart')}} />):
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
                title:getTranslation('newChart'),
                headerTintColor:colors.darkgray,
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
                            (<Button title={store.getTranslation('info')} color={colors.darkgray} onPress={function(){navigation.navigate('chartInfo')}} />):
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
                title:getTranslation('chartInfo'),
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
