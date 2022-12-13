import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/CustomText';
import Colors from '../../utils/color';
import Images from '../../utils/images';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import moment from 'moment';
import { connect } from 'react-redux';
import { add_premium } from '../../redux/Action/Action';

const {width, height} = Dimensions.get('window')


const Premium = (props) => {
    const navigation = useNavigation()
    const [plans, setPlans] = useState([
        {plan_name:'Trial', plan_price:0, plan_time:1, plan_desc:'Get 1 Month subsciption for fully access to Expense Manager premium features'},
        {plan_name:'Silver', plan_price:149, plan_time:3, plan_desc:'Get 3 Month subsciption for fully access to Expense Manager premium features'},
        {plan_name:'Gold', plan_price:349, plan_time:6, plan_desc:'Get 6 Month subsciption for fully access to Expense Manager premium features'},
        {plan_name:'Platinum', plan_price:649, plan_time:12, plan_desc:'Get 1 Year subsciption for fully access to Expense Manager premium features'}
    ])

    const handleBack = () => {
        navigation.goBack();
      }

      const buyPremium = (data) => {
        function addMonth(numOfMonth, date = new Date()){
            date.setMonth(date.getMonth() + numOfMonth)
            return date
        }
        const result = addMonth(data?.plan_time)
        let body = {
            plan_name: data?.plan_name,
            plan_price: data?.plan_price,
            plan_time: data?.plan_time,
            expiry_time: result,
        }
        navigation.replace('Drawer', {screen:'Dashboard'})
        props?.save_premium(body)
      }
    
  return (
    <View
    style={styles.container}>
        <View style={{flexDirection:'row', marginTop:vh(2)}}>
            <TouchableOpacity onPress={()=>handleBack()} style={{height:25, width:25}}>
                <Image source={Images.back_3d} style={{height:'100%', width:'100%'}} />
            </TouchableOpacity>
            <View style={{width:'85%', justifyContent:'center', alignItems:'center'}}>
                <CustomText title={'Buy Premium'} isBold />
            </View>
        </View>
    <View style={styles.sub_Container}>
      <View style={styles.second_sub_container}>
        <FlatList
          numColumns={2}
          data={plans}
          renderItem={({item, index}) => {
            return (
              <LinearGradient
                colors={[
                  Colors.white,
                  Colors.themeColor
                ]}
                style={styles.flatlist_container}>
                <TouchableOpacity
                  onPress={() => buyPremium(item)}>
                    <CustomText style={styles.subscribe_text} title={item?.plan_name} isBold />
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <CustomText title={'Amount : '} isBold />
                    <CustomText title={`${'\u20B9'}${item?.plan_price}`} />
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <CustomText title={'Duration : '} isBold />
                    <CustomText title={`${item?.plan_time} Month`} />
                  </View>
                  {/* {item?.plan_discount != '' ? (
                    <View style={{flexDirection: 'row', marginVertical: 5}}>
                        <CustomText title={'Discount : '} isBold />
                        <CustomText title={item?.plan_discount} />
                    </View>
                  ) : null} */}
                  <CustomText title={item?.plan_desc} />
                </TouchableOpacity>
              </LinearGradient>
            );
          }}
        />
      </View>
    </View>
  </View>

  )
}

const mapDispatchToProps = dispatch => {
    return{
        save_premium: data => {
            dispatch(add_premium(data))
        }
    }
}

export default connect (null, mapDispatchToProps) (Premium)

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
})