import React, { Component } from 'react'

import {StyleSheet, Text, View, TextInput, Picker, TouchableOpacity, Dimensions,
    KeyboardAvoidingView, ScrollView} from 'react-native'
import {colors, styles} from './styles'

//import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'

import TagInput from 'react-native-tag-input'

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
            data:[],
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
        var estadoCompleto=Object.assign({}, this.state, dic)
        
        // //limpiamos los retornos vacíos
        // if (Object.keys(dic)[0]=='note' && dic.note!=null){
        //     dic.note=dic.note.replace(/[\n\r]+/g, '')
        //     if (dic.note.trim()=='')
        //         dic.note=null
        //     }

        this.store.setData(estadoCompleto)
    }
    render() {
        console.disableYellowBox = true
        return (
            <KeyboardAvoidingView style={[styles.form, {backgroundColor:'white', flex:1}]} >
            
            <TextInput key="title"
                underlineColorAndroid='rgba(0,0,0,0)'
                style={styles.form_title}
                onChangeText={(text) => this.setDataAndState({title:text})}
                placeholder={'My awesome chart'}
                returnKeyType="next"
                value={this.state.title}/>

            <ScrollView style={{backgroundColor:colors.white}} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('editData', {data:this.state.data})} >    
                    <View style={styles.form_row} key="data">
                        <Ionicon name='ios-cube' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <Text style={styles.form_row_button}>
                            {'Tap to edit data'}
                        </Text>
                        <Ionicon name='ios-arrow-forward-outline' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                    </View>
                </TouchableOpacity>    
                    
                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="chart-type">
                        <Ionicon name='ios-pie' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <Picker
                            style={styles.form_row_text}
                            selectedValue={this.state.type}
                            onValueChange={(itemValue, itemIndex) => this.setChartType(itemValue)}>
                            <Picker.Item label="Pie" value="pie" />
                            <Picker.Item label="Bar" value="bar" />
                        </Picker>
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_multilinerow} key="note">
                        <Ionicon name='ios-list-box' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            style={[styles.form_row_multilinetext, {backgroundColor:'#ffffff'}]}
                            multiline={true} numberOfLines={2} 
                            onChangeText={(text) => this.setDataAndState({note:text})}
                            placeholder={'Add note'}
                            returnKeyType="next"
                            labelExtractor = {(tag) => tag}
                            value={this.state.note}/>
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="tags">
                        <Ionicon name='ios-bookmark' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TagInput
                            value={this.state.tags}
                            
                            _tagTextStyle={{backgroundColor:'red'}}
                            textInputContainer={{flex:1, backgroundColor:'green'}}
                            textInput={{flex:1, backgroundColor:'blue'}}
                            placeholder={'Tags'}
                            returnKeyType="next"
                            autoCapitalize="none"
                            numberOfLines={2}
                            inputProps={{keyboardType:'default', placeholder:'Tags'}}
                            onChange={(text) => this.setDataAndState({tags:text})} />
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="color">
                        <Ionicon name='ios-color-palette' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <Picker
                            style={styles.form_row_text}
                            selectedValue={this.state.color}
                            onValueChange={(itemValue, itemIndex) => this.setDataAndState({color:itemValue})}>
                            <Picker.Item label="Gray (only option for free accounts)" value="gray" />
                            <Picker.Item label="Red" value="red" />
                            <Picker.Item label="Orange" value="orange" />
                            <Picker.Item label="Yellow" value="yellow" />
                            <Picker.Item label="Green" value="green" />
                            <Picker.Item label="Blue" value="blue" />
                            <Picker.Item label="Purple" value="purple" />
                        </Picker>
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="location">
                        <Ionicon name='ios-pin' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TouchableOpacity>
                            <Text style={styles.form_row_button}>{'Add location'}</Text>
                        </TouchableOpacity>
                    </View>

                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="author">
                        <Ionicon name='ios-mail' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <TextInput
                            underlineColorAndroid='rgba(0,0,0,0)'
                            style={styles.form_row_text}
                            onChangeText={(text) => this.setDataAndState({author:text})}
                            placeholder={'e-mail'} keyboardType='email-address'
                            value={this.state.author}
                            returnKeyType="next"
                            autoCapitalize="none"
                            />
                    </View>
                <View style={styles.form_line}/>
                    <View style={styles.form_row} key="privacy">
                        <Ionicon name='ios-unlock' size={26} color={colors.darkgray} style={styles.form_row_icon}/>
                        <Text style={styles.form_row_button}>
                            {'Public (default for free accounts)'}
                        </Text>
                    </View>
                <View style={{ height: 100,  }} />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
