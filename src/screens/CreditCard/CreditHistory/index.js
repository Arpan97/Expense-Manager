import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Images from '../../../utils/images'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import CustomText from '../../../components/CustomText'
import Colors from '../../../utils/color'
// import { total_income } from '../../redux/Action/Action'
import Notify from '../../../utils/Dialog'
import ALertBox from '../../../utils/AlertBox'
import LinearGradient from 'react-native-linear-gradient'
import { useMemo } from 'react'
import moment from 'moment'
import { delete_expense } from '../../../redux/Action/Action'

const CreditHistory = (props) => {
    let data = props?.route?.params?.data
    const navigation = useNavigation()
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);
    const [expenseData, setExpenseData] = useState('')
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

    const goBack = () => {
        navigation.goBack()
      }

      const checkExpenseType = () => {
        let allData = props?.expense?.filter((item,index)=>{
          return item?.account == data?.title
        })
        let x = allData?.sort(function (a, b){
          return new Date(b.expenseDate) - new Date(a.expenseDate)
        })
        setExpenseData(x)
        var total = 0,
          income = 0,
          expense = 0;
          allData?.map(item => {
          income = income + item?.incomeAmount;
          expense = expense + item?.expenseAmount;
          total = (data?.openingAmt + income) - expense;
        });
        setIncome(income.toFixed(2));
        setExpense(expense.toFixed(2));
        setTotal(total.toFixed(2));
      }

      useEffect(() => {
        checkExpenseType()
      }, [props?.expense]);
    
      useEffect(()=>{
        if(total < 0){
          Notify('warning','Warning',"Your current balance is in negative")
        }
      },[total])
    
      const checkBal = () => {
        ALertBox('success', 'Account Information',
        `
        Opening balance - ${'\u20B9'}${data?.openingAmt}
        Total Income - ${'\u20B9'}${income}
        Total Expense - ${'\u20B9'}${expense}
        Amount Left - ${'\u20B9'}${total}
        `)
      }

      const delete_expense = (id) => {
        props?.delete_expense(id)
    }
      const renderExpense =({item,index}) => {
        return(
          <View style={{backgroundColor:Colors.white, padding:vh(0.6), elevation:3, marginBottom:vh(1), marginTop:vh(0.6), borderRadius:15, width:'90%', alignSelf:'center'}}>
          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', borderBottomWidth:0.6, borderColor:'lightgrey', borderStyle:'dashed', paddingBottom:vh(1), marginBottom:vh(1)}}>
              <View style={{width:'80%', flexDirection:'row', left:vw(2)}} >
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Image source={Images.calendar} style={{height:30, width:30}} />
                </View>
                <View>
                  <CustomText title={moment(item?.expenseDate).format('DD')} isBold style={{fontSize:28}} />
                </View>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                  <CustomText title={`${moment(item?.expenseDate).format('MMM')}`} isBold style={{fontSize:10}} />
                  <CustomText title={`${moment(item?.expenseDate).format('YYYY')}`} isBold style={{fontSize:10}} />
                </View>
                
              </View>
              <View style={{flexDirection:'row',width:'20%', justifyContent:'center', alignItems:'center'}}>
                
                <TouchableOpacity onPress={()=>delete_expense(item?.id)} style={{left:vh(1)}}>
                    <Image source={Images.delete} style={{height:20,width:20}} />
                </TouchableOpacity>
              </View>
          </View>
          <View style={{flexDirection:'row', width:'100%', borderRadius:15, justifyContent:'space-between', left:vw(2)}}>
            <View style={{width:'80%'}} >
              <CustomText title={`${item?.category}`} style={{fontSize:14}} />
              <CustomText title={item?.description} style={{fontSize:12}} />
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:vh(1), marginBottom:vh(1)}}>
            <View style={{width:'30%', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <View>
                  <Image source={Images.increase} style={{height:20,width:20}} />
              </View>
              <View>
                  <CustomText title={`${'\u20B9'}${(item?.incomeAmount).toFixed(2)}`} />
              </View>
            </View>
            <View style={{width:'30%', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <View>
                  <Image source={Images.decrease} style={{height:20,width:20}} />
              </View>
              <View>
                  <CustomText title={`${'\u20B9'}${(item?.expenseAmount).toFixed(2)}`} />
              </View>
            </View>
          </View>
  </View>
      )
      }
      const renderEmpty = () => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vh(10),
            }}>
            <Image
              source={{
                uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/no-results-found-5732789-4812665.png',
              }}
              style={{height: 200, width: 200}}
            />
          </View>
        );
      }
    return(
        <View style={{flex:1, backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor}}>
        <TouchableOpacity onPress={goBack} style={{height:25, width:25, marginTop:vh(2), marginLeft:vw(2)}}>
          <Image source={nightMode == true ? Images.back_white : Images.back_3d} style={{height:'100%', width:'100%'}} />
        </TouchableOpacity>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(1.5), marginBottom:vh(1), borderRadius:10, overflow:'hidden'}}>
          <ImageBackground source={data?.cardImage} style={{height:200, width:'100%'}}>
              <TouchableOpacity
                onPress={()=>checkBal()}
                style={{
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                }}>
                <Image
                  source={Images.show}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1)}}>
                <CustomText
                  title={(data?.title).toUpperCase()}
                  isCardBold
                  style={{color: Colors.white, fontSize:20}}
                />
              </View>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(5), marginLeft:vw(12)}}>
                <CustomText title={data?.cardNum == undefined ? '' : `${data?.cardNum?.substring(0,4)} ${data?.cardNum?.substring(4,8)} ${data?.cardNum?.substring(8,12)} ${data?.cardNum?.substring(12,16)}`} isCardBold style={{fontSize:24, color:Colors.white}} />
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(0.5), marginLeft:vw(25)}}>
                  <CustomText title={data?.expiryDate == undefined ? '' : `Valid Upto : ${data?.expiryDate?.substring(0,2)}/${data?.expiryDate?.substring(2,4)}`} isCardBold style={{fontSize:16, color:Colors.white}}  />
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1), marginLeft:vw(9)}}>
                <CustomText title={data?.cvv == undefined ? '' : `CVV : ${data?.cvv}`}  isCardBold style={{fontSize:16, color:Colors.white}}  />
                </View>
              </View>
              <View style={{flexDirection:'row', width:'100%', marginTop:vh(2)}}>
                <View style={{flexDirection:'row', width:'37%', justifyContent:'center', alignItems:'center'}}>
                  <Image source={Images.increase} style={{width:40, height:40}} />
                  <CustomText title={`${'\u20B9'}${income}`} isCardBold style={{fontSize:16, color:Colors.white, marginLeft:vw(2), top:vh(0.7)}} />
                </View>
                <View style={{flexDirection:'row', width:'37%', justifyContent:'center', alignItems:'center'}}>
                  <Image source={Images.decrease} style={{width:40, height:40}} />
                  <CustomText title={`${'\u20B9'}${expense}`} isCardBold style={{fontSize:16, color:Colors.white, marginLeft:vw(2), top:vh(0.7)}} />
                </View>
              </View>
          </ImageBackground>
        </View>
        <View style={{marginTop:vh(2), width:'90%', alignSelf:'center'}}>
          <View>
            <CustomText title={'Transaction History'} isBold style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} />
          </View>
          <View style={{marginTop:vh(1)}}>
            <FlatList style={{paddingTop:vh(1), marginBottom:vh(37.3)}} data={expenseData} renderItem={renderExpense} ListEmptyComponent={renderEmpty} showsVerticalScrollIndicator={false} />
          </View>
        </View>
      </View>
    )
}

const mapStateToProps = state => ({
    expense: state.expenseData,
    total: state.totalAmt,
    creditCard: state.credit,
    themeMode: state.theme
  })

const mapDispatchToProps = dispatch => {
  return{
    delete_expense: id => {
      dispatch(delete_expense(id))
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditHistory)

const styles = StyleSheet.create({})