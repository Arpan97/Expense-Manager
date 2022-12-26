import {View, Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Images from '../../utils/images';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import CustomText from '../../components/CustomText';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
import { change_theme } from '../../redux/Action/Action';

const Profile = (props) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('')
  const [nightMode, setNightMode] = useState(false)
  const navigation = useNavigation()
  const styles = getStyles(nightMode)
  
  const checkData = () => {
    let data = props?.user
    setName(data.name)
    setMobile(data.mobile)
    setEmail(data.mail)
    setImg(data.image)
  }

  const onChangeTheme = () => {
    if(nightMode == false){
      props?.change_theme(true)
    }else if(nightMode == true){
      props?.change_theme(false)
    }
  }

  useMemo(()=>{
    if(props?.themeMode == false){
      setNightMode(false)
    }else if(props?.themeMode == true){
      setNightMode(true)
    }
  },[props?.themeMode, nightMode])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkData()
      if(props?.themeMode == false){
        setNightMode(false)
      }else if(props?.themeMode == true){
        setNightMode(true)
      }
    });
    return unsubscribe;
  }, [navigation, props?.user, props?.themeMode]);

  return (
    <View style={{flex:1, backgroundColor:nightMode == true ? Colors.black : Colors.backgroundColor}} >
      <View style={styles.header_container}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <Image source={nightMode == true ? Images.menu_white : Images.menu} style={{height:22, width:22}} />
        </TouchableOpacity>
        <View style={{marginLeft:vw(5)}}>
          <CustomText title={'Profile'} isBold style={[styles.nightTxt,{fontSize:16}]} />
        </View>
      </View>
      {/* image view  */}
      <View style={{flexDirection:'row'}}>
      <View
        style={{
          height: 120,
          width: 120,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.white,
          elevation: 3,
          marginTop: vh(3),
          overflow:'hidden',
          borderWidth:1,
          borderColor:Colors.borderColor,
          marginLeft:vw(5)
        }}>
        <Image
          source={props?.user?.image ? {uri:props?.user?.image} : Images.user}
          style={{height: '100%', width: '100%', resizeMode: 'cover'}}
        />
      </View>
      <View style={{marginTop:vh(8), marginLeft:vw(7)}} >
        <CustomText title={props?.user?.name == '' ? 'Welcome User' : props?.user?.name} isBold style={[styles.nightTxt,{fontSize:15}]} />
        <CustomText title={props?.user?.mobile == '' ? '**********' : props?.user?.mobile} isBold style={[styles.nightTxt,{fontSize:13}]} />
        <CustomText title={props?.user?.mail == '' ? '******@*****.com' : props?.user?.mail} isBold style={[styles.nightTxt,{fontSize:13}]} />
      </View>
      </View>
      
      {/* detail name view  */}
      <View>
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>navigation.navigate('EditProfile',{data:props?.user})}
          style={{
            backgroundColor: Colors.white,
            width: '90%',
            alignSelf: 'center',
            elevation: 3,
            borderRadius: 5,
            paddingTop: vw(3),
            paddingHorizontal:vh(2),
            marginTop: vh(2),
            flexDirection:'row',
            paddingBottom:vh(1)
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: vh(1),
            }}>
            <Image
              source={Images.setting}
              style={{
                height: 25,
                width: 25,
                bottom: vh(0.2),
                marginRight: vw(4),
              }}
            />
            <View>
              <CustomText title={'Profile Setting'} />
              <CustomText title={'Update and modify your profile'} style={{fontSize:12}} isRegular />
            </View>
          </View>
        </TouchableOpacity>

        {/* <View
          style={{
            backgroundColor: Colors.white,
            width: '90%',
            alignSelf: 'center',
            elevation: 3,
            borderRadius: 5,
            paddingTop: vw(2),
            paddingHorizontal:vh(2),
            marginTop: vh(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: vh(1),
              marginTop:vh(2)
            }}>
            <Image
              source={Images.mobile}
              style={{
                height: 25,
                width: 25,
                bottom: vh(0.2),
                marginRight: vw(4),
              }}
            />
            <CustomText title={mobile ? mobile : 'No mob'} />
          </View>
          <View style={{borderTopWidth:1, borderColor:Colors.borderColor, marginBottom:vh(2)}} />
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:vh(2)}}>
            <Image
              source={Images.email}
              style={{
                height: 25,
                width: 25,
                bottom: vh(0.2),
                marginRight: vw(4),
              }}
            />
            <CustomText title={email ? email : 'Email'} />
          </View>
        </View> */}
      </View>
      {/* add goal view  */}
      <View style={{
            backgroundColor: Colors.white,
            width: '90%',
            alignSelf: 'center',
            elevation: 3,
            borderRadius: 5,
            paddingTop: vw(4),
            paddingHorizontal:vh(2),
            marginTop: vh(2),
            flexDirection:'row',
            paddingBottom:vh(2)
          }} 
          // onPress={()=>navigation.navigate('ViewGoal')}
          >
          <Image source={Images.night_mode} style={{height:20,width:20, marginRight:vh(2)}} />
          <CustomText title={'Night Mode'} />
          <TouchableOpacity onPress={()=>onChangeTheme()} style={{position:'absolute', right:vw(3), top:vh(1.6)}} >
            <Image source={nightMode == false ? Images.switch_off : Images.switch_on} style={{height:26,width:26}} />
          </TouchableOpacity>
      </View>

      {/* pdf generate */}
      <TouchableOpacity onPress={()=>navigation.navigate('CustomBill')} activeOpacity={0.6} style={{
            backgroundColor: Colors.white,
            width: '90%',
            alignSelf: 'center',
            elevation: 3,
            borderRadius: 5,
            paddingTop: vw(4),
            paddingHorizontal:vh(2),
            marginTop: vh(2),
            flexDirection:'row',
            paddingBottom:vh(2)
          }} >
          <Image source={Images.pdf} style={{height:20,width:20, marginRight:vh(2)}} />
          <CustomText title={'Generate PDF'} />
          <Image source={Images.back_black} style={{height:20,width:20, transform:[{rotate:'180deg'}], position:'absolute', right:vw(3), top:vh(2)}} />
      </TouchableOpacity>
      {/* privacy */}
      <TouchableOpacity onPress={()=>navigation.navigate('Privacy')} activeOpacity={0.6} style={{
        backgroundColor: Colors.white,
        width: '90%',
        alignSelf: 'center',
        elevation: 3,
        borderRadius: 5,
        paddingTop: vw(4),
        paddingHorizontal:vh(2),
        marginTop: vh(2),
        flexDirection:'row',
        paddingBottom:vh(2)
      }} >
          <Image source={Images.privacy} style={{height:20,width:20, marginRight:vh(2)}} />
          <CustomText title={'Privacy Policy'} />
          <Image source={Images.back_black} style={{height:20,width:20, transform:[{rotate:'180deg'}], position:'absolute', right:vw(3), top:vh(2)}} />
      </TouchableOpacity>
      <View style={{flexDirection:'row', marginTop:vh(39), justifyContent:'center', alignItems:'center'}}>
        <CustomText title={`${'\u00A9'}2022 Expense Inc. All rights reserved`} isBold style={{fontSize:12, color:nightMode == true ? Colors.white : Colors.textColor}} />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
  themeMode: state.theme
})

const mapDispatchToProps = dispatch => {
  return{
    change_theme : data => {
      dispatch(change_theme(data))
    }
  }
}

const getStyles = (nightMode) => StyleSheet.create({
  container:{
    flex:1,
  },
  header_container:{
    flexDirection:'row',
    marginTop:vh(2),
    marginLeft:vw(5)
  },
  nightTxt:{
    color: nightMode == true ? Colors.white : Colors.textColor
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
