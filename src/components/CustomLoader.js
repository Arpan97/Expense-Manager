import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import JsonIcon from '../utils/jsonIcon';
import CustomText from './CustomText';

const CustomLoader = (props) => {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <LottieView source={JsonIcon.loader} autoPlay loop style={{height:150,width:150}} />
      {props?.isWait && (
        <CustomText title={'Your download is in progress. Please wait....'} style={{fontSize:13, textAlign:'center'}} />
      )}
    </View>
  )
}

export default CustomLoader