import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, FlatList, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FormattedWrapper, FormattedNumber, FormattedDate, FormattedRelativeTime, FormattedMessage } from 'react-native-globalize'

import {colors, styles} from './styles'
import {messages, getTranslationByLang} from './i18n'

export class StarredCharts extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.tabContent}> Starred Charts </Text>
            </View>
            )
        }
    }
export class MyCharts extends React.Component {
    constructor(props){
        super(props)
    }
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
                        <Text style={styles.lvsubtitle}>
                            <FormattedMessage message='byAuthor' author={item.author} time={<FormattedRelativeTime unit='best' value={new Date(item.timestamp)}/>}/>
                        </Text>
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
            <FormattedWrapper locale={store.i18n.locale} currency={store.i18n.currency} messages={messages}>
                <View style={{backgroundColor:colors.white, flex:1,}}>
                    <FlatList data={store.data} renderItem={({item}) => this.renderRow(item)} ItemSeparatorComponent={this.renderSeparator}/>
                </View>
            </FormattedWrapper>
        )
    }
    chart_onClick = (item) => {
        this.props.navigation.navigate('chartDetails', { ...item })
    }
}
