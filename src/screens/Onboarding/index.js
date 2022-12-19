import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utils/color';
import LottieView from 'lottie-react-native';
import JsonIcon from '../../utils/jsonIcon';
import CustomText from '../../components/CustomText';
import {heightPercentageToDP as vh} from 'react-native-responsive-screen';
import Images from '../../utils/images';

const Onboarding = () => {
  const navigation = useNavigation();
  const slides = [
    {
      key: 1,
      title_1:'Track your expenses',
      text: 'All your spends, bills, credit card all at one place',
      image: Images.onboarding_1,
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title_1:'Set your budget',
      text: 'You can set your daily, monthly and weekly budget with this app',
      image: Images.onboarding_2,
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title_1:'Track your goals',
      text: 'You can set your goals for saving money for future with this app',
      image: Images.onboarding_3,
      backgroundColor: '#febe29',
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <View style={Style.container} >
        <View style={{width:350, height:300, justifyContent:'center', alignItems:'center', position:'absolute', bottom:vh(38)}}>
          <Image source={item?.image} style={{width:'100%', height:'100%'}} />
        </View>
        <View style={{justifyContent:'center', alignItems:'center', position:'absolute', bottom:vh(25)}}>
          <CustomText title={item?.title_1} isBold style={{fontSize:18}} />
        </View>
        <View style={{justifyContent:'center', alignItems:'center', width:'75%'}}>
          <CustomText title={item?.text} isBold style={Style.render_text} />
        </View>
      </View>
      // <LinearGradient
      //   style={Style.container}
      //   colors={[Colors.themeColor, Colors.white]}>
      //   <LottieView source={item?.image} autoPlay loop />
      //   <View>
      //     <CustomText title={item?.text} isBold style={Style.render_text} />
      //   </View>
      // </LinearGradient>
    );
  };

  const _onNext = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail')} style={Style.btn_view}>
        <CustomText title={'Skip'} isBold style={Style.text} />
        </TouchableOpacity>
    );
  };

  const _onDone = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail')}
        style={Style.btn_view}>
        <CustomText title={`Let's Go`} isBold style={Style.text} />
      </TouchableOpacity>
    );
  };

  // const _onSkip = () => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate('Detail')}
  //       style={Style.btn_view}>
  //       <CustomText title={'Skip'} style={Style.text} />
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <AppIntroSlider
      dotStyle={{backgroundColor: Colors.black}}
      activeDotStyle={{backgroundColor: Colors.themeColor}}
      renderItem={_renderItem}
      showSkipButton={true}
      data={slides}
      renderNextButton={_onNext}
      renderDoneButton={_onDone}
      // renderSkipButton={_onSkip}
    />
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.white
  },
  render_text: {
    fontSize: 14,
    marginTop: vh(60),
    textAlign:'center'
  },
  btn_view: {
    top: vh(0.7),
  },
  text: {
    marginTop: '15%',
  },
});

export default Onboarding;
