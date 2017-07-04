import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, Button} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

const colors={
    black:'black',
    darkgray:'#4A4A4A',
    lightgray:'#9B9B9B',
    white:'white',
}

class MyCharts extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.tabContent}> My Charts </Text>
                <Button
                    onPress={() => this.chart_onClick()}
                    title="Chart details"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />
            </View>
            )
        }
    chart_onClick = () => {
        this.props.navigation.navigate('chartDetails')
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
             tabBarIcon: ({ tintColor }) => (<Image source={require('./res/user.png')} style={[styles.icon, {tintColor: tintColor}]} />)
             }
         },
     myCharts: {
         screen: StarredCharts,
         navigationOptions: {
             tabBarLabel: 'Starred',
             tabBarIcon: ({ tintColor }) => (<Image source={require('./res/star.png')} style={[styles.icon, {tintColor: tintColor}]} />)
             }
         },
     popularCharts: {
         screen: StarredCharts,
         navigationOptions: {
             tabBarLabel: 'Popular',
             tabBarIcon: ({ tintColor }) => (<Image source={require('./res/popular.png')} style={[styles.icon, {tintColor: tintColor}]} />)
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
            tabBarIcon: ({ tintColor }) => <Image source={require('./res/star.png')} style={[styles.icon, {tintColor: tintColor}]} />,
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
    tabBar:{}
    })


AppRegistry.registerComponent('chartEverything', () => stack)
