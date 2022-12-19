import { ImageBackground, View } from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import CustomText from '../../components/CustomText';
import Colors from '../../utils/color';
import { heightPercentageToDP as vh } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import Images from '../../utils/images';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Privacy = () => {
  const navigation = useNavigation()
  return (
    <ImageBackground source={Images.back_1} style={{ flex: 1 }}>
      <TouchableOpacity style={{marginTop:vh(2), marginLeft:vh(2)}} onPress={()=>navigation.goBack()}>
        <Image source={Images.back_3d} style={{height:20, width:20}} />
      </TouchableOpacity>
      {/* <View>
        <CustomHeader isBack />
      </View> */}
      <View style={{ width: '90%', alignSelf: 'center', marginTop: vh(4) }}>
        <CustomText
          title={`This app doesn't take any information and stored user data. No data is shared with the third party. This app is made by Mr. Arpan Govila who is the Software Developer for the purpose of saving data to anyone who stored user data and use for their business. This app is very secure.`}
        />
        <CustomText title={`If you find any problem or any suggestion regarding this app, you can contact directly to the developer through mail or contact with them`} />
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%', alignSelf:'center', marginTop:vh(10)}}>
        <TouchableOpacity onPress={()=>Linking.openURL('tel:+91 7999548329')} style={{}}>
            <Image source={Images.mobile} style={{height:60,width:60}} />
            <CustomText title= {'Contact Us'} style={{fontSize:12, textAlign:'center'}} isBold />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL('mailto:arpan.govila74@gmail.com')} style={{}}>
            <Image source={Images.mail} style={{height:60,width:60}} />
            <CustomText title= {'Email Us'} style={{fontSize:12, textAlign:'center'}} isBold />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Privacy;
