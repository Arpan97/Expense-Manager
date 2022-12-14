import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../utils/images';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import CustomText from '../../components/CustomText';
import Colors from '../../utils/color';
import { investCatType, investmentCat } from '../../utils/constants';
import Textstyles from '../../utils/text';
import CustomButton from '../../components/CustomButton';
import Notify from '../../utils/Dialog';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { save_investment } from '../../redux/Action/Action';

const AddInvestCat = (props) => {
  const navigation = useNavigation();
  const [isCatModal, setIsCatModal] = useState(false)
  const [selectInvest, setSelectInvest] = useState('')
  const [isAppModal, setIsAppModal] = useState(false)
  const [selectApp, setSelectApp] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [investmentDate, setInvestmentDate] = useState('')
  const [investmentVisible, setinvestmentVisible] = useState(false);
  const onBack = () => {
    navigation.goBack();
  };
const onStartChange = async (event, selectedDate) => {
    const currentDate = selectedDate || investmentDate;
    const fullDate = await `${moment(currentDate).year()}-${
      moment(currentDate).month() + 1
    }-${moment(currentDate).date()}`;
    setInvestmentDate(fullDate);
    setinvestmentVisible(false);
};
  const save_investment = () => {
    if(selectInvest != ''){
        if(selectApp != ''){
            if(title != ''){
                if(amount != 0){
                    if(investmentDate != ''){
                        let body = {
                            id:Math.random().toString(16).slice(2),
                            investment_title: title,
                            investment_amount: parseInt(amount),
                            investment_date: investmentDate,
                            investment_type:selectInvest,
                            investment_platform: selectApp
                        }
                        Notify('success', 'Successfull', 'You investment is successfully added')
                        props?.save_investment(body)
                        navigation.goBack()
                    }else{
                        Notify('error', 'Alert', 'You have to select investment date to proceed')
                    }
                }else{
                    Notify('error', 'Alert', 'You have to enter some amount to proceed')
                }
            }else{
                Notify('error', 'Alert', 'You have to enter some title to proceed')
            }
        }else{
            Notify('error', 'Alert', 'You have to select platform to proceed')
        }
    }else{
        Notify('error', 'Alert', 'You have to select investment type to proceed')
    }
  }
  return (
    <View style={{marginTop: vh(2)}}>
      <View style={{flexDirection: 'row', marginLeft: vw(5)}}>
        <TouchableOpacity style={{width: '10%'}} onPress={onBack}>
          <Image source={Images.back_3d} style={{height: 22, width: 22}} />
        </TouchableOpacity>
        <View style={{width: '74%', alignItems: 'center'}}>
          <CustomText
            title={'Add Investment'}
            isBold
            style={{color: Colors.themeColor}}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop:vh(2)}}>
            <View>
                <View style={{width:'94%', alignSelf:'center', marginBottom:vh(1)}}>
                    <CustomText title={'Investment Type'} isBold style={{fontSize:12}} />
                </View>
                <View
                style={{
                    backgroundColor: Colors.white,
                    elevation: 3,
                    width: '95%',
                    borderRadius: 10,
                    alignSelf: 'center',
                    paddingHorizontal: vh(1),
                    paddingTop: vh(1.2),
                    paddingBottom: vh(0.5),
                }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setIsCatModal(!isCatModal)}
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: isCatModal ? 1 : 0,
                    borderColor: Colors.borderColor,
                    paddingBottom: vh(1),
                    }}>
                    <CustomText title={selectInvest ? selectInvest : 'Select Investment'} />
                    <Image
                    source={Images.back_black}
                    style={{
                        height: 20,
                        width: 20,
                        transform: [{rotate: isCatModal ? '90deg' : '270deg'}],
                    }}
                    />
                </TouchableOpacity>
                {isCatModal && (
                    <ScrollView>
                    {investmentCat?.map((item, index) => {
                        return (
                        <View
                            style={{
                            backgroundColor: Colors.white,
                            borderBottomWidth: 1,
                            borderColor: Colors.borderColor,
                            padding: vh(1),
                            }}>
                            <TouchableOpacity
                            onPress={() => {
                                setIsCatModal(false), setSelectInvest(item?.category);
                            }}>
                            <CustomText title={item?.category} />
                            </TouchableOpacity>
                        </View>
                        );
                    })}
                    </ScrollView>
                )}
                </View>
            </View>
        </View>
        <View style={{marginTop:vh(2)}}>
            <View>
                <View style={{width:'94%', alignSelf:'center', marginBottom:vh(1)}}>
                    <CustomText title={'Platform Type'} isBold style={{fontSize:12}} />
                </View>
                <View
                style={{
                    backgroundColor: Colors.white,
                    elevation: 3,
                    width: '95%',
                    borderRadius: 10,
                    alignSelf: 'center',
                    paddingHorizontal: vh(1),
                    paddingTop: vh(1.2),
                    paddingBottom: vh(0.5),
                }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setIsAppModal(!isAppModal)}
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: isAppModal ? 1 : 0,
                    borderColor: Colors.borderColor,
                    paddingBottom: vh(1),
                    }}>
                    <CustomText title={selectApp ? selectApp : 'Select Application'} />
                    <Image
                    source={Images.back_black}
                    style={{
                        height: 20,
                        width: 20,
                        transform: [{rotate: isAppModal ? '90deg' : '270deg'}],
                    }}
                    />
                </TouchableOpacity>
                {isAppModal && (
                    <ScrollView>
                    {investCatType?.map((item, index) => {
                        return (
                        <View
                            style={{
                            backgroundColor: Colors.white,
                            borderBottomWidth: 1,
                            borderColor: Colors.borderColor,
                            padding: vh(1),
                            }}>
                            <TouchableOpacity
                            onPress={() => {
                                setIsAppModal(false), setSelectApp(item?.category);
                            }}>
                            <CustomText title={item?.category} />
                            </TouchableOpacity>
                        </View>
                        );
                    })}
                    </ScrollView>
                )}
                </View>
            </View>
        </View>
        <View style={{marginTop:vh(2)}}>
            <View style={{width:'94%', alignSelf:'center'}}>
                <CustomText title={'Investment Name'} isBold style={{fontSize:12}} />
            </View>
            <View style={{
                    backgroundColor: Colors.white,
                    elevation: 3,
                    width: '95%',
                    borderRadius: 10,
                    alignSelf: 'center',
                    paddingHorizontal: vh(1),
                    marginTop:vh(1)
                }}>
                <TextInput placeholderTextColor={Colors.textColor} style={[Textstyles.medium,{color:Colors.textColor, fontSize:14}]} placeholder='Enter investment title' value={title} onChangeText={(txt)=>setTitle(txt)} />
            </View>
        </View>
        <View style={{marginTop:vh(2)}}>
            <View style={{width:'94%', alignSelf:'center'}}>
                <CustomText title={'Invested Amount'} isBold style={{fontSize:12}} />
            </View>
            <View style={{
                    backgroundColor: Colors.white,
                    elevation: 3,
                    width: '95%',
                    borderRadius: 10,
                    alignSelf: 'center',
                    paddingHorizontal: vh(1),
                    marginTop:vh(1)
                }}>
                <TextInput placeholderTextColor={Colors.textColor} style={[Textstyles.medium,{color:Colors.textColor, fontSize:14}]} placeholder='Enter investment amount' value={amount} onChangeText={(txt)=>setAmount(txt)} keyboardType='numeric' />
            </View>
        </View>
        <View>
            <View
              style={{
                marginTop: vh(2),
                width: '95%',
                alignSelf: 'center',
                marginBottom: vh(1),
              }}>
              <CustomText title={`Select Investment date`} isBold style={{fontSize:12}} />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setinvestmentVisible(true)}
              style={{
                backgroundColor: Colors.white,
                elevation: 3,
                width: '95%',
                borderRadius: 10,
                alignSelf: 'center',
                paddingHorizontal: vh(1),
                paddingTop: vh(0.1),
                paddingBottom: vh(0.1),
              }}>
              <TextInput
                placeholder="Select investment date"
                value={investmentDate}
                keyboardType="number-pad"
                placeholderTextColor={Colors.textColor}
                editable={false}
                style={[Textstyles.medium,{color:Colors.textColor, fontSize:14}]}
              />
            </TouchableOpacity>
          </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: vh(4),
            marginBottom:vh(2)
          }}>
          <CustomButton
            onPress={() => navigation.goBack()}
            btnStyle={{backgroundColor: Colors.transparent}}
            title={'Cancel'}
          />
          <CustomButton
            onPress={() => save_investment()}
            title={'Save'}
            btnStyle={{
              backgroundColor:Colors.themeColor,
              borderRadius: 10,
              elevation: 3,
            }}
            txtStyle={{color: Colors.white}}
          />
        </View>
      </ScrollView>
      {investmentVisible && (
        <DateTimePicker
          style={{
            backgroundColor: '#fff',
            elevation: 1,
          }}
          mode="date"
          value={new Date()}
          display="spinner"
          onChange={onStartChange}
          textColor="black"
        />
      )}
    </View>
  );
};

const mapDispatchToProps = dispatch => {
    return {
        save_investment: data => {
            dispatch(save_investment(data))
        }
    }
}

export default connect (null, mapDispatchToProps) (AddInvestCat);

const styles = StyleSheet.create({});
