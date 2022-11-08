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
import ImagePicker from 'react-native-image-crop-picker';
import {save_user_data} from '../../../redux/Action/Action';
import {connect} from 'react-redux';
import CustomLoader from '../../../components/CustomLoader';

const isIOS = Platform.OS === 'ios';

const StepTwo = props => {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  const onsubmit = () => {
    setIsLoading(true)
    let propData = props?.route?.params?.data;
    let body = {
      id: Math.random().toString(16).slice(2),
      name: propData.username,
      mail: propData.email,
      mobile: propData.mobile,
      image: image,
      desc: desc,
    };
    setTimeout(() => {
      props?.save_user(body);
      navigation.replace('Dashboard');
      setIsLoading(false);
    }, 1500);
    // navigation.navigate('StepTwo', {data: data});
  };

  const imageEdit = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(img => {
      setImage(img.path);
    });
  };
  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: Colors.white, flex: 1}}>
          {/*  back button  */}
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
          {/* logo images */}
          <View
            style={{
              height: 120,
              width: 120,
              alignSelf: 'center',
              marginTop: vh(2),
            }}>
            <Image
              source={Images.logo}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          {/* first question */}
          <View>
            <View>
              <CustomText
                title={'Show your best pic to your friend'}
                isBold
                style={{textAlign: 'center'}}
              />
            </View>
            <TouchableOpacity
              onPress={() => imageEdit()}
              activeOpacity={0.6}
              style={{
                height: 120,
                width: 120,
                alignSelf: 'center',
                padding: 1,
                borderRadius: 80,
                backgroundColor: Colors.white,
                elevation: 3,
                overflow: 'hidden',
                marginVertical: vh(3),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={image ? {uri: image} : Images.dummy}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'cover',
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: Colors.white,
                position: 'absolute',
                top: vh(16),
                right: vw(35),
                borderRadius: 100,
                padding: vh(1),
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 1,
              }}>
              <Image source={Images.edit} style={{height: 15, width: 15}} />
            </View>
          </View>
          {/* second question */}
          <View style={{width: '90%', alignSelf: 'center', marginTop: vh(2)}}>
            <View>
              <CustomText
                title={
                  'Some words about yourself to attract your interested fields'
                }
                isBold
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: vw(2),
                marginTop: vh(1),
              }}>
              <TextInput
                placeholder="Enter about yourself (in 250 words)"
                value={desc}
                onChangeText={txt => setDesc(txt)}
                maxLength={250}
                numberOfLines={6}
                style={{textAlignVertical: 'top'}}
              />
            </View>
          </View>
          <View>
            <CustomButton
              title={Constant.savePlaceholder}
              buttonColor={Colors.themeColor}
              labelStyle={Colors.white}
              onPress={() => onsubmit()}
              btnStyle={styles.button}
              txtStyle={styles.text}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
});
const mapDispatchToProps = dispatch => {
  return {
    save_user: data => {
      dispatch(save_user_data(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);

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
  text: {
    paddingTop: isIOS ? 2 : 0,
    paddingBottom: 2,
    fontSize: 16,
    color: Colors.white,
  },
});
