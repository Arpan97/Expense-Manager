import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { heightPercentageToDP as vh } from 'react-native-responsive-screen'

const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={[props?.btnStyle,{width:'30%', justifyContent:'center', alignItems:'center', padding:vh(1)}]}>
      <CustomText title={props?.title} style={[props?.txtStyle]} />
    </TouchableOpacity>
  )
}

export default CustomButton