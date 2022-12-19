import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/CustomText';
import Colors from '../../utils/color';
import Images from '../../utils/images';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {connect} from 'react-redux';
import {add_premium} from '../../redux/Action/Action';
import Notify from '../../utils/Dialog'

const {width, height} = Dimensions.get('window');

const Premium = props => {
  const navigation = useNavigation();
  const [plans, setPlans] = useState([
    {
      plan_name: 'Trial',
      plan_price: 0,
      plan_time: 1,
      plan_desc:
        'Get 1 Month subsciption for fully access to Expense Manager premium features',
      inPlan: `
      1. You can add Bank Account Details
      2. You can use dark mode.
      3. You can add Mutual fund and Stock accounts in it.
      `,
    },
    {
      plan_name: 'Silver',
      plan_price: 149,
      plan_time: 3,
      plan_desc:
        'Get 3 Month subsciption for fully access to Expense Manager premium features',
      inPlan: `
        1. You can add Bank Account Details
        2. You can use dark mode.
        3. You can add Mutual fund and Stock accounts in it.
        `,
    },
    {
      plan_name: 'Gold',
      plan_price: 349,
      plan_time: 6,
      plan_desc:
        'Get 6 Month subsciption for fully access to Expense Manager premium features',
      inPlan: `
        1. You can add Bank Account Details
        2. You can use dark mode.
        3. You can add Mutual fund and Stock accounts in it.
        `,
    },
    {
      plan_name: 'Platinum',
      plan_price: 649,
      plan_time: 12,
      plan_desc:
        'Get 1 Year subsciption for fully access to Expense Manager premium features',
      inPlan: `
        1. You can add Bank Account Details
        2. You can use dark mode.
        3. You can add Mutual fund and Stock accounts in it.
        `,
    },
  ]);

  const handleBack = () => {
    navigation.goBack();
  };

  const buyPremium = data => {
    function addMonth(numOfMonth, date = new Date()) {
      date.setMonth(date.getMonth() + numOfMonth);
      return date;
    }
    const result = addMonth(data?.plan_time);
    let body = {
      plan_name: data?.plan_name,
      plan_price: data?.plan_price,
      plan_time: data?.plan_time,
      expiry_time: result,
    };
    navigation.replace('Drawer', {screen: 'Dashboard'});
    Notify('success', 'Purchased', `Congratulations! You buy ${data?.plan_name} pack for ${data?.plan_time} months`)
    props?.save_premium(body);
  };

  const renderPlans = ({item,index}) => {
    return(
      <ImageBackground source={Images.cat_white} style={{height:200, width:'100%', alignSelf:'center', marginBottom:vh(1), borderRadius:4, elevation:3, overflow:'hidden'}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={{width:'17%'}}>
            <Image source={Images.premium} style={{height:60, width:60}} />
          </View>
          <View style={{flexDirection:'row', alignItems:'center', width:'55%'}}>
            <View>
              <CustomText title={'Plan Type : '} isBold />
              <CustomText title={'Plan Duration : '} isBold />
            </View>
            <View>
              <CustomText title={item?.plan_name} style={{fontSize:13}} />
              <CustomText title={`${item?.plan_time} Month`} style={{fontSize:13}} />
            </View>
          </View>
          <TouchableOpacity onPress={()=>buyPremium(item)} style={{width:'20%', backgroundColor:Colors.black, paddingVertical:vh(1), borderRadius:4, elevation:5, justifyContent:'center', alignItems:'center'}}>
            <CustomText title={`${'\u20B9'}${item?.plan_price}`} style={{color:Colors.white}} isBold />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft:vw(3)}}>
          <CustomText title={'Plan Description : '} isBold />
          <CustomText title={item?.inPlan} style={{fontSize:13}} />
        </View>
      </ImageBackground>
    )
  }

  console.log('the premium', props?.premiumData)

  return (
    <ImageBackground style={{flex:1}} source={Images.back_1}>
      <View style={{flexDirection: 'row', marginTop: vh(2), marginLeft: vw(4)}}>
        <TouchableOpacity
          onPress={() => handleBack()}
          style={{height: 22, width: 22}}>
          <Image
            source={Images.back_3d}
            style={{height: '100%', width: '100%'}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '82%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText
            title={'Buy Premium'}
            isBold
            style={{color: Colors.themeColor, fontSize: 18}}
          />
        </View>
      </View>
      {props?.premiumData != '' && (
      <>
        <View style={{width:'95%', alignSelf:'center', borderRadius:20, overflow:'hidden', marginTop:vh(2), elevation:3}}>
          <ImageBackground source={Images.goal_card} style={{height:210, width:'100%'}}>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1)}}>
                  <CustomText title={(props?.premiumData?.plan_name).toUpperCase()} isBold style={{fontSize:16}} />
              </View>
              <View style={{marginLeft:vw(2)}}>
              <View style={{}}>
                  <CustomText title={'Plan Price'} isBold style={{fontSize:12}} />
              </View>
              <View style={{paddingLeft:vw(1), marginBottom:vh(0.2)}}>
                  <CustomText title={`${'\u20B9'}${props?.premiumData?.plan_price}`} style={{fontSize:12, color:Colors.white}} />
              </View>
              </View>
              <View style={{marginTop:vh(0.4),marginLeft:vw(2)}}>
              <View style={{}}>
                  <CustomText title={'Plan Time'} isBold style={{fontSize:12}} />
              </View>
              <View style={{paddingLeft:vw(1), marginTop:vh(0.5)}}>
                  <CustomText title={`${(props?.premiumData?.plan_time)} Month`} style={{fontSize:12, color:Colors.white}} />
              </View>
              </View>
              <View style={{position:'absolute', bottom:vh(7.5), right:vw(28)}}>
                  <Image source={Images.premium} style={{height:60, width:60}} />
              </View>
          </ImageBackground>
        </View>
      </>
      )}
      <View style={{marginTop:vh(3), width:'95%', alignSelf:'center'}}>
        <FlatList data={plans} renderItem={renderPlans} style={{marginBottom: props?.premiumData != '' ? vh(33) : vh(5)}} showsVerticalScrollIndicator={false} />
      </View>
      
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  premiumData: state.premium
})

const mapDispatchToProps = dispatch => {
  return {
    save_premium: data => {
      dispatch(add_premium(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Premium);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_Container: {
    flex: 1,
    alignItems: 'center',
  },
  first_sub_container: {
    flex: 0.3,
    width: width - 20,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: Colors.white,
    // elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subscribe_image: {
    height: 100,
    width: 100,
  },
  subscribe_text: {
    fontSize: 18,
    textAlign: 'center',
  },
  second_sub_container: {
    flex: 0.7,
    marginVertical: 20,
  },
  flatlist_container: {
    width: '45%',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  flatlist_text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.green,
    borderRadius: 15,
    width: width / 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  button_text: {
    textAlign: 'center',
  },
});
