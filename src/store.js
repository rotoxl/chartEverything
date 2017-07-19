import React, { Component } from 'react'
import {messages, getTranslationByLang} from './i18n'
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDoRGneeYJTCPqlXsxqZxtsjtBB-Wbzq00",
    authDomain: "charteverything.firebaseapp.com",
    databaseURL: "https://charteverything.firebaseio.com",
    projectId: "charteverything",
    storageBucket: "charteverything.appspot.com",
    messagingSenderId: "773413978533"

    // apiKey: "AIzaSyBXiE5k-K4JQfd0GoxlYSd9x1FK6tOodDg",
    // authDomain: "test-c00e3.firebaseapp.com",
    // databaseURL: "https://test-c00e3.firebaseio.com",
    // projectId: "test-c00e3",
    // storageBucket: "test-c00e3.appspot.com",
    // messagingSenderId: "1089532985221",
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default store={
    user:'rotoxl@gmail.com',
    keepoffline:true,

///////
    i18n:{locale:'en', currency:'EUR', messages:messages},
    getTranslation:function(k){
        return getTranslationByLang(store.i18n.locale, k)
    },

///////
    iconForType:['pie':'ios-pie', 'bar':'ios-stats'],
///////
    data_getPopularCharts:function(tag){//by zone/tag
        firebaseApp.database().ref()
            // .orderBy()
            .on('value', function(snap) {
                console.log('data_getPopularCharts', snap.val());
            })

    },
    data_getStarredCharts:function(){

    },
    data_getMyCharts:function(fnCallBack){
        if (store.keepoffline){
            fnCallBack( this.mock_sampledata() )
            return
            }

        var u=store.user
        firebaseApp.database().ref('charts').on('value',
            function(snap){
                var ret=[]
                snap.forEach((child) => {
                    var obj=child.val()
                    obj.key=child.key
                    obj.icon=obj.icon || store.iconForType[obj.type]
                    ret.push(obj)
                    })
                fnCallBack(ret)
            })
    },
    data_newStar:function(key){

    },
    setData:function(data){
        this.data=data
        this.data.dirty=true
    },
    saveNewChart:function(){
        var d=this.data

        if (d==null || d.title==null || d.dataURL==null || d.type==null)
            throw 'ErrIncompleteData'
        this.data_newChart(d.author, d.title, d.note, d.tags, d.location, d.dataURL, d.type, d.icon)
    },
    data_newChart:function(username, title, notes, tags, country_code, url, type, icon){
        firebaseApp.database().ref('charts').push({
            author:username,
            title:title,
            url:url,
            type:type,
            icon:icon || store.iconForType[type],
            notes:notes,
            timestamp:new Date(),
            // tags:tags,
            // country_code:country_code,
            })
    },
    data_getChartData:function(){

    },
///////
    mock_sampledata:function(){
        return [{
            key:'x0xaw10',
            title:'Programming languages (TIOBE index)',
            author:'rotoxl@gmail.com',
            timestamp:'2017/07/04 20:54:00',
            type:'bar',
            icon:'ios-stats',//Ionicons
            url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vSFCEQcorF0EWDLsA2WUCCgWqYFd-ZKCvXiuqrO_3xAvz3Bs1kzWVERmUftI90jq7LiPqyJFZ2qjRlG/pubhtml?gid=0&single=true',
            // series:[
            //     {label:'Java',               value:14.49},
            //     {label:'C',                  value:6.84},
            //     {label:'C++',                value:5.72},
            //     {label:'Python',             value:4.33},
            //     {label:'C#',                 value:3.53},
            //     {label:'Visual Basic .NET',  value:3.11},
            //     {label:'Javascript',         value:3.02},
            //     {label:'PHP',                value:2.77},
            //     {label:'Perl',               value:2.30},
            //     {label:'Assymbly language',  value:2.25},
            //     {label:'Ruby',               value:2.22},
            // ],
        },{
            key:'ca122010',
            title:'Databases',
            author:'ermolina@e-externas.aena.es',
            timestamp:'2017/07/05 22:28:00',
            type:'pie',
            icon:'ios-pie',//Ionicons
            url:'https://docs.google.com/spreadsheets/d/e/2PACX-1vQvFRTYCPz1Jx9WLOlieHOuxcvFLwLmhSE6-j0fGqX5sSDzLIlIvRGj-zY1oPnrdkwL7afNXzQecJc2/pubhtml?gid=0&single=true'
            // series:[
            //     {label:'Oracle',                value:1374.88},
            //     {label:'MySQL',                 value:1349.11},
            //     {label:'Microsoft SQL Server',  value:1226.00},
            //     {label:'PostgreSQL',            value:369.44},
            //     {label:'MongoDB',               value:332.77},
            //     {label:'DB2',                   value:191.25},
            //     {label:'Microsoft Access',      value:126.13},
            //     {label:'Cassandra',             value:124.12},
            //     {label:'Redis',                 value:121.51},
            //     {label:'Elasticsearch',         value:115.98},
            //     {label:'SQLite',                value:113.86},
            // ]
        }]
    }
}
