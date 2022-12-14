import {StyleSheet, Text, View, Dimensions, Image, Linking, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../utils/color';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import CustomText from './CustomText';
import { connect } from 'react-redux';
import Images from '../utils/images';
import { useNavigation } from '@react-navigation/native';
import AlertBox from '../utils/AlertBox'
const {height, width} = Dimensions.get('window')

const DrawerContainer = (props) => {
    const [name,setName] = useState('')
  const [img, setImg] = useState('')
  const navigation = useNavigation();
  const [isPremium, setIsPremium] = useState(false)
  const [premiumTime, setPremiumTime] = useState('')
  const getUserData = () => {
    let data = props?.user
    setName(data?.name)
    setImg(data?.image)
  }

  const buyPremium = () => {
    navigation.navigate('Premium')
  }

  const checkPremium = (txt) => {
    if(isPremium){
        if(txt == 'Bank'){
            navigation.navigate('Drawer',{screen:'Bank'})
        }else if(txt == 'Invest'){
            navigation.navigate('Drawer',{screen:'Invest'})
        }
    }else{
        AlertBox('warning','Warning','Please subscribe to use this feature')
    }
  }

  useEffect(()=>{
    if(props?.premiumData == ''){
        setIsPremium(false)
    }else{
        getTimeRemaining(props?.premiumData?.expiry_time)
        setIsPremium(true)
    }
  },[props?.premiumData])

  useEffect(()=>{
    setInterval(() => {
        getTimeRemaining(props?.premiumData?.expiry_time)
    }, 60000);
  },[])

    function getTimeRemaining(endtime){
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60 );
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );
        const days = Math.floor( total/(1000*60*60*24) );
        
        setPremiumTime(`${days}D ${hours}H ${minutes} Min`)
    }

  useEffect(()=>{
    getUserData()
  },[props?.user])
  return (
    <DrawerContentScrollView {...props} style={[Styles.container]} drawerLabelStyle={Styles.item}>
        <View style={{flexDirection:'row'}}>
            <View style={{backgroundColor:Colors.white, width:90, height:90, overflow:'hidden', borderRadius:60, borderWidth:1, borderColor:Colors.borderColor, elevation:3, marginLeft:vw(2), marginTop:vh(2)}}>
                <Image source={img ? {uri:img} : Images.user} style={{height: '100%', width: '100%', overflow:'hidden'}} />
            </View>
            {!isPremium ? (
                <TouchableOpacity onPress={()=>buyPremium()} style={{backgroundColor:Colors.white, justifyContent:'center', alignItems:'center', height:30, paddingHorizontal:vw(2), flexDirection:'row', borderRadius:10, elevation:5, marginTop:vh(6), marginLeft:vw(4)}}>
                    <View style={{width:20, height:20, marginRight:vw(2)}}>
                        <Image source={Images.premium} style={{height:'100%', width:'100%'}} />
                    </View>
                    <View style={{}}>
                        <CustomText title={'Buy premium'} isBold style={{fontSize:12, color:Colors.themeColor}} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={{backgroundColor:Colors.white, justifyContent:'center', alignItems:'center', height:30, paddingHorizontal:vw(2), flexDirection:'row', borderRadius:10, elevation:5, marginTop:vh(6), marginLeft:vw(4)}}>
                    <CustomText title={premiumTime} isBold />
                </View>
            )}
        </View>
        <View style={{marginLeft:vw(4), marginVertical:vh(1)}}>
            <CustomText title={`Hello,${name ? name : ' User'}`} isBold style={{fontSize:16, color:Colors.white}} />
            <CustomText title={'Welcome Back'} isBold style={{fontSize:14, color:Colors.white}} />
        </View>
        <View style={{backgroundColor:Colors.white, height:vh(72), marginLeft:vw(5), borderTopLeftRadius:20, borderBottomLeftRadius:20}}>
            <View style={{borderTopLeftRadius:20, paddingVertical:vh(1.4)}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.home} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'80%', justifyContent:'center'}}>
                        <CustomText title={'Dashboard'} isBold />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Category')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.category} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'80%', justifyContent:'center'}}>
                        <CustomText title={'Category'} isBold />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity  onPress={()=>navigation.navigate('EditProfile',{data:props?.user})} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.user} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'80%', justifyContent:'center'}}>
                        <CustomText title={'Edit Profile'} isBold />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity  onPress={()=>navigation.navigate('ViewGoal')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.goal} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'80%', justifyContent:'center'}}>
                        <CustomText title={'My Goals'} isBold />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity onPress={()=>navigation.navigate('ShowHistory')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.history} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'80%', justifyContent:'center'}}>
                        <CustomText title={'Monthly History'} isBold />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity onPress={()=>checkPremium('Bank')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.bank} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'60%', justifyContent:'center'}}>
                        <CustomText title={'Bank Account'} isBold />
                    </View>
                    {!isPremium && (
                        <View style={{width:'20%', alignItems:'center'}}>
                            <Image source={Images.lock} style={{height:25,width:25}} />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity onPress={()=>checkPremium('Invest')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.investment} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'60%', justifyContent:'center'}}>
                        <CustomText title={'Invest Account'} isBold />
                    </View>
                    {!isPremium && (
                        <View style={{width:'20%', alignItems:'center'}}>
                            <Image source={Images.lock} style={{height:25,width:25}} />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            {/* <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity onPress={()=>navigation.navigate('CustomBill')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.pdf} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'80%', justifyContent:'center'}}>
                        <CustomText title={'Generate PDF'} isBold />
                    </View>
                </TouchableOpacity>
            </View> */}
            <View style={{paddingVertical:vh(0.6)}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Privacy')} style={{flexDirection:'row', borderBottomWidth:2, paddingBottom:vh(1), borderBottomColor:Colors.borderColor,width:'100%'}}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Image source={Images.privacy} style={{height:25, width:25}} />
                    </View>
                    <View style={{width:'80%', justifyContent:'center'}}>
                        <CustomText title={'Privacy Policy'} isBold />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flexDirection:'row', marginTop:vh(1), justifyContent:'space-around'}}>
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
    </DrawerContentScrollView>
  );
};

const mapStateToProps = state => ({
    user: state.userData,
    premiumData: state.premium
  })

export default connect (mapStateToProps, null)(DrawerContainer);

const Styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.themeColor,
        width:width/1.5,
        height:'100%'
    },
    userView: {
      borderRadius: 20,
      backgroundColor: Colors.white,
      // ...GlobalStyle.shadow,
      width: '100%',
      flexDirection: 'row',
      padding: 10,
      marginBottom: 20,
      elevation: 6,
    },
    imageView: {
      borderWidth: 2,
      borderColor: Colors.gray,
      width:vw(18),
      height:vh(9),
      borderRadius: 120,
    },
    userImage: {
      resizeMode: 'contain',
      width: '100%',
      height: '100%',
      borderRadius:120
    },
    list: {
      marginTop: 10,
      paddingHorizontal: 10,
      height: '100%',
    },
    userName: {
      color: Colors.black,
    },
    userEmail: {
      // ...GlobalStyle.textGraySmall
    },
    rowView: {
      width: '100%',
      // backgroundColor:'red',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginTop: -10,
    },
    icons: {
      width: 25,
      height: 25,
      justifyContent: 'center',
    },
    itemView: {
      width: '100%',
    },
    item: {
      // ...GlobalStyle.textBlackHeading,
    },
  });
  
