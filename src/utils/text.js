import { StyleSheet, Platform } from 'react-native'

const Textstyles = StyleSheet.create({
    bold: { fontFamily: Platform.OS === 'android' ? 'Roboto-Bold' : 'Roboto-Bold' },
    regular: { fontFamily: Platform.OS === 'android' ? 'Roboto-Regular' : 'Roboto-Regular' },
    medium: { fontFamily: Platform.OS === 'android' ? 'Roboto-Medium' : 'Roboto-Medium' },
    light: { fontFamily: Platform.OS === 'android' ? 'Roboto-Light' : 'Roboto-Light' },
})

export default Textstyles