import { StyleSheet, Platform } from 'react-native'

const Textstyles = StyleSheet.create({
    bold: { fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'Roboto-Bold' },
    regular: { fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'Roboto-Regular' },
    medium: { fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'Roboto-Medium' },
    light: { fontFamily: Platform.OS === 'android' ? 'Roboto-Light' : 'Roboto-Light' },
    card_bold: {fontFamily: Platform.OS === 'android' ? 'GemunuLibre-Bold' : 'GemunuLibre-Bold'},
    card_regular: {fontFamily: Platform.OS === 'android' ? 'GemunuLibre-Regular' : 'GemunuLibre-Regular'}
})

export default Textstyles