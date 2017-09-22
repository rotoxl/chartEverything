import React, { Component } from 'react'

import {StyleSheet, Text, View, TextInput, TouchableNativeFeedback, Dimensions,
    KeyboardAvoidingView, ScrollView, Button, FlatList} from 'react-native'
import {colors, styles} from './styles'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'

export default class editData extends React.Component{
    constructor(props){
        super(props)
        this.store=props.navigation.store

        this.state={
            label:null, value:null,
            data:this.props.navigation.state.params.data
            // data:[
            //     {label:'Rum', value:40},
            //     {label:'Whiskey', value:46},
            //     {label:'Gin', value:50},
            // ]
        }
    }
    _keyExtractor = (item, index) => index
    
    _handleIntroForNext = function(e){
        // if (e.nativeEvent.key == "Enter"){
        this.refs.secondInput.focus()
        // }
    }
    _handleIntroForSubmit = function(e){
        // if (e.nativeEvent.key == "Enter"){
        this._submit()
        // }
    }
    _submit = () => {
        var newObject={label:this.state.label, value:this.state.value}
        var newdata=this.state.data.concat([newObject])
        this.setState({
            data: newdata,
            label:null, 
            value:null
        })

        this.store.setChartData(newdata)
        this.refs.firstInput.focus()
    }
    _deleteItem = (item) => {
        var rowsNew = this.state.data.filter(row => !row.label.match(item.label)) 
        this.setState({data:rowsNew})
    }
    _renderEmptyList = () => {
        return (
            <Text style={{marginLeft:15}}>No data yet :(</Text>
        )
    }
    _renderItem = ({item}) => (
        <View style={{flexDirection:'row', height:40 }} id={item.id} title={item.title}>
            <Text style={{flex:3, fontSize:18}}>{item.label}</Text>
            <Text style={{flex:1, fontSize:18}}>{item.value}</Text>
            <TouchableNativeFeedback style={{width:70}} onPress={()=>this._deleteItem(item)} >
                <Ionicon name='ios-remove-circle-outline' size={26} color={colors.darkgray} style={{alignSelf:'flex-start', width:40, height:40, paddingLeft:5, paddingTop:0,}}/>
            </TouchableNativeFeedback>
        </View>
    )
    _renderSeparator = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#CED0CE", marginLeft: "0%", marginBottom:20}} />
        )
    }
    render() {
        console.disableYellowBox = true
        return (
            <KeyboardAvoidingView style={[styles.form, {backgroundColor:'white', flex:1}]} >
                <ScrollView>
                    <FlatList 
                        data={this.state.data} 
                        renderItem={this._renderItem} 
                        keyExtractor={this._keyExtractor} 
                        style={{flex:1, marginTop:10, marginBottom:60, marginLeft:12, }} 
                        ItemSeparatorComponent={this._renderSeparator}
                        ListEmptyComponent={this._renderEmptyList}/>
                </ScrollView>
                <View style={{flex:1, flexDirection:'row', position:'absolute', bottom:3, height:60, left:0, right:0}}>
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        style={{borderTopLeftRadius:40, borderBottomLeftRadius:40, backgroundColor:colors.lightgray, flex:3, fontSize:18, paddingLeft:15,}}
                        onChangeText={(text) => this.setState({label:text})}
                        placeholder={'Label'} 
                        value={this.state.label}
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={(e)=>this._handleIntroForNext(e)}
                        
                        ref='firstInput'
                        />
                    <TextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        style={{backgroundColor:colors.lightgray, flex:1, fontSize:18}}
                        onChangeText={(text) => this.setState({value:text})}
                        placeholder={'Value'} 
                        value={this.state.value}
                        keyboardType="numeric"        
                
                        returnKeyType="next"
                        autoCapitalize="none"
                        onSubmitEditing={(e)=>this._handleIntroForSubmit(e)}

                        ref='secondInput'
                        />
                    <TouchableNativeFeedback onPress={()=>this._submit()} style={{width:70, backgroundColor:'black', borderRadius:'50%', borderTopRightRadius:40, borderBottomRightRadius:40,}}>
                        <View style={{width:70, backgroundColor:'black', paddingTop:20, paddingLeft:5, paddingRight:5, borderTopRightRadius:40, borderBottomRightRadius:40,}}>
                            <Text style={{backgroundColor:'black',color:'white'}}>NEXT</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
