import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Images from '../utils/images';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/color';
import {widthPercentageToDP as vw} from 'react-native-responsive-screen';
import CustomText from './CustomText';
import {connect} from 'react-redux';

const CustomHeader = props => {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const navigation = useNavigation();
  const getUserData = () => {
    let data = props?.user;
    setName(data?.name);
    setImg(data?.image);
  };

  useEffect(() => {
    getUserData();
  }, [props?.user]);

  return (
    <View style={styles.container}>
      {props?.isBack && (
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIcnContainer}>
            <Image source={Images.back_3d} style={styles.backIcn} />
          </TouchableOpacity>
          {props?.isProfile && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.6}
              style={styles.userProfileView}>
              <Image
                source={img ? {uri: img} : Images.user}
                style={styles.userImg}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      {props?.isHome && (
        <View style={styles.backContainer}>
          <View>
            <CustomText
              title={`Hello,${name ? name : 'User'}`}
              isBold
              style={styles.homeTxtView}
            />
            <CustomText title={'Welcome Back'} isBold />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.6}
            style={styles.userImgHome}>
            <Image
              source={img ? {uri: img} : Images.user}
              style={styles.userIcnHome}
            />
          </TouchableOpacity>
        </View>
      )}
      {props?.isRegister && (
        <View style={styles.registerContainer}>
          <View>
            <CustomText
              title={'Fill some details'}
              isBold
              style={styles.homeTxtView}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    padding: vw(2),
  },
  backContainer: {justifyContent: 'space-between', flexDirection: 'row'},
  backIcnContainer: {
    justifyContent: 'center',
  },
  backIcn: {
    height: 20,
    width: 20,
  },
  userProfileView: {
    backgroundColor: Colors.white,
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    elevation: 3,
  },
  userImg: {height: '100%', width: '100%', resizeMode: 'center'},
  homeTxtView: {
    fontSize: 18,
  },
  userImgHome: {
    backgroundColor: Colors.white,
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    elevation: 3,
    overflow: 'hidden',
  },
  userIcnHome: {height: '100%', width: '100%', resizeMode: 'contain'},
  registerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default connect(mapStateToProps, null)(CustomHeader);
