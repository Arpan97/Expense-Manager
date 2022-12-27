import { ImageBackground, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import CustomHeader from '../../components/CustomHeader';
import CustomText from '../../components/CustomText';
import Colors from '../../utils/color';
import { heightPercentageToDP as vh, widthPercentageToDP as vw } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import Images from '../../utils/images';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

const Privacy = (props) => {
  const navigation = useNavigation()
  const [nightMode, setNightMode] = useState(false)

  useMemo(()=>{
    if(props?.themeMode == false){
      setNightMode(false)
    }else if(props?.themeMode == true){
      setNightMode(true)
    }
  },[props?.themeMode, nightMode])
  return (
    <View style={{ flex: 1, backgroundColor:nightMode == true ? Colors.black : Colors.backgroundColor }}>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{marginTop:vh(2), marginLeft:vh(2)}} onPress={()=>navigation.goBack()}>
          <Image source={nightMode == true ? Images.back_white : Images.back_3d} style={{height:20, width:20}} />
        </TouchableOpacity>
        <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1.8), marginLeft:vw(5)}}>
          <CustomText title={'Privacy Policy'} isBold style={{color:nightMode == true ? Colors.white : Colors.textColor}} />
        </View>
      </View>
      {/* <View>
        <CustomHeader isBack />
      </View> */}
      <View style={{ width: '90%', alignSelf: 'center', marginTop: vh(4) }}>
        <CustomText
          title={`This app doesn't take any information and stored user data. No data is shared with the third party. This app is made by Mr. Arpan Govila who is the Software Developer for the purpose of saving data to anyone who stored user data and use for their business. This app is very secure.`}
         style={{color:nightMode == true ? Colors.white : Colors.textColor}} />
        <CustomText title={`If you find any problem or any suggestion regarding this app, you can contact directly to the developer through mail or contact with them`} style={{color:nightMode == true ? Colors.white : Colors.textColor}} />
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%', alignSelf:'center', marginTop:vh(10)}}>
        <TouchableOpacity onPress={()=>Linking.openURL('tel:+91 7999548329')} style={{}}>
            <Image source={Images.mobile} style={{height:60,width:60}} />
            <CustomText title= {'Contact Us'} style={{fontSize:12, textAlign:'center',color:nightMode == true ? Colors.white : Colors.textColor}} isBold />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL('mailto:arpan.govila74@gmail.com')} style={{}}>
            <Image source={Images.mail} style={{height:60,width:60}} />
            <CustomText title= {'Email Us'} style={{fontSize:12, textAlign:'center',color:nightMode == true ? Colors.white : Colors.textColor}} isBold />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  themeMode: state.theme
})

export default connect(mapStateToProps, null) (Privacy);
