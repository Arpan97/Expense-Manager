import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../components/CustomText';
import Colors from '../../utils/color';
import Images from '../../utils/images';
import {category} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {add_expense} from '../../redux/Action/Action';
import Snack from '../../utils/snackbar';
import CustomLoader from '../../components/CustomLoader';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomButton from '../../components/CustomButton';
import ALertBox from '../../utils/AlertBox';
import Notify from '../../utils/Dialog';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Textstyles from '../../utils/text';
import { useMemo } from 'react';

const AddExpense = props => {
  const navigation = useNavigation();
  const [typeExpense, setTypeExpense] = useState('Income');
  const [isCatModal, setIsCatModal] = useState(false);
  const [selectCat, setSelectCat] = useState('');
  const [selectCatImg, setSelectCatImg] = useState('');
  const [amount, setAmount] = useState(0); //coming from modal
  const [desc, setDesc] = useState(''); //coming from modal
  const [categories, setCategories] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarDate, setCalendarDate] = useState('');
  const [selectAcc, setSelectAcc] = useState('');
  const [isBankModal, setIsbankModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [accountType, setAccountType] = useState('Debit');
  const [nightMode, setNightMode] = useState(false)

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

  const onStartChange = async (event, selectedDate) => {
    setCalendarVisible(false);
    const currentDate = selectedDate || calendarDate;
    const fullDate = await `${moment(currentDate).year()}-${
      moment(currentDate).month() + 1
    }-${moment(currentDate).date()}`;
    const dates = await currentDate
    setCalendarDate(dates);
    setCalendarVisible(false);
  };

  const save_expense = () => {
    if (selectCat !== '') {
      if (typeExpense == 'Income') {
        let obj = {
          id: Math.random().toString(16).slice(2),
          expenseType: typeExpense,
          account: selectAcc ? selectAcc : 'No category',
          category: selectCat,
          categroy_img: selectCatImg,
          incomeAmount: parseInt(amount),
          expenseAmount: 0,
          description: desc,
          expenseDate: calendarDate
            // ? calendarDate
            // : `${moment().year()}-${moment().month() + 1}-${moment().date()}`,
        };
        props?.add_expense(obj);
        Notify('success', 'Income', 'Income added successfully');
        navigation.goBack();
      } else if (typeExpense == 'Expense') {
        let obj = {
          id: Math.random().toString(16).slice(2),
          expenseType: typeExpense,
          account: selectAcc ? selectAcc : 'No category',
          category: selectCat,
          categroy_img: selectCatImg,
          incomeAmount: 0,
          expenseAmount: parseInt(amount),
          description: desc,
          expenseDate: calendarDate
            // ? calendarDate
            // : `${moment().year()}-${moment().month() + 1}-${moment().date()}`,
        };

        props?.add_expense(obj);
        Notify('success', 'Expense', 'Expense added successfully');
        navigation.goBack();
      }
    } else {
      Notify(
        'warning',
        'Category',
        'Please select category first before submitting',
      );
    }
  };

  const getCategory = () => {
    let data = category?.filter(item => {
      return item.type == typeExpense;
    });
    setCategories(data);
  };

  const checkPremium = txt => {
    if (isPremium) {
      navigation.navigate('Drawer', {screen: 'Bank'});
    } else {
      ALertBox(
        'warning',
        'Warning',
        'Please subscribe to use this feature. You can choose trial version for 1 Month',
      );
      navigation.navigate('Premium');
    }
  };

  useEffect(() => {
    if (props?.premiumData == '') {
      setIsPremium(false);
    } else {
      setIsPremium(true);
    }
  }, [props?.premiumData]);

  useEffect(() => {
    getCategory();
    if (props?.accountData == '') {
      if (props?.creditCard == '') {
        Notify(
          'error',
          'Account Error',
          'Please add atleast one account before add any transaction.',
        );
      }
    }
    // if(props?.accountData == ''){
    //     Notify('error', 'Account Error', 'Please add account before add any transaction. You can try trial version')
    // }else if()
  }, [typeExpense]);

  return (
    <View style={{flex: 1, backgroundColor:nightMode == true ? Colors.black : Colors.backgroundColor}}>
      <ScrollView>
        <View>
          {/* header  */}
          {/* <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity
                onPress={() => setTypeExpense('Income')}
                style={{
                  alignItems: 'center',
                  backgroundColor:
                    typeExpense == 'Income'
                      ? Colors.themeColor
                      : Colors.backgroundColor,
                  width: '50%',
                  // borderWidth: 1,
                  padding: vh(1.2),
                  borderColor: Colors.borderColor,
                }}>
                <CustomText
                  title={'Income'}
                  style={{
                    color: typeExpense == 'Income' ? Colors.white : Colors.black,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setTypeExpense('Expense')}
                style={{
                  alignItems: 'center',
                  backgroundColor:
                    typeExpense == 'Expense'
                      ? Colors.red
                      : Colors.backgroundColor,
                  width: '50%',
                  // borderWidth: 1,
                  padding: vh(1.2),
                  borderColor: Colors.borderColor,
                }}>
                <CustomText
                  title={'Expense'}
                  style={{
                    color: typeExpense == 'Expense' ? Colors.white : Colors.black,
                  }}
                />
              </TouchableOpacity>
            </View> */}
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              backgroundColor:
              typeExpense == 'Income'
                ? Colors.themeColor
                : Colors.backgroundColor,
              elevation: 3,
              alignSelf: 'center',
              borderRadius: 3,
              height: 40,
              marginTop: vh(2),
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 3,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                typeExpense == 'Income' ? Colors.themeColor : Colors.white,
              }}
              onPress={() => setTypeExpense('Income')}>
              <CustomText
                title={'Income'}
                isBold
                style={{
                  color:
                    typeExpense == 'Income' ? Colors.white : Colors.textColor,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 3,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  typeExpense == 'Expense' ? Colors.red : Colors.white,
              }}
              onPress={() => setTypeExpense('Expense')}>
              <CustomText
                title={'Expense'}
                isBold
                style={{
                  color:
                    typeExpense == 'Expense' ? Colors.white : Colors.textColor,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={{
                marginTop: vh(2),
                width: '95%',
                alignSelf: 'center',
                marginBottom: vh(1),
              }}>
              <CustomText title={'Choose category'} style={{color: nightMode == true ? Colors.white : Colors.textColor}} />
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
                <CustomText title={selectCat ? selectCat : 'Choose Category'} />
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
                  {categories?.map((item, index) => {
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
                            setIsCatModal(false),
                              setSelectCat(item?.category),
                              setSelectCatImg(item?.img);
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
          {/* start  */}
          <View>
            <View
              style={{
                marginTop: vh(2),
                width: '95%',
                alignSelf: 'center',
                marginBottom: vh(1),
              }}>
              <CustomText title={`Select date`} style={{color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setCalendarVisible(true)}
              style={{
                backgroundColor: Colors.white,
                elevation: 3,
                width: '95%',
                borderRadius: 10,
                alignSelf: 'center',
                paddingHorizontal: vh(1),
                paddingTop: vh(0.1),
                paddingBottom: vh(0.1),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                placeholder="Select date"
                value={calendarDate == '' ? calendarDate : moment(calendarDate).format('DD-MM-YYYY')}
                keyboardType="number-pad"
                placeholderTextColor={Colors.textColor}
                editable={false}
                style={[Textstyles.medium,{color:Colors.textColor, width:'50%'}]}
              />
              <View style={{marginTop: vh(2)}}>
                <Image
                  source={Images.calendar}
                  style={{height: 20, width: 20}}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* end  */}
          <View>
            <View
              style={{
                marginTop: vh(2),
                width: '95%',
                alignSelf: 'center',
                marginBottom: vh(1),
              }}>
              <CustomText
                title={typeExpense ? `${typeExpense}` : `Enter amount`}
                style={{color: nightMode == true ? Colors.white : Colors.textColor}}
              />
            </View>
            <View
              style={{
                backgroundColor: Colors.white,
                elevation: 3,
                width: '95%',
                borderRadius: 10,
                alignSelf: 'center',
                paddingHorizontal: vh(1),
                paddingTop: vh(0.1),
                paddingBottom: vh(0.1),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextInput
                placeholder="Enter amount"
                value={amount}
                onChangeText={amt => setAmount(amt)}
                keyboardType="number-pad"
                placeholderTextColor={Colors.textColor}
                style={[Textstyles.medium,{width: '90%'}]}
              />
              <View style={{marginTop: vh(2)}}>
                <Image
                  source={Images.totalMoney}
                  style={{height: 20, width: 20}}
                />
              </View>
            </View>
          </View>
          {/* pending work  */}
          <View>
            <View
              style={{
                marginTop: vh(2),
                width: '95%',
                alignSelf: 'center',
                marginBottom: vh(1),
              }}>
              <CustomText title={'Account Type'} style={{color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View
              style={{
                width: '95%',
                flexDirection: 'row',
                backgroundColor: Colors.white,
                elevation: 3,
                alignSelf: 'center',
                borderRadius: 3,
                height: 40,
                // paddingHorizontal:vh(1),
                // paddingTop:vh(1.5),
                // paddingBottom:vh(1.5),
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 3,
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    accountType == 'Debit' ? Colors.themeColor : Colors.white,
                }}
                onPress={() => setAccountType('Debit')}>
                <CustomText
                  title={'Debit Card'}
                  isBold
                  style={{
                    color:
                      accountType == 'Debit' ? Colors.white : Colors.textColor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 3,
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    accountType == 'Credit' ? Colors.themeColor : Colors.white,
                }}
                onPress={() => setAccountType('Credit')}>
                <CustomText
                  title={'Credit Card'}
                  isBold
                  style={{
                    color:
                      accountType == 'Credit' ? Colors.white : Colors.textColor,
                  }}
                />
              </TouchableOpacity>
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
              <CustomText title={'Choose Account'} style={{color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            {/* {props?.accountData == '' && props?.creditCard == '' ? (
                <TouchableOpacity onPress={()=>checkPremium()} style={{marginLeft:vw(2.5)}}>
                  <CustomText title={'Add new account'} isBold style={{color:Colors.themeColor}} />
                </TouchableOpacity>
              ):( */}
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
                onPress={() => setIsbankModal(!isBankModal)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: isCatModal ? 1 : 0,
                  borderColor: Colors.borderColor,
                  paddingBottom: vh(1),
                }}>
                <CustomText title={selectAcc ? selectAcc : 'Choose Account'} />
                <Image
                  source={Images.back_black}
                  style={{
                    height: 20,
                    width: 20,
                    transform: [{rotate: isBankModal ? '90deg' : '270deg'}],
                  }}
                />
              </TouchableOpacity>
              {isBankModal && (
                <ScrollView>
                  {accountType == 'Debit' ? (
                    <>
                      {props?.accountData?.map((item, index) => {
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
                                setIsbankModal(false),
                                  setSelectAcc(item?.title);
                              }}>
                              <CustomText title={item?.title} />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {props?.creditCard?.map((item, index) => {
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
                                setIsbankModal(false),
                                  setSelectAcc(item?.title);
                              }}>
                              <CustomText title={item?.title} />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </>
                  )}
                </ScrollView>
              )}
            </View>
            {/* )} */}
          </View>

          <View>
            <View
              style={{
                marginTop: vh(2),
                width: '95%',
                alignSelf: 'center',
                marginBottom: vh(1),
              }}>
              <CustomText title={'Enter Description'} style={{color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View
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
                placeholder="Enter Description..."
                value={desc}
                onChangeText={txt => setDesc(txt)}
                multiline
                numberOfLines={5}
                style={{textAlignVertical: 'top'}}
                placeholderTextColor={Colors.textColor}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: vh(4),
            marginBottom: vh(2),
          }}>
          <CustomButton
            onPress={() => navigation.goBack()}
            btnStyle={{backgroundColor: Colors.transparent}}
            title={'Cancel'}
            txtStyle={{ color: nightMode == true ? Colors.white : Colors.textColor}}
          />
          <CustomButton
            onPress={() => save_expense()}
            title={'Save Expense'}
            btnStyle={{
              backgroundColor:
                typeExpense == 'Income' ? Colors.themeColor : Colors.red,
              borderRadius: 10,
              elevation: 3,
            }}
            txtStyle={{color: Colors.white}}
          />
        </View>
      </ScrollView>
      {calendarVisible && (
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
  expense: state.expenseData,
  accountData: state.account,
  premiumData: state.premium,
  creditCard: state.credit,
  themeMode: state.theme
});

const mapDispatchToProps = dispatch => {
  return {
    add_expense: data => {
      dispatch(add_expense(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
