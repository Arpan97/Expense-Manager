import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../../../utils/images';
import Colors from '../../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import CustomText from '../../../components/CustomText';
import StepIndicator from 'react-native-step-indicator';
import {useNavigation} from '@react-navigation/native';
import Constant from '../../../utils/language';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomButton from '../../../components/CustomButton';

const isIOS = Platform.OS == 'ios';

const StepOne = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [startDateShow, setStartDateShow] = useState(false);
  const labels = ['Step 1', 'Step 2'];
  const customStyles = {
    stepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.themeColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.themeColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: Colors.themeColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.themeColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelFinishedColor: Colors.themeColor,
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
  };

  //PICKER of Start date
  const onStartChange = async (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    const fullDate = await `${moment(currentDate).format('L')}`;
    setAge(fullDate);
    setStartDateShow(false);
  };

  const onsubmit = () => {
    let data = {
      username: username,
      email: email,
      mobile: mobile,
    };
    navigation.navigate('StepTwo', {data: data});
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: Colors.white, flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 30,
          width: 30,
          borderWidth: 1,
          borderColor: Colors.appColor,
          marginTop: vh(2),
          marginLeft: vw(2),
          borderRadius: 5,
        }}>
        <Image
          source={Images.back_black}
          style={{height: '100%', width: '100%'}}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 120,
          width: 120,
          alignSelf: 'center',
          marginTop: vh(2),
        }}>
        <Image source={Images.logo} style={{height: '100%', width: '100%'}} />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <CustomText
          title={'Please Start Your Journey with Saved Attractive Info'}
          style={{fontSize: 16, textAlign: 'center'}}
          isBold
        />
      </View>
      <View style={{marginTop: vh(2)}}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          stepCount={2}
        />
      </View>
      <View style={{marginTop: vh(2), width: '85%', alignSelf: 'center'}}>
        <View style={{marginBottom: vh(2)}}>
          <CustomText title={'Personal Detail'} isBold />
        </View>
        <View>
          <CustomText
            title={'Name:'}
            style={{fontSize: 14, marginBottom: vh(1)}}
            isBold
          />
          <TextInput
            value={username}
            onChangeText={txt => setUsername(txt)}
            placeholder={Constant.userPlaceholder}
            style={{
              borderWidth: 1,
              borderColor: Colors.textColor,
              borderRadius: 10,
              paddingLeft: vw(2),
            }}
          />
        </View>
        <View style={{marginTop: vh(2)}}>
          <CustomText
            title={'Email:'}
            style={{fontSize: 14, marginBottom: vh(1)}}
            isBold
          />
          <TextInput
            value={email}
            onChangeText={txt => setEmail(txt)}
            placeholder={Constant.emailPlaceholder}
            style={{
              borderWidth: 1,
              borderColor: Colors.textColor,
              borderRadius: 10,
              paddingLeft: vw(2),
            }}
          />
        </View>
        <View style={{marginTop: vh(2)}}>
          <CustomText
            title={'Mobile:'}
            style={{fontSize: 14, marginBottom: vh(1)}}
            isBold
          />
          <TextInput
              value={mobile}
              onChangeText={txt => setMobile(txt)}
            placeholder={Constant.phonePlaceholder}
            style={{
              borderWidth: 1,
              borderColor: Colors.textColor,
              borderRadius: 10,
              paddingLeft: vw(2),
            }}
          />
        </View>
      </View>
      <View>
        <CustomButton
          title={Constant.nextPlaceholder}
          buttonColor={Colors.themeColor}
          labelStyle={Colors.white}
          onPress={() => onsubmit()}
          btnStyle={styles.button}
          txtStyle={styles.text}
        />
      </View>
      {startDateShow && (
        <DateTimePicker
          style={styles.datePicker}
          mode="date"
          value={new Date()}
          display="spinner"
          onChange={onStartChange}
          minimumDate={new Date()}
          textColor="black"
        />
      )}
    </ScrollView>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 20,
    minWidth: 30,
    height: 45,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: vh(5),
    minWidth: vw(70),
    backgroundColor: Colors.themeColor,
  },
  text:{
    paddingTop: isIOS ? 2 : 0,
    paddingBottom: 2,
    fontSize: 16,
    color: Colors.white,
  }
});
