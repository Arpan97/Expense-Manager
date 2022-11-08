import React, {useState, useMemo} from 'react';
import {View, Text, Appearance} from 'react-native';
import Colors from '../utils/color';
import Textstyles from '../utils/text';

const CustomText = props => {
  const [themeState, setThemeState] = useState('')
  const checkState = () => {
    const checkTheme = Appearance.getColorScheme()
    if(checkTheme == 'dark'){
        setThemeState('dark')
    }else{
        setThemeState('light')
    }
}

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
            : Textstyles.medium,
          {
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
export default CustomText;
