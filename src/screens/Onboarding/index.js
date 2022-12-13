import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utils/color';
import LottieView from 'lottie-react-native';
import JsonIcon from '../../utils/jsonIcon';
import CustomText from '../../components/CustomText';
import {heightPercentageToDP as vh} from 'react-native-responsive-screen';

const Onboarding = () => {
  const navigation = useNavigation();
  const slides = [
    {
      key: 1,
      text: 'You can manage your expenses on daily basis',
      image: JsonIcon.splash,
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      text: 'You can manage your account balance',
      image: JsonIcon.splash,
      backgroundColor: '#febe29',
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <LinearGradient
        style={Style.container}
        colors={[Colors.themeColor, Colors.white]}>
        <LottieView source={item?.image} autoPlay loop />
        <View>
          <CustomText title={item?.text} isBold style={Style.render_text} />
        </View>
      </LinearGradient>
    );
  };

  const _onNext = () => {
    return (
      <View style={Style.btn_view}>
        <CustomText title={'Next'} isBold style={Style.text} />
      </View>
    );
  };

  const _onDone = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail')}
        style={Style.btn_view}>
        <CustomText title={'Done'} style={Style.text} />
      </TouchableOpacity>
    );
  };

  const _onSkip = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail')}
        style={Style.btn_view}>
        <CustomText title={'Skip'} style={Style.text} />
      </TouchableOpacity>
    );
  };

  return (
    <AppIntroSlider
      dotStyle={{backgroundColor: Colors.black}}
      activeDotStyle={{backgroundColor: Colors.themeColor}}
      renderItem={_renderItem}
      showSkipButton={true}
      data={slides}
      renderNextButton={_onNext}
      renderDoneButton={_onDone}
      renderSkipButton={_onSkip}
    />
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  render_text: {
    fontSize: 14,
    marginTop: vh(60),
    color: Colors.textColor,
  },
  btn_view: {
    top: vh(0.7),
  },
  text: {
    marginTop: '15%',
  },
});

export default Onboarding;
