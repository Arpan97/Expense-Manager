import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../utils/color';
import Images from '../../utils/images';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import CustomText from '../../components/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {save_user_data} from '../../redux/Action/Action';
import Snack from '../../utils/snackbar';
import CustomLoader from '../../components/CustomLoader';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const EditProfile = props => {
  let data = props?.route?.params?.data;
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [profileDp, setProfileDp] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const checkData = () => {
    setName(data.name);
    setMobile(data.mobile);
    setEmail(data.mail);
    setProfileDp(data.image);
  };

  const imageEdit = async status => {
    if (status === 'Camera') {
      ImagePicker.openCamera({
        width: 100,
        height: 100,
        cropping: true,
      }).then(img => {
        setProfileDp(img.path);
        setIsVisible(false);
      });
    } else if (status === 'Gallery') {
      ImagePicker.openPicker({
        width: 100,
        height: 100,
        cropping: true,
      }).then(img => {
        setProfileDp(img.path);
        setIsVisible(false);
      });
    } else {
    }
  };

  const updateProfile = () => {
    let body = {
      id: data?.id,
      name: name,
      mail: email,
      mobile: mobile,
      image: profileDp,
    };
    props?.save_user(body);
      Snack('Profile updated successfully');
      navigation.goBack();
  };

  useEffect(() => {
    checkData();
  }, [data]);

  return (
    <ImageBackground source={Images.back_1} style={{flex: 1}}>
      {/* header */}
      <View style={{flexDirection:'row', marginTop:vh(2)}}>
        {/* <CustomHeader isBack /> */}
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{ width:'15%', justifyContent:'center', alignItems:'center'}}>
          <Image source={Images.menu} style={{height:25, width:25}} />
        </TouchableOpacity>
        <View style={{width:'70%', alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
          <CustomText title={'Edit Profile'} isBold style={{fontSize:18, color:Colors.themeColor}}  />
        </View>
      </View>
      {/* img view  */}
          <>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              style={{
                height: 120,
                width: 120,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.white,
                elevation: 3,
                alignSelf: 'center',
                marginTop: vh(5),
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: Colors.borderColor,
              }}>
              <Image
                source={profileDp ? {uri: profileDp} : Images.user}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </TouchableOpacity>
            <View style={{position: 'absolute', right: vw(33), top: vh(21)}}>
              <Image source={Images.camera} style={{height: 30, width: 30}} />
            </View>
          </>
          {/* description view  */}
          <>
            <KeyboardAwareScrollView style={{marginTop: vh(5)}}>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  marginBottom: vh(1),
                }}>
                <CustomText title={'Name'} />
              </View>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 5,
                  elevation: 3,
                  backgroundColor: Colors.white,
                }}>
                <TextInput
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={txt => setName(txt)}
                />
              </View>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  marginTop: vh(2),
                  marginBottom: vh(1),
                }}>
                <CustomText title={'Email'} />
              </View>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 5,
                  elevation: 3,
                  backgroundColor: Colors.white,
                }}>
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={txt => setEmail(txt)}
                />
              </View>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  marginTop: vh(2),
                  marginBottom: vh(1),
                }}>
                <CustomText title={'Mobile'} />
              </View>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 5,
                  elevation: 3,
                  backgroundColor: Colors.white,
                }}>
                <TextInput
                  placeholder="Enter your mobile"
                  value={mobile}
                  onChangeText={txt => setMobile(txt)}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
              <CustomButton
                onPress={() => updateProfile()}
                title={'Update'}
                txtStyle={{color: Colors.white}}
                btnStyle={{
                  marginTop: vh(4),
                  backgroundColor: Colors.themeColor,
                  borderRadius: 10,
                  elevation: 3,
                  marginBottom: vh(2),
                  alignSelf: 'center',
                }}
              />
            </KeyboardAwareScrollView>
          </>
      {/* modal view  */}
      <View>
        <Modal
          visible={isVisible}
          transparent={true}
          onRequestClose={() => {
            setIsVisible(false);
          }}
          animationType="slide">
          <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: Colors.white,
              width: '100%',
              height: '20%',
              top: vh(35),
              borderRadius: 6,
              width: '95%',
              alignSelf: 'center',
              paddingTop: vh(5),
            }}>
            <View>
              <TouchableOpacity
                onPress={() => imageEdit('Camera')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: vw(3),
                  width: '95%',
                  marginBottom: vh(2),
                }}>
                <Image
                  source={Images.camera}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: vw(5),
                  }}
                />
                <CustomText title={'Open Camera'} />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 0.2,
                  width: '90%',
                  alignSelf: 'center',
                  borderStyle: 'dotted',
                  marginBottom: vh(2),
                }}
              />
              <TouchableOpacity
                onPress={() => imageEdit('Gallery')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: vw(3),
                  width: '95%',
                  marginBottom: vh(1),
                }}>
                <Image
                  source={Images.gallery}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: vw(5),
                  }}
                />
                <CustomText title={'Open Gallery'} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
