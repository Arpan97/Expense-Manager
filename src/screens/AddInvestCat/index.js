import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
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
import { save_investment, update_invest } from '../../redux/Action/Action';
import {Picker} from '@react-native-picker/picker';
import CustomInput from '../../components/CustomComponent/CustomInput';

const AddInvestCat = (props) => {
  const data = props?.route?.params?.data
  const navigation = useNavigation();
  const [isCatModal, setIsCatModal] = useState(false)
  const [selectInvest, setSelectInvest] = useState(data == undefined ? '' : data?.investment_type)
  const [isAppModal, setIsAppModal] = useState(false)
  const [selectApp, setSelectApp] = useState(data == undefined ? '' : data?.selectApp)
  const [title, setTitle] = useState(data == undefined ? '' : data?.investment_title)
  const [amount, setAmount] = useState(data == undefined ?  0 : (data?.investment_amount).toString())
  const [investmentDate, setInvestmentDate] = useState(data == undefined ? '' : data?.investmentDate)
  const [investmentVisible, setinvestmentVisible] = useState(false);
  const [nightMode, setNightMode] = useState(false)
  const [error, setError] = useState('');

  useMemo(()=>{
    if(props?.themeMode == false){
      setNightMode(false)
    }else if(props?.themeMode == true){
      setNightMode(true)
    }
  },[props?.themeMode, nightMode])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(props?.themeMode == false){
        setNightMode(false)
      }else if(props?.themeMode == true){
        setNightMode(true)
      }
    });
    return unsubscribe;
  }, [navigation, props?.themeMode]);

  const onBack = () => {
    navigation.goBack();
  };
const onStartChange = async (event, selectedDate) => {
  setinvestmentVisible(false);
    const currentDate = selectedDate || investmentDate;
    const fullDate = await `${moment(currentDate).year()}-${
      moment(currentDate).month() + 1
    }-${moment(currentDate).date()}`;
    const dates = await currentDate
    // console.log('the full date is ===>', fullDate, "the current date is ===>", currentDate)
    setInvestmentDate(dates);
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
                        // console.log('the body ', body)
                        setError(false)
                        Notify('success', 'Successfull', 'You investment is successfully added')
                        props?.save_investment(body)
                        navigation.goBack()
                    }else{
                      setError(true)
                    }
                }else{
                  setError(true)
                }
            }else{
              setError(true)
            }
        }else{
          setError(true)
        }
    }else{
      setError(true)
    }
  }

  const update_investment = () => {
    if(selectInvest != ''){
      if(selectApp != ''){
          if(title != ''){
              if(amount != 0){
                  if(investmentDate != ''){
                      let body = {
                          id:data?.id,
                          investment_title: title,
                          investment_amount: parseInt(amount),
                          investment_date: investmentDate,
                          investment_type:selectInvest,
                          investment_platform: selectApp
                      }
                      setError(false)
                      Notify('success', 'Successfull', 'You investment is successfully updated')
                      props?.update_invest(body)
                      navigation.goBack()
                  }else{
                    setError(true)
                  }
              }else{
                setError(true)
              }
          }else{
            setError(true)
          }
      }else{
        setError(true)
      }
  }else{
    setError(true)
  }
  }
  return (
    <View style={{backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor, flex:1}}>
      <View style={{flexDirection: 'row', marginLeft: vw(5), marginTop:vh(2)}}>
        {/* <TouchableOpacity style={{width: '10%'}} onPress={onBack}>
          <Image source={nightMode == true ? Images.back_white : Images.back_3d} style={{height: 22, width: 22}} />
        </TouchableOpacity> */}
        <View style={{width: '100%', alignItems: 'center'}}>
          <CustomText
            title={'Add Investment'}
            isBold
            style={{color: nightMode == true ? Colors.white : Colors.textColor, fontSize:18}}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{marginTop:vh(2)}}>
            <View>
                <View style={{width:'94%', alignSelf:'center', marginBottom:vh(1)}}>
                    <CustomText title={'Investment Type'} isBold style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} />
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
                  <Picker
                    selectedValue={selectInvest}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectInvest(itemValue)
                    }
                    style={{height:28, bottom:vh(2), right:vw(3)}}
                    >
                      <Picker.Item label='Select Investment' value={null} />
                      {investmentCat?.map((item,index)=>{
                        return(
                        <Picker.Item label={item?.category} value={item?.category} />
                        )
                      })}
                  </Picker>
                </View>
            </View>
        </View>
        <View style={{marginTop:vh(2)}}>
            <View>
                <View style={{width:'94%', alignSelf:'center', marginBottom:vh(1)}}>
                    <CustomText title={'Platform Type'} isBold style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} />
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
                  <Picker
                    selectedValue={investCatType}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectApp(itemValue)
                    }
                    style={{height:28, bottom:vh(2), right:vw(3)}}
                    >
                      <Picker.Item label='Select Platform' value={null} />
                      {investCatType?.map((item,index)=>{
                        return(
                        <Picker.Item label={item?.category} value={item?.category} />
                        )
                      })}
                  </Picker>
                </View>
            </View>
        </View>
        <View style={{marginTop:vh(2), width:'99%', alignSelf:'center'}}>
            <View style={{width:'94%', alignSelf:'center'}}>
                <CustomText title={'Investment Title'} isBold style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View style={{
                    paddingHorizontal: vh(1),
                    marginTop:vh(1)
                }}>
                  <CustomInput
                    value={title}
                    onChangeText={txt => setTitle(txt)}
                    placeholder={'Enter investment title'}
                    error={error == '' ? null : error}
                  />
            </View>
        </View>
        <View style={{marginTop:vh(2)}}>
            <View style={{width:'94%', alignSelf:'center'}}>
                <CustomText title={'Invested Amount'} isBold style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View style={{
                    paddingHorizontal: vh(1),
                    marginTop:vh(1)
                }}>
                  <CustomInput
                    value={amount}
                    onChangeText={txt => setAmount(txt)}
                    placeholder={'Enter investment amount'}
                    error={error == '' ? null : error}
                    keyboardType={'numeric'}
                  />
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
              <CustomText title={`Select Investment date`} isBold style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setinvestmentVisible(true)}
              style={{
                paddingHorizontal: vh(1),
                paddingTop: vh(0.1),
                paddingBottom: vh(0.1),
              }}>
                <CustomInput
                    value={investmentDate == '' ? investmentDate : moment(investmentDate).format('DD-MM-YYYY')}
                    placeholder={'Select investment date'}
                    error={error == '' ? null : error}
                    keyboardType={'number-pad'}
                    editable={false}
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
            onPress={() => {
              navigation.goBack()
              setError(false)
            }}
            btnStyle={{backgroundColor: Colors.transparent}}
            title={'Cancel'}
            txtStyle={{color: nightMode == true ? Colors.white : Colors.textColor}}
          />
          <CustomButton
            onPress={() => data == undefined ? save_investment() : update_investment()}
            title={data == undefined ? 'Save Invest' : 'Update Invest'}
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

const mapStateToProps = state => ({
  themeMode: state.theme
})

const mapDispatchToProps = dispatch => {
    return {
        save_investment: data => {
            dispatch(save_investment(data))
        },
        update_invest: data => {
          dispatch(update_invest(data))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (AddInvestCat);

const styles = StyleSheet.create({});
