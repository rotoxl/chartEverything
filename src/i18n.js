import React, { Component } from 'react'

export const messages = {
    en: {
        byAuthor: 'By {author}, {time}',
    },
    es: {
        byAuthor: 'Por {author}, {time}',

        'My Charts': 'Mis gráficas',
        'Starred': 'Favoritos',
        'Popular': 'Populares',
        'Add': 'Añadir',
        'Info':'Info',

        'New chart':'Nueva gráfica',
        'Chart info':'Información sobre la gráfica',

        'SAVE':'GUARDAR',
    },
}
export function getTranslationByLang(lang, k){
    // return messages[store.i18n.locale][k] || k
    return messages[lang][k] || k
}
