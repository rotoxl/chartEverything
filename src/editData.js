import React, { Component } from 'react'

import {StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions,
    KeyboardAvoidingView, ScrollView} from 'react-native'
import {colors, styles} from './styles'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'

export default class editData extends React.Component{
    constructor(props){
        super(props)
        this.store=props.navigation.store

        this.state={
            
        }
    }
    render() {
        console.disableYellowBox = true
        return (
            <KeyboardAvoidingView style={[styles.form, {backgroundColor:'white', flex:1}]} >
                <ScrollView>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
