import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import CustomText from '../../components/CustomText';
import Images from '../../utils/images';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {save_user_data} from '../../redux/Action/Action';
import {connect} from 'react-redux';
import CustomLoader from '../../components/CustomLoader';

const Details = props => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobNo, setMobNo] = useState('');
  const [mail, setMail] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [modalState, setModalState] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openModal = text => {
    setModalState(text);
    setIsModal(true);
    if (text == 'Profile name') {
      if (name == '') {
        setName('Profile name');
      }
    } else if (text == 'Mobile Number') {
      if (mobNo == '') {
        setMobNo('Mobile Number');
      }
    } else if (text == 'Email Id') {
      if (mail == '') {
        setMail('Email Id');
      }
    }
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

  const onSaveBtn = () => {
    let body = {
      id: Math.random().toString(16).slice(2),
      name: name,
      mobile: mobNo,
      mail: mail,
      image: image,
    };
    props?.save_user(body);
    navigation.replace('Drawer');
  };

  return (
    <ImageBackground source={Images.back_1} style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          height: 50,
          width: '100%',
          alignItems: 'center',
        }}>
        <CustomText title={'Fill some details'} isBold style={{fontSize: 18}} />
      </View>
      <View style={{width: '92%', alignSelf: 'center'}}>
        <View style={{marginTop: vh(2)}}>
          <CustomText title={'Edit the default profile!'} isBold />
        </View>
        <View>
          <CustomText
            title={
              'Please fill some details to make your experience better. You can customize your profile later'
            }
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
            top: vh(22),
            right: vw(30),
            borderRadius: 100,
            padding: vh(1),
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 1,
          }}>
          <Image source={Images.edit} style={{height: 15, width: 15}} />
        </View>

        <View style={{marginTop: vh(2)}}>
          <View>
            <CustomText title={'Profile name'} isMedium />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              title={name ? name : 'Primary Profile'}
              isBold
              style={{fontSize: 18}}
            />
            <TouchableOpacity onPress={() => openModal('Profile name')}>
              <Image source={Images.edit} style={{height: 20, width: 20}} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: vh(2)}}>
          <View>
            <CustomText title={'Mobile Number'} isMedium />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              title={mobNo ? mobNo : 'Mobile Number'}
              style={{fontSize: 18}}
              isBold
            />
            <TouchableOpacity onPress={() => openModal('Mobile Number')}>
              <Image source={Images.edit} style={{height: 20, width: 20}} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: vh(2)}}>
          <View>
            <CustomText title={'Email Id'} isMedium />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              title={mail ? mail : `Email id`}
              isBold
              style={{fontSize: 18}}
            />
            <TouchableOpacity onPress={() => openModal('Email Id')}>
              <Image source={Images.edit} style={{height: 20, width: 20}} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onSaveBtn()}
          style={{
            padding: vh(1),
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            backgroundColor: Colors.black,
            alignSelf: 'flex-end',
            marginTop: vh(10),
            elevation:3
          }}>
          <CustomText title={'Save'} isBold style={{color:Colors.white}} />
        </TouchableOpacity>
      </View>
      {isModal && (
        <Modal
          visible={isModal}
          transparent={true}
          onRequestClose={() => {
            setIsModal(false);
          }}
          animationType="slide">
          <TouchableWithoutFeedback onPress={() => setIsModal(false)}>
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
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              padding: vh(1),
              borderRadius: 6,
              elevation: 3,
              height: '25%',
            }}>
            <View style={{alignItems: 'center', marginTop: vh(2)}}>
              <CustomText title={modalState} isBold style={{fontSize: 18}} />
              <TextInput
                placeholder={
                  modalState == 'Profile name'
                    ? 'Enter your name'
                    : modalState == 'Mobile Number'
                    ? 'Enter your mobile number'
                    : modalState == 'Email Id'
                    ? 'Enter your email id'
                    : ''
                }
                onChangeText={txt => {
                  modalState == 'Profile name'
                    ? setName(txt)
                    : modalState == 'Mobile Number'
                    ? setMobNo(txt)
                    : modalState == 'Email Id'
                    ? setMail(txt)
                    : null;
                }}
                keyboardType={
                  modalState == 'Mobile Number'
                    ? 'number-pad'
                    : modalState == 'Email Id'
                    ? 'email-address'
                    : 'default'
                }
                style={{borderBottomWidth: 0.5, width: '60%'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: vh(4),
              }}>
              <TouchableOpacity onPress={() => setIsModal(false)}>
                <CustomText title={'Save'} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);
