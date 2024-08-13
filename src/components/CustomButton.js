import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {heightPercentageToDP as vh} from 'react-native-responsive-screen';

const CustomButton = props => {
  const {onPress, btnStyle, title, txtStyle} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[btnStyle, styles.btnContainer]}>
      <CustomText title={title} style={[txtStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: vh(1),
  },
});

export default CustomButton;
