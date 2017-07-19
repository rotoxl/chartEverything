import React, { Component } from 'react'

import {StyleSheet, Text, View, TextInput, Picker, TouchableOpacity, Dimensions,
    KeyboardAvoidingView, ScrollView} from 'react-native'
import {colors, styles} from './styles'
import Icon from 'react-native-vector-icons/Ionicons'

export default class NewChart extends React.Component{
    constructor(props){
        super(props)
        this.store=props.navigation.store

        this.state={
            title:null,
            dataURL:null,

            type:'pie', icon:'ios-pie',
            note:null,
            tags:[],
            location:null,
            author:this.store.user,
            public:true,
        }

        /*
        value=value.replace(/[\n\r]+/g, '')
        if (value.trim()=='')
            this.setDataAndState({note:''})
        */
    }
    setChartType(value, index){
        var icon=this.store.iconForType[value]
        this.setDataAndState({type:value, icon:icon})
    }
    setDataAndState(dic){
        this.setState(dic)

        var dic=Object.assign({}, this.state)
        //limpiamos los retornos vacíos
        if (dic.note!=null){
            dic.note=dic.note.replace(/[\n\r]+/g, '')
            if (dic.note.trim()=='')
                dic.note=null
            }

        this.store.setData(dic)
    }
    render() {
        // <View style={styles.form_row} key="charttype">
        //     <Icon name={this.state.icon} size={26} color={colors.darkgray} style={styles.form_row_icon}/>
        //     <Picker
        //         style={styles.form_row_text}
        //         selectedValue={this.state.type}
        //         onValueChange={(itemValue, itemIndex) => this.setChartType(itemValue)}>
        //             <Picker.Item label="Pie" value="pie" />
        //             <Picker.Item label="Bar" value="bar" />
        //     </Picker>
        // </View>
        return (
            <KeyboardAvoidingView style={[styles.form, {backgroundColor:'white', flex:1}]} behavior='padding'>
            <ScrollView style={{backgroundColor:colors.white}} >
                <TextInput key="title"
                    style={styles.form_title}
                    onChangeText={(text) => this.setDataAndState({title:text})}
                    placeholder={'My awesome chart'}
                    returnKeyType="next"
                    value={this.state.title} autoFocus={true}/>

                <View style={[styles.form_line, {marginLeft:-10, width:'105%'}]}/>
                    <View style={styles.form_row} key="data-url">
                        <Icon name='ios-link-outline' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TextInput
                            style={styles.form_row_text}
                            onChangeText={(text) => this.setDataAndState({dataURL:text})}
                            placeholder={'Data URL'}
                            value={this.state.dataURL}
                            keyboardType="web-search"
                            returnKeyType="next"
                            autoCapitalize="none"
                            />
                        <Icon name='ios-information-circle' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_multilinerow} key="note">
                        <Icon name='ios-create-outline' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TextInput
                            style={styles.form_row_multilinetext}
                            multiline={true} numberOfLines={4}
                            onChangeText={(text) => this.setDataAndState({note:text})}
                            placeholder={'Add note'}
                            returnKeyType="next"
                            value={this.state.note}/>
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="location">
                        <Icon name='ios-pin-outline' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TouchableOpacity>
                            <Text style={styles.form_row_button}>{'Add location'}</Text>
                        </TouchableOpacity>
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="author">
                        <Icon name='ios-mail-outline' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TextInput
                            style={styles.form_row_text}
                            onChangeText={(text) => this.setState({author:text})}
                            placeholder={'e-mail'} keyboardType='email-address'
                            value={this.state.author}
                            returnKeyType="next"
                            autoCapitalize="none"
                            />
                    </View>
                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="privacy">
                        <Icon name='ios-unlock-outline' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <Text style={styles.form_row_button}>
                            {'Public (default for Free accounts)'}
                        </Text>
                    </View>
                <View style={{ height: 100,  }} />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
