import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './en/translation.json'
import translationSK from './sk/translation.json'
import translationCZ from './cz/translation.json'
import translationDE from './de/translation.json'
import translationES from './es/translation.json'

export const LANGS = ['en', 'sk', 'cz', 'de', 'es']

const resources = new Map([
    ['en', { translation: translationEN }],
    ['sk', { translation: translationSK }],
    ['cz', { translation: translationCZ }],
    ['de', { translation: translationDE }],
    ['es', { translation: translationES }],
])

i18next.use(initReactI18next).init({
    lng: 'sk',
    debug: true,
    resources: Object.fromEntries(resources),
})
