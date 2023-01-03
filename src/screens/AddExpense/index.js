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
import {useMemo} from 'react';
import {Picker} from '@react-native-picker/picker';
import CustomInput from '../../components/CustomComponent/CustomInput';

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
  const [nightMode, setNightMode] = useState(false);

  useMemo(() => {
    if (props?.themeMode == false) {
      setNightMode(false);
    } else if (props?.themeMode == true) {
      setNightMode(true);
    }
  }, [props?.themeMode, nightMode]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (props?.themeMode == false) {
        setNightMode(false);
      } else if (props?.themeMode == true) {
        setNightMode(true);
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
    const dates = await currentDate;
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
          incomeAmount: parseInt(amount),
          expenseAmount: 0,
          description: desc,
          expenseDate: calendarDate,
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
          expenseDate: calendarDate,
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
    <View
      style={{
        flex: 1,
        backgroundColor:
          nightMode == true ? Colors.black : Colors.backgroundColor,
      }}>
      <ScrollView>
        <View>
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
              <CustomText
                title={'Choose category'}
                isBold
                style={{
                  color: nightMode == true ? Colors.white : Colors.textColor,
                  fontSize: 12,
                }}
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
                paddingTop: vh(1.2),
                paddingBottom: vh(0.5),
              }}>
              <Picker
                selectedValue={selectCat}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectCat(itemValue)
                }
                style={{height: 28, bottom: vh(2), right: vw(3)}}>
                <Picker.Item label="Select Category" value={null} />
                {categories?.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item?.category}
                      value={item?.category}
                    />
                  );
                })}
              </Picker>
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
              <CustomText
                title={`Select date`}
                isBold
                style={{
                  color: nightMode == true ? Colors.white : Colors.textColor,
                  fontSize: 12,
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setCalendarVisible(true)}
              style={{
                width: '95%',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <CustomInput
                placeholder={'Select Date'}
                value={
                  calendarDate == ''
                    ? calendarDate
                    : moment(calendarDate).format('DD-MM-YYYY')
                }
                keyboardType={'number-pad'}
                editable={false}
              />
              <View style={{right: vw(13), top: vh(2)}}>
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
                style={{
                  color: nightMode == true ? Colors.white : Colors.textColor,
                }}
              />
            </View>
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <CustomInput
                placeholder={'Enter amount'}
                value={amount}
                onChangeText={amt => setAmount(amt)}
                keyboardType={'number-pad'}
              />
              <View style={{right: vw(13), top: vh(2)}}>
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
              <CustomText
                title={'Account Type'}
                style={{
                  color: nightMode == true ? Colors.white : Colors.textColor,
                }}
              />
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
              <CustomText
                title={'Choose Account'}
                style={{
                  color: nightMode == true ? Colors.white : Colors.textColor,
                }}
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
                paddingTop: vh(1.2),
                paddingBottom: vh(0.5),
              }}>
              {accountType == 'Debit' ? (
                <Picker
                  selectedValue={selectAcc}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectAcc(itemValue)
                  }
                  style={{height: 28, bottom: vh(2), right: vw(3)}}>
                  <Picker.Item label="Select Account" value={null} />
                  {props?.accountData?.map((item, index) => {
                    return (
                      <Picker.Item label={item?.title} value={item?.title} />
                    );
                  })}
                </Picker>
              ) : (
                <Picker
                  selectedValue={selectAcc}
                  mode={'dropdown'}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectAcc(itemValue)
                  }
                  style={{height: 28, bottom: vh(2), right: vw(3)}}>
                  <Picker.Item label="Select Account" value={null} />
                  {props?.creditCard?.map((item, index) => {
                    return (
                      <Picker.Item label={item?.title} value={item?.title} />
                    );
                  })}
                </Picker>
              )}
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
              <CustomText
                title={'Enter Description'}
                style={{
                  color: nightMode == true ? Colors.white : Colors.textColor,
                }}
              />
            </View>
            <View
              style={{
                width: '95%',
                borderRadius: 10,
                alignSelf: 'center',
              }}>
                <CustomInput 
                  placeholder={'Enter Description'}
                  value={desc}
                  onChangeText={(txt) => setDesc(txt)}
                  multiline={true}
                  numberOfLines={5}
                  style={{textAlignVertical:'top'}} />
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
            txtStyle={{
              color: nightMode == true ? Colors.white : Colors.textColor,
            }}
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
  themeMode: state.theme,
});

const mapDispatchToProps = dispatch => {
  return {
    add_expense: data => {
      dispatch(add_expense(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
