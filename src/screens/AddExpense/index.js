import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../components/CustomText';
import Colors from '../../utils/color';
import {heightPercentageToDP as vh} from 'react-native-responsive-screen';
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

const AddExpense = props => {
  const navigation = useNavigation();
  const [typeExpense, setTypeExpense] = useState('Income');
  const [isCatModal, setIsCatModal] = useState(false);
  const [selectCat, setSelectCat] = useState('');
  const [amount, setAmount] = useState(0); //coming from modal
  const [desc, setDesc] = useState(''); //coming from modal
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarDate, setCalendarDate] = useState('');

  const onStartChange = async (event, selectedDate) => {
    const currentDate = selectedDate || calendarDate;
    const fullDate = await `${moment(currentDate).year()}-${
      moment(currentDate).month() + 1
    }-${moment(currentDate).date()}`;
    setCalendarDate(fullDate);
    setCalendarVisible(false);
  };

  const save_expense = () => {
    setIsLoading(true);
    if (selectCat !== '') {
      if (typeExpense == 'Income') {
        let obj = {
          id: Math.random().toString(16).slice(2),
          expenseType: typeExpense,
          category: selectCat,
          incomeAmount: parseInt(amount),
          expenseAmount: 0,
          description: desc,
          expenseDate: calendarDate
            ? calendarDate
            : `${moment().year()}-${moment().month() + 1}-${moment().date()}`,
        };
        setTimeout(() => {
          setIsLoading(false);
          props?.add_expense(obj);
          Snack('Income added successfully');
          navigation.goBack();
        }, 1500);
      } else if (typeExpense == 'Expense') {
        let obj = {
          id: Math.random().toString(16).slice(2),
          expenseType: typeExpense,
          category: selectCat,
          incomeAmount: 0,
          expenseAmount: parseInt(amount),
          description: desc,
          expenseDate: calendarDate
            ? calendarDate
            : `${moment().year()}-${moment().month() + 1}-${moment().date()}`,
        };

        setTimeout(() => {
          setIsLoading(false);
          props?.add_expense(obj);
          Snack('Expense added successfully');
          navigation.goBack();
        }, 1500);
      }
    } else {
      Snack('Please choose category');
      setIsLoading(false);
    }
  };

  const getCategory = () => {
    let data = category?.filter(item => {
      return item.type == typeExpense;
    });
    setCategories(data);
  };

  useEffect(() => {
    getCategory();
  }, [typeExpense]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: Colors.white,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 6,
        elevation: 3,
      }}>
      {isLoading ? (
        <View style={{marginTop: vh(35)}}>
          <CustomLoader />
        </View>
      ) : (
        <>
          <View>
            {/* header  */}
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity
                onPress={() => setTypeExpense('Income')}
                style={{
                  alignItems: 'center',
                  backgroundColor:
                    typeExpense == 'Income'
                      ? Colors.green
                      : Colors.backgroundColor,
                  width: '50%',
                  borderWidth: 1,
                  padding: vh(1.2),
                  borderColor: Colors.borderColor,
                }}>
                <CustomText title={'Income'} />
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
                  borderWidth: 1,
                  padding: vh(1.2),
                  borderColor: Colors.borderColor,
                }}>
                <CustomText title={'Expense'} />
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
                <CustomText title={'Choose category'} />
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
                  <CustomText
                    title={selectCat ? selectCat : 'Choose Category'}
                  />
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
                                setSelectCat(item?.category);
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
                <CustomText title={`Select date`} />
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
                }}>
                <TextInput
                  placeholder="Select date"
                  value={calendarDate}
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.textColor}
                  editable={false}
                />
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
                  title={
                    typeExpense ? `Enter ${typeExpense} amount` : `Enter amount`
                  }
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
                }}>
                <TextInput
                  placeholder="Enter amount"
                  value={amount}
                  onChangeText={amt => setAmount(amt)}
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.textColor}
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
                <CustomText title={'Enter Description'} />
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
            }}>
            <CustomButton
              onPress={() => navigation.goBack()}
              btnStyle={{backgroundColor: Colors.transparent}}
              title={'Cancel'}
            />
            <CustomButton
              onPress={() => save_expense()}
              title={'Save'}
              btnStyle={{
                backgroundColor: Colors.themeColor,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 10,
                elevation: 3,
              }}
              txtStyle={{color: Colors.white}}
            />
          </View>
        </>
      )}
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
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  expense: state.expenseData,
});

const mapDispatchToProps = dispatch => {
  return {
    add_expense: data => {
      dispatch(add_expense(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
