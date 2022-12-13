import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Images from '../utils/images';
import {useNavigation} from '@react-navigation/native';
import Colors from '../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import CustomText from './CustomText';
import { connect } from 'react-redux';

const CustomHeader = props => {
  const [name,setName] = useState('')
  const [img, setImg] = useState('')
  const navigation = useNavigation();
  const getUserData = () => {
    let data = props?.user
    setName(data?.name)
    setImg(data?.image)
  }

  useEffect(()=>{
    getUserData()
  },[props?.user])

  return (
    <View style={{backgroundColor: Colors.backgroundColor, padding: vw(2)}}>
      {props?.isBack && (
      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{justifyContent:'center'}}>
          <Image source={Images.back_3d} style={{height: 20, width: 20}} />
        </TouchableOpacity>
        {props?.isProfile &&(
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} activeOpacity={0.6} style={{backgroundColor:Colors.white, width:50, height:50, borderRadius:10, borderWidth:1, borderColor:Colors.borderColor, elevation:3}}>
          <Image source={img ? {uri:img} : Images.user} style={{height: '100%', width: '100%', resizeMode:'center'}} />
        </TouchableOpacity>
        )}
      </View>
      )}
      {props?.isHome && (
      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
        <View>
            <CustomText title={`Hello,${name ? name : 'User'}`} isBold style={{fontSize:18}} />
            <CustomText title={'Welcome Back'} isBold />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} activeOpacity={0.6} style={{backgroundColor:Colors.white, width:50, height:50, borderRadius:10, borderWidth:1, borderColor:Colors.borderColor, elevation:3, overflow:'hidden'}}>
          <Image source={img ? {uri:img} : Images.user} style={{height: '100%', width: '100%', resizeMode:'contain'}} />
        </TouchableOpacity>
      </View>
      )}
      {props?.isRegister && (
        <View style={{justifyContent:'center', flexDirection:'row', height:50, width:'100%', alignItems:'center'}}>
            <View>
                <CustomText title={'Fill some details'} isBold style={{fontSize:18}} />
            </View>
        </View>
        )}
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userData
})

export default connect(mapStateToProps, null) (CustomHeader);
