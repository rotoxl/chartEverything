import React, { Component } from 'react'
import {messages, getTranslationByLang} from './i18n'


export default store={
    user:'rotoxl@gmail.com',
    i18n:{locale:'en', currency:'EUR', messages:messages},
    getTranslation:function(k){
        return getTranslationByLang(store.i18n.locale, k)
    },

    data:[{
        key:'x0xaw10',
        title:'Programming languages (TIOBE index)',
        author:'rotoxl@gmail.com',
        timestamp:'2017/07/04 20:54:00',
        type:'bar',
        icon:'ios-stats',//Ionicons
        series:[
            {label:'Java',               value:14.49},
            {label:'C',                  value:6.84},
            {label:'C++',                value:5.72},
            {label:'Python',             value:4.33},
            {label:'C#',                 value:3.53},
            {label:'Visual Basic .NET',  value:3.11},
            {label:'Javascript',         value:3.02},
            {label:'PHP',                value:2.77},
            {label:'Perl',               value:2.30},
            {label:'Assymbly language',  value:2.25},
            {label:'Ruby',               value:2.22},
            ],
    },{
        key:'ca122010',
        title:'Databases',
        author:'ermolina@e-externas.aena.es',
        timestamp:'2017/07/05 22:28:00',
        type:'pie',
        icon:'ios-pie',//Ionicons
        series:[
            {label:'Oracle',                value:1374.88},
            {label:'MySQL',                 value:1349.11},
            {label:'Microsoft SQL Server',  value:1226.00},
            {label:'PostgreSQL',            value:369.44},
            {label:'MongoDB',               value:332.77},
            {label:'DB2',                   value:191.25},
            {label:'Microsoft Access',      value:126.13},
            {label:'Cassandra',             value:124.12},
            {label:'Redis',                 value:121.51},
            {label:'Elasticsearch',         value:115.98},
            {label:'SQLite',                value:113.86},
            ]
    }]
}
