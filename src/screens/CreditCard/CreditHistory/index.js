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

const CreditHistory = (props) => {
    let data = props?.route?.params?.data
    const navigation = useNavigation()
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);
    const [expenseData, setExpenseData] = useState('')

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
      const renderExpense =({item,index}) => {
        return(
          <LinearGradient colors={['#E7F5FF', '#BDDDFF']} style={{ padding:vh(1), elevation:2, marginBottom:vh(1.5), borderRadius:15, width:'100%'}}>
          <View style={{flexDirection:'row'}}>
              <View style={{width:45, height:45, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                  <Image source={Images.expense} style={{height:'100%', width:'100%'}} />
              </View>
              <View style={{width:'50%', marginLeft:vh(3)}}>
                  <CustomText title={item?.category} isBold />
                  <CustomText title={item?.description?.length > 60 ? `${(item?.description).substring(0,60)}...` : item?.description} style={{fontSize:12}} />
              </View>
              <View style={{width:'40%', justifyContent:'center', alignItems:'center'}}>
                  <View>
                      {item?.expenseType == 'Expense' ? (
                          <Image source={Images.decrease} style={{height:20,width:20}} />
                      ):(
                          <Image source={Images.increase} style={{height:20,width:20}} />
                      )}
                  </View>
                  <View>
                      <CustomText title={item?.incomeAmount == 0 ? `${'\u20B9'}${(item?.expenseAmount).toFixed(2)}` : `${'\u20B9'}${(item?.incomeAmount).toFixed(2)}`} />
                  </View>
    
              </View>
          </View>
          <View style={{marginTop:vh(1), alignItems:'flex-end'}}>
              <CustomText title={`${item?.expenseDate}`} style={{fontSize:11}} />
          </View>
          </LinearGradient>
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
        <ImageBackground source={Images.back_1} style={{flex:1}}>
        <TouchableOpacity onPress={goBack} style={{height:25, width:25, marginTop:vh(2), marginLeft:vw(2)}}>
          <Image source={Images.back_3d} style={{height:'100%', width:'100%'}} />
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
                  isBold
                  style={{color: Colors.white}}
                />
              </View>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(3), marginLeft:vw(20)}}>
                <CustomText title={data?.cardNum == undefined ? '' : `${data?.cardNum?.substring(0,4)} ${data?.cardNum?.substring(4,8)} ${data?.cardNum?.substring(8,12)} ${data?.cardNum?.substring(12,16)}`} isBold style={{fontSize:22, color:Colors.white}} />
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1), marginLeft:vw(27)}}>
                  <CustomText title={data?.expiryDate == undefined ? '' : `Valid Upto : ${data?.expiryDate?.substring(0,2)}/${data?.expiryDate?.substring(2,4)}`}  isBold style={{fontSize:13, color:Colors.white}}  />
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1), marginLeft:vw(16)}}>
                <CustomText title={data?.cvv == undefined ? '' : `CVV : ${data?.cvv}`}  isBold style={{fontSize:13, color:Colors.white}}  />
                </View>
              </View>
              <View style={{flexDirection:'row', width:'100%', marginTop:vh(2)}}>
                <View style={{flexDirection:'row', width:'37%', justifyContent:'center', alignItems:'center'}}>
                  <Image source={Images.increase} style={{width:40, height:40}} />
                  <CustomText title={`${'\u20B9'}${income}`} isBold style={{fontSize:14, color:Colors.white, marginLeft:vw(2)}} />
                </View>
                <View style={{flexDirection:'row', width:'37%', justifyContent:'center', alignItems:'center'}}>
                  <Image source={Images.decrease} style={{width:40, height:40}} />
                  <CustomText title={`${'\u20B9'}${expense}`} isBold style={{fontSize:14, color:Colors.white, marginLeft:vw(2)}} />
                </View>
              </View>
          </ImageBackground>
        </View>
        <View style={{marginTop:vh(2), width:'90%', alignSelf:'center'}}>
          <View>
            <CustomText title={'Transaction History'} isBold />
          </View>
          <View style={{marginTop:vh(1)}}>
            <FlatList style={{paddingTop:vh(1), marginBottom:vh(37.3)}} data={expenseData} renderItem={renderExpense} ListEmptyComponent={renderEmpty} showsVerticalScrollIndicator={false} />
          </View>
        </View>
      </ImageBackground>
    )
}

const mapStateToProps = state => ({
    expense: state.expenseData,
    total: state.totalAmt,
    creditCard: state.credit
  })

export default connect(mapStateToProps, null)(CreditHistory)

const styles = StyleSheet.create({})