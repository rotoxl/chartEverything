import React, { Component } from 'react'

export const messages = {
    en: {
        byAuthor: 'By {author}, {time}',

        myCharts: 'My Charts',
        starred: 'Starred',
        popular: 'Popular',
        add: 'Add',
        info:'Info',

        newChart:'New chart',
        c:'Chart info',
    },
    es: {
        byAuthor: 'Por {author}, {time}',

        myCharts: 'Mis gráficas',
        starred: 'Favoritos',
        popular: 'Populares',
        add: 'Añadir',
        info:'Info',

        newChart:'Nueva gráfica',
        chartInfo:'Información sobre la gráfica',
    },
}
export function getTranslationByLang(lang, k){
    // return messages[store.i18n.locale][k] || k
    return messages[lang][k] || k
}
