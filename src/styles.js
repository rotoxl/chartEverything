import {StyleSheet} from 'react-native'

export const colors={
    black:'black',
    darkgray:'#4A4A4A',
    lightgray:'#9B9B9B',
    white:'white',

    red:'#ff6347',
    orange:'#eb993d',
    yellow:'#e6c045',
    green:'#62bc46',
    blue:'#40ade4',
    purple:'#c17fd2',
}

export const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
    throbber:{
        alignItems: 'center',
       justifyContent: 'center',
       padding: 8,
       flex:1,
       backgroundColor:colors.white,
    },
    tabContent:{
        marginTop:32,
        marginLeft:3,
    },
    form:{
        paddingTop:12,
        paddingLeft:10,
        flex:1,

        backgroundColor:'white',
    },
    form_title:{
        height:40,
        marginBottom:20,
        paddingLeft:10,
        fontSize:18,
    },
    form_row:{
        flexDirection:'row',
        height:40,
        // backgroundColor:'yellow'
    },
    form_multilinerow:{
        flexDirection:'row',
        height:60,
        
        // backgroundColor:'yellow'
    },
    form_line:{
        height: 1,
        width: "88%",
        backgroundColor: "#CED0CE",
        marginLeft: "11%",
        marginTop:15,
        marginBottom:10, 
    },
    form_row_icon:{
        alignSelf:'flex-start',
        width:40, height:50,
        paddingLeft:5,
        paddingTop:10,
        // backgroundColor:'red'
    },
    form_row_button:{
        fontSize:16,
        paddingTop:12,
        color: "#CED0CE",
        flex:1, 
    },
    form_row_text:{
        fontSize:16,
        flex:1, height:50,
        // backgroundColor:'green',
        
    },
    form_row_multilinetext:{
        fontSize:16,
        flex:1, height:60,
        textAlignVertical: 'top',

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
        width:'70%',
    },
    legend_value:{
        color:colors.white,
        fontSize:14,
        width:'30%',
        textAlign:'right',
    }
})
