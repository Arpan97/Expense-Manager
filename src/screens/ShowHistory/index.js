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
import {allMonth} from '../../utils/constants';
import CustomButton from '../../components/CustomButton';
import moment from 'moment';
import CustomLoader from '../../components/CustomLoader';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';

const ShowHistory = props => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMonthModal, setIsMonthModal] = useState(false);
  const [selectMonth, setSelectMonth] = useState('');
  const [selectMonthKey, setSelectMonthKey] = useState();
  const [getAllMonths, setGetAllMonths] = useState([]);
  const [monthHistory, setMonthHistory] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const styles = getStyles(isMonthModal);
  const [btnPress, setBtnPress] = useState(false);
  const navigation = useNavigation()

  const checkExpense = () => {
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
    data?.map(item => {
      income = income + item?.incomeAmount;
      expense = expense + item?.expenseAmount;
      total = income + expense;
    });
    setIncome(income.toFixed(2));
    setExpense(expense.toFixed(2));
    setTotal(total.toFixed(2));
  };

  const getMonth = () => {
    setGetAllMonths(allMonth);
    setTotalIncome(props?.total);
  };

  const submitMonth = () => {
    let data = props?.expense?.filter((item, index) => {
      let a = item?.expenseDate;
      let b = moment(a).format('M');
      let month = parseInt(b);
      let selectedMonth = selectMonthKey;
      return month == selectedMonth;
    });
      setMonthHistory(data);
      setBtnPress(true);
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
  }, [btnPress]);

  return (
    <ImageBackground source={Images.back_1} style={{flex:1}}>
      {/* header  */}
      <View style={{flexDirection:'row', width:'90%', alignSelf:'center', marginTop:vh(2)}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:vw(4)}}>
          <Image source={Images.menu} style={{height:30, width:30}} />
        </TouchableOpacity>
        <View style={{width:'80%', alignItems:'center'}}>
          <CustomText title={'Monthly Report'} isBold style={{fontSize:16}} />
        </View>
      </View>
      {/* header component */}
      <View style={{marginTop:vh(2)}}>
        {/* dropdown & input */}
        <View style={styles.input_container}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setIsMonthModal(!isMonthModal), setBtnPress(false);
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
          )}
        </View>
        {/* button  */}
        <View style={styles.btn_view}>
          <CustomButton
            title={'Submit'}
            onPress={() => submitMonth()}
            btnStyle={styles.btn_style}
            txtStyle={styles.txt_style}
          />
        </View>
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
                      <CustomText title={'Month: '} isBold />
                      <CustomText title={selectMonth} />
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
                          title={item?.expenseDate}
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
                  <View style={{flexDirection: 'row'}}>
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
                  </View>
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
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
  total: state.totalAmt,
  expense: state.expenseData,
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
      width: '95%',
      borderRadius: 10,
      alignSelf: 'center',
      paddingHorizontal: vh(1),
      paddingTop: vh(1.2),
      paddingBottom: vh(0.5),
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
