import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  ImageBackground
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../utils/color';
import CustomText from '../../components/CustomText';
import Images from '../../utils/images';
import {allMonth, allYear} from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';
import CustomLoader from '../../components/CustomLoader';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import Notify from '../../utils/Dialog'
import { useMemo } from 'react';
import {Picker} from '@react-native-picker/picker';

const ShowHistory = props => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [isMonthModal, setIsMonthModal] = useState(false);
  const [isYearModal, setIsYearModal] = useState(false);
  const [selectMonth, setSelectMonth] = useState('');
  const [selectMonthKey, setSelectMonthKey] = useState();
  const [selectYear, setSelectYear] = useState('');
  const [getAllMonths, setGetAllMonths] = useState([]);
  const [getAllYears, setGetAllYears] = useState([]);
  const [monthHistory, setMonthHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const styles = getStyles(isMonthModal);
  const [btnPress, setBtnPress] = useState(false);
  const navigation = useNavigation()
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

  const checkExpense = () => {
    console.log('it work')
    var total = 0,
      income = 0,
      expense = 0;
    let data = props?.expense?.filter((item, index) => {
      let a = item?.expenseDate;
      let b = moment(a).format('M');
      let month = parseInt(b);
      let selectedMonth = selectMonthKey;
      return month == selectedMonth;
    });
    // console.log('the data is',selectMonthKey, 'return','dataaaaaaaaaaa', data )
    data?.map(item => {
      // console.log('the item is ', item?.incomeAmount)
      income = income + item?.incomeAmount;
      expense = expense + item?.expenseAmount;
      total = income + expense;
    });
    // console.log('income', income, expense, total)
    setIncome(income);
    setExpense(expense);
    setTotal(total);
  };


  const getMonth = () => {
    setGetAllMonths(allMonth);
    setTotalIncome(props?.total);
    setGetAllYears(allYear)
  };

  const submitMonth = () => {
    if(selectMonth != ''){
      if(selectYear != ''){
        let data = props?.expense?.filter((item,index)=>{
          let year = moment(item?.expenseDate).format('Y')
          // console.log('the year is', year, typeof(year), selectMonthKey, typeof(selectMonthKey))
          return year == selectYear
        })
        let data2 = data?.filter((i,j)=>{
          let a = moment(i?.expenseDate).format('M')
          let month = parseInt(a)
          let selectedMonth = selectMonthKey
          return month == selectedMonth
        })
        // console.log('the data 2 is ===>', data2)
        setMonthHistory(data2);
        // checkExpense()
      }else{
        Notify('error', "Alert", "Please select year before submit")
      }
    }else{
      Notify('error', "Alert", "Please select month before submit")
    }
    // if(selectYear != '' && selectMonth == ''){
    //   let data = props?.expense?.filter((item,index)=>{
    //     let year = moment(item?.expenseDate).format('Y')
    //     return year == selectYear
    //   })
    //   setMonthHistory(data)
    //   setBtnPress(true)
    // }else if(selectYear == '' && selectMonth != ''){
    //   let data = props?.expense?.filter((item, index) => {
    //     let a = item?.expenseDate;
    //     let b = moment(a).format('M');
    //     let month = parseInt(b);
    //     let selectedMonth = selectMonthKey;
    //     return month == selectedMonth;
    //   });
    //     setMonthHistory(data);
    //     setBtnPress(true);
    // }else if(selectMonth != '' && selectYear != ''){
    //   let data = props?.expense?.filter((i,index)=>{
    //     let year = moment(i?.expenseDate).format('Y')
    //     return year == selectYear
    //   })
    //   let data2 = data?.filter((item,index)=>{
    //       let a = item?.expenseDate;
    //       let b = moment(a).format('M');
    //       let month = parseInt(b);
    //       let selectedMonth = selectMonthKey;
    //       return month == selectedMonth;
    //     })
    //       setMonthHistory(data2);
    //       setBtnPress(true);
    // }
    
    // console.log('the data is ', data)
    // let data = props?.expense?.filter((item, index) => {
    //   let a = item?.expenseDate;
    //   let b = moment(a).format('M');
    //   let month = parseInt(b);
    //   let selectedMonth = selectMonthKey;
    //   return month == selectedMonth;
    // });
    //   setMonthHistory(data);
    //   setBtnPress(true);
  };

  const NumToWords = number => {
    let num = ~~number;
    var a = [
      '',
      'One ',
      'Two ',
      'Three ',
      'Four ',
      'Five ',
      'Six ',
      'Seven ',
      'Eight ',
      'Nine ',
      'Ten ',
      'Eleven ',
      'Twelve ',
      'Thirteen ',
      'Fourteen ',
      'Fifteen ',
      'Sixteen ',
      'Seventeen ',
      'Eighteen ',
      'Nineteen ',
    ];
    var b = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str +=
      n[1] != 0
        ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) +
          'crore ' +
          'only '
        : '';
    str +=
      n[2] != 0
        ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' + 'only '
        : '';
    str +=
      n[3] != 0
        ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) +
          'thousand ' +
          'only '
        : '';
    str +=
      n[4] != 0
        ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) +
          'hundred ' +
          'only '
        : '';
    str +=
      n[5] != 0
        ? (str != '' ? 'and ' : '') +
          (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) +
          'only '
        : '';
    return str;
  };

  useEffect(() => {
    checkExpense();
    getMonth();
  }, [monthHistory]);

  return (
    <View style={{flex:1, backgroundColor: nightMode == true ? Colors.black : Colors.white}}>
      {/* header  */}
      <View style={{flexDirection:'row', width:'90%', alignSelf:'center', marginTop:vh(2)}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:vw(4)}}>
          <Image source={nightMode == true ? Images.menu_white : Images.menu} style={{height:30, width:30}} />
        </TouchableOpacity>
        <View style={{width:'80%', alignItems:'center'}}>
          <CustomText title={'Monthly Report'} isBold style={{fontSize:16, color: nightMode == true ? Colors.white : Colors.textColor}} />
        </View>
      </View>
      {/* header component */}
      <View style={{marginTop:vh(2), flexDirection:'row'}}>
        {/* dropdown & input */}
        <View style={styles.input_container}>
              <View
                style={{
                    width: '95%',
                    alignSelf: 'center',
                    paddingTop: vh(1.2),
                    paddingBottom: vh(1.5),
                    bottom:vh(1)
                }}>
                  <Picker
                    selectedValue={selectMonth}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      {
                        setSelectMonth(itemValue)
                        setSelectMonthKey(itemIndex)
                      }
                    }
                    style={{height:10, bottom:vh(2), right:vw(3), width:180}}
                    >
                      <Picker.Item label='Select Month' value={null} />
                      {getAllMonths?.map((item,index)=>{
                        return(
                        <Picker.Item label={item?.month} value={item?.month} />
                        )
                      })}
                  </Picker>
              </View>
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setIsMonthModal(!isMonthModal)
            }}
            style={styles.input_view}>
            <CustomText title={selectMonth ? selectMonth : 'Choose Month'} />
            <Image source={Images.back_black} style={styles.arrow_input} />
          </TouchableOpacity>
          {isMonthModal && (
            <ScrollView>
              {getAllMonths?.map((item, index) => {
                return (
                  <View style={styles.dropdown_view}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsMonthModal(false),
                          setSelectMonth(item?.month),
                          setSelectMonthKey(item?.key);
                      }}>
                      <CustomText title={item?.month} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          )} */}
        </View>

        <View style={styles.input_container}>
          <View
                style={{
                    width: '95%',
                    alignSelf: 'center',
                    paddingTop: vh(1.2),
                    paddingBottom: vh(1.5),
                    bottom:vh(1)
                }}>
                  <Picker
                    selectedValue={selectYear}
                    mode={'dropdown'}
                    onValueChange={(itemValue, itemIndex) =>
                      {
                        setSelectYear(itemValue)
                        // setSelectMonthKey(itemIndex)
                      }
                    }
                    style={{height:10, bottom:vh(2), right:vw(3), width:180}}
                    >
                      <Picker.Item label='Select Year' value={null} />
                      {getAllYears?.map((item,index)=>{
                        return(
                        <Picker.Item label={item?.year} value={item?.year} />
                        )
                      })}
                  </Picker>
              </View>
          {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setIsYearModal(!isYearModal)
            }}
            style={styles.input_view}>
            <CustomText title={selectYear ? selectYear : 'Choose Year'} />
            <Image source={Images.back_black} style={styles.arrow_input} />
          </TouchableOpacity>
          {isYearModal && (
            <ScrollView>
              {getAllYears?.map((item, index) => {
                return (
                  <View style={styles.dropdown_view}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsYearModal(false),
                          setSelectYear(item?.year)
                      }}>
                      <CustomText title={item?.year} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          )} */}
        </View>
        {/* button  */}
        
      </View>
      <View style={styles.btn_view}>
          <CustomButton
            title={'Submit'}
            onPress={() => submitMonth()}
            btnStyle={styles.btn_style}
            txtStyle={styles.txt_style}
          />
        </View>
      {/* invoice  */}
        <>
          {monthHistory != '' ? (
            <View style={styles.history_container}>
              {/* personal detail */}
              <View>
                <View style={styles.invoice_heading}>
                  <CustomText
                    title={'Invoice'}
                    style={styles.invoice_txt}
                    isBold
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: vh(1),
                    width: '95%',
                    alignSelf: 'center',
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <CustomText title={'Name: '} isBold />
                      <CustomText
                        title={props?.user?.name ? props?.user?.name : '-'}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <CustomText title={'Email: '} isBold />
                      <CustomText
                        title={props?.user?.mail ? props?.user?.mail : '-'}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <CustomText title={'Mobile: '} isBold />
                      <CustomText
                        title={props?.user?.mobile ? props?.user?.mobile : '-'}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <CustomText title={'Report: '} isBold />
                      {/* {console.log('the select month', selectMonth)} */}
                      <CustomText title={`${selectMonth}`} />
                    </View>
                  </View>
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 15,
                      overflow: 'hidden',
                      marginRight: vh(2),
                      // elevation: 3,
                    }}>
                    <Image
                      source={
                        props?.user?.image != ''
                          ? {uri: props?.user?.image}
                          : Images.user
                      }
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                </View>
              </View>
              {/* transactions */}
              <View
                style={{
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText style={{textAlign: 'center'}} title={'Date'} />
                </View>
                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    style={{textAlign: 'center'}}
                    title={'Description'}
                  />
                </View>

                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    style={{textAlign: 'center'}}
                    title={'Category'}
                  />
                </View>

                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText style={{textAlign: 'center'}} title={'Income'} />
                </View>

                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText style={{textAlign: 'center'}} title={'Expense'} />
                </View>
              </View>
              {/* history  */}
              <View>
                {monthHistory?.map((item, index) => {
                  return (
                    <View
                      style={{
                        backgroundColor:
                          item?.expenseType == 'Expense'
                            ? Colors.red + 70
                            : '#FFC0CB30',
                        borderBottomWidth: 0.5,
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          paddingVertical: vh(1),
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomText
                          style={{textAlign: 'center', fontSize: 11}}
                          title={moment(item?.expenseDate).format('DD-MMM-YYYY')}
                        />
                      </View>
                      <View
                        style={{
                          paddingVertical: vh(1),
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomText
                          style={{textAlign: 'center', fontSize: 11}}
                          title={item?.description}
                        />
                      </View>

                      <View
                        style={{
                          paddingVertical: vh(1),
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomText
                          style={{textAlign: 'center', fontSize: 11}}
                          title={item?.category}
                        />
                      </View>

                      <View
                        style={{
                          paddingVertical: vh(1),
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomText
                          style={{textAlign: 'center', fontSize: 11}}
                          title={item?.incomeAmount}
                        />
                      </View>

                      <View
                        style={{
                          paddingVertical: vh(1),
                          width: '20%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomText
                          style={{textAlign: 'center', fontSize: 11}}
                          title={item?.expenseAmount}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
              {/* total  */}
              <View
                style={{
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText style={{textAlign: 'center'}} title={'Total'} />
                </View>
                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText style={{textAlign: 'center'}} title={'-'} />
                </View>

                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText style={{textAlign: 'center'}} title={'-'} />
                </View>

                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    style={{textAlign: 'center'}}
                    title={`${'\u20B9'}${income}`}
                  />
                </View>

                <View
                  style={{
                    paddingVertical: vh(1),
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    style={{textAlign: 'center'}}
                    title={`${'\u20B9'}${expense}`}
                  />
                </View>
              </View>
              {/* total detail */}
              <View>
                <View
                  style={{
                    width: '95%',
                    alignSelf: 'center',
                    marginTop: vh(2),
                    marginBottom: vh(2),
                  }}>
                  {/* <View style={{flexDirection: 'row'}}>
                    <CustomText title={'Total Income: '} isBold />
                    <CustomText title={`${'\u20B9'}${income}`} />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <CustomText title={'Total Income(in words): '} isBold />
                    <CustomText
                      title={income == 0 ? '-' : `Rupees ${NumToWords(income)}`}
                    />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <CustomText title={'Total Expense: '} isBold />
                    <CustomText title={`${'\u20B9'}${expense}`} />
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <CustomText title={'Total Expense(in words): '} isBold />
                    <CustomText
                      title={
                        expense == 0 ? '-' : `Rupees ${NumToWords(expense)}`
                      }
                    />
                  </View> */}
                  {/* <View style={{flexDirection:'row'}}>
                        <CustomText title={'Total Saving: '} isBold />
                        <CustomText title={totalIncome <= 0 ? '-' : `${'\u20B9'}${totalIncome}`} />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <CustomText title={'Total Saving(in words): '} isBold />
                        <CustomText title={totalIncome <= 0 ? '-' : `Rupees ${NumToWords(totalIncome)}`} />
                    </View> */}
                </View>
              </View>
              {/* note */}
              <View style={{marginBottom: vh(1)}}>
                <CustomText
                  title={`*Note: This invoice is generated for ${selectMonth} month base not for year base`}
                  style={{textAlign: 'center', fontSize: 11}}
                />
              </View>
            </View>
          ):(
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/no-results-found-5732789-4812665.png',
                }}
                style={{height: 200, width: 200}}
              />
            </View>
          )}
        </>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
  total: state.totalAmt,
  expense: state.expenseData,
  themeMode: state.theme
});

const getStyles = isMonthModal =>
  StyleSheet.create({
    month_view: {
      width: '95%',
      alignSelf: 'center',
      marginBottom: vh(1),
    },
    input_container: {
      backgroundColor: Colors.white,
      elevation: 3,
      width: '45%',
      borderRadius: 10,
      alignSelf: 'center',
      paddingHorizontal: vh(1),
      paddingTop: vh(1.2),
      paddingBottom: vh(0.5),
      marginLeft:vw(3.2)
    },
    input_view: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: isMonthModal ? 1 : 0,
      borderColor: Colors.borderColor,
      paddingBottom: vh(1),
    },
    arrow_input: {
      height: 20,
      width: 20,
      transform: [{
        rotate: isMonthModal ? '90deg' : '270deg'
      }],
    },
    dropdown_view: {
      backgroundColor: Colors.white,
      borderBottomWidth: 1,
      borderColor: Colors.borderColor,
      padding: vh(1),
    },
    btn_view: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: vh(2),
      marginBottom: vh(1),
    },
    btn_style: {
      backgroundColor: Colors.themeColor,
      borderRadius: 10,
      elevation: 3,
    },
    txt_style: {
      color: Colors.white,
    },
    loader_view: {
      marginTop: vh(30),
    },
    history_container: {
      backgroundColor: Colors.white,
    },
    invoice_heading: {
      marginTop: vh(1),
      marginBottom: vh(1.4),
    },
    invoice_txt: {
      textAlign: 'center',
      fontSize: 16,
    },
  });

export default connect(mapStateToProps, null)(ShowHistory);
