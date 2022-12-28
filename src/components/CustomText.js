import React, {useState, useMemo} from 'react';
import {View, Text, Appearance} from 'react-native';
import { connect } from 'react-redux';
import Colors from '../utils/color';
import Textstyles from '../utils/text';

const CustomText = props => {
  const [themeState, setThemeState] = useState('')
  const [nightMode, setNightMode] = useState(false)
  const checkState = () => {
    const checkTheme = Appearance.getColorScheme()
    if(checkTheme == 'dark'){
        setThemeState('dark')
    }else{
        setThemeState('light')
    }
}

useMemo(()=>{
  if(props?.themeMode == false){
    setNightMode(false)
  }else if(props?.themeMode == true){
    setNightMode(true)
  }
},[props?.themeMode, nightMode])

useMemo(() => checkState, [])
  return (
    <View>
      <Text
        {...props}
        numberOfLines={props.numberOfLines ? props.numberOfLines : null}
        style={[
          props?.isBold
            ? Textstyles.bold
            : props?.isMedium
            ? Textstyles.medium
            : props?.isLight
            ? Textstyles.light
            : props?.isRegular
            ? Textstyles.regular
            : props?.isCardBold
            ? Textstyles.card_bold
            : props?.isCardRegular
            ? Textstyles.card_regular
            : Textstyles.medium,
          {
            // color: nightMode == true ? Colors.white : Colors.textColor,
            color: themeState == 'dark' ? Colors.white : Colors.textColor,
            fontSize:14
          },
          props.style,
        ]}>
        {props.title}
      </Text>
      {props.children}
    </View>
  );
};
const mapStateToProps = state => ({
  themeMode: state.theme
})
export default connect (mapStateToProps, null) (CustomText);
