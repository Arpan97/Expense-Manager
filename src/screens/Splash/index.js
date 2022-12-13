import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import JsonIcon from '../../utils/jsonIcon';
import Colors from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';

const Splash = (props) => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      if(props?.user?.id){
        navigation.replace('Drawer')
      }else{
        navigation.replace('Onboarding')
      }
    }, 2500);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView source={JsonIcon.splash} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeColor,
  },
});

const mapStateToProps = state => ({
  user:state.userData
})

export default connect(mapStateToProps, null)(Splash);
