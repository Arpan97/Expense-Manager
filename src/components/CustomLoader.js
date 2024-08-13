import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import JsonIcon from '../utils/jsonIcon';
import CustomText from './CustomText';

const CustomLoader = props => {
  return (
    <View style={styles.container}>
      <LottieView
        source={JsonIcon.loader}
        autoPlay
        loop
        style={styles.loader}
      />
      {props?.isWait && (
        <CustomText
          title={'Your download is in progress. Please wait....'}
          style={styles.txtView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loader: {height: 150, width: 150},
  txtView: {fontSize: 13, textAlign: 'center'},
});

export default CustomLoader;
