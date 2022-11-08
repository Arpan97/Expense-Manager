import {View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const Profile = (props) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('')
  const navigation = useNavigation()
  
  const checkData = () => {
    let data = props?.user
    setName(data.name)
    setMobile(data.mobile)
    setEmail(data.mail)
    setImg(data.image)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkData()
    });
    return unsubscribe;
  }, [navigation, props?.user]);
  return (
    <View>
      <View>
        <CustomHeader isBack />
      </View>
      {/* image view  */}
      <View
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
          overflow:'hidden',
          borderWidth:1,
          borderColor:Colors.borderColor
        }}>
        <Image
          source={img ? {uri:img} : Images.user}
          style={{height: '100%', width: '100%', resizeMode: 'cover'}}
        />
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('EditProfile',{data:props?.user})} style={{justifyContent:'center', alignItems:'center', marginTop:vh(1)}}>
        <CustomText title={'Edit profile'} />
      </TouchableOpacity>
      {/* detail name view  */}
      <View>
        <View
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
              source={Images.user}
              style={{
                height: 25,
                width: 25,
                bottom: vh(0.2),
                marginRight: vw(4),
              }}
            />
            <CustomText title={name ? name : 'Welcome user'} />
          </View>
        </View>

        <View
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
        </View>
      </View>
      {/* add goal view  */}
      <TouchableOpacity activeOpacity={0.6} style={{
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
          }} onPress={()=>navigation.navigate('ViewGoal')}>
          <Image source={Images.goal} style={{height:20,width:20, marginRight:vh(2)}} />
          <CustomText title={'View Goal'} />
          <Image source={Images.back_black} style={{height:20,width:20, transform:[{rotate:'180deg'}], position:'absolute', right:vw(3), top:vh(2)}} />
      </TouchableOpacity>

      {/* show history */}
      <TouchableOpacity onPress={()=>navigation.navigate('ShowHistory')} activeOpacity={0.6} style={{
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
      >
        <Image source={Images.history} style={{height:20,width:20, marginRight:vh(2)}} />
        <CustomText title={'Show Monthly History'} />
        <Image source={Images.back_black} style={{height:20,width:20, transform:[{rotate:'180deg'}], position:'absolute', right:vw(3), top:vh(2)}} />
      </TouchableOpacity>
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
      {/* social icons */}
      <View style={{flexDirection:'row', marginTop:vh(3), justifyContent:'space-around'}}>
        <TouchableOpacity onPress={()=>Linking.openURL('https://in.linkedin.com/in/arpan-govila-b865031a4')}>
          <Image source={Images.linkedin} style={{height:40,width:40}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.youtube} style={{height:40,width:40}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL('https://www.facebook.com/arpan.govila.7/')}>
          <Image source={Images.facebook} style={{height:40,width:40}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userData
})

export default connect(mapStateToProps, null)(Profile);
