import {StyleSheet} from 'react-native'

export const colors={
    black:'black',
    darkgray:'#4A4A4A',
    lightgray:'#9B9B9B',
    white:'white',
}

export const styles = StyleSheet.create({
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
    legendcontainer:{
        position:'absolute', bottom:0, left:0, right:0, height:60,
        flex:1, flexDirection:'row',
        backgroundColor:colors.darkgray,
        padding:20,
    },
    legend_label:{
        color:colors.white,
        fontSize:14,
        width:'80%',
    },
    legend_value:{
        color:colors.white,
        fontSize:14,
        width:'20%',
        textAlign:'right',
    }
})
