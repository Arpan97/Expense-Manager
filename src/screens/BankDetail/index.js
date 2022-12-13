import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Images from '../../utils/images'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import CustomText from '../../components/CustomText'
import Colors from '../../utils/color'
import { total_income } from '../../redux/Action/Action'
import Notify from '../../utils/Dialog'
import ALertBox from '../../utils/AlertBox'

const BankDetail = (props) => {
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
    setExpenseData(allData)
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
    Opening balance - ${data?.openingAmt}
    Total Income - ${income}
    Total Expense - ${expense}
    Amount Left - ${total}
    `)
  }

  const renderExpense =({item,index}) => {
    return(
      <View style={{backgroundColor:Colors.white, padding:vh(1), elevation:2, marginBottom:vh(1.5), borderRadius:15, width:'100%'}}>
      <View style={{flexDirection:'row'}}>
          <View style={{width:40, height:40, borderRadius:25, backgroundColor:Colors.white, elevation:3, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
              <Image source={Images.expense} style={{height:'80%', width:'80%', resizeMode:'contain'}} />
          </View>
          <View style={{width:'40%', marginLeft:vh(3)}}>
              <CustomText title={item?.category} />
              <CustomText title={item?.description} />
          </View>
          <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
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
          <CustomText title={`Created at: ${item?.expenseDate}`} style={{fontSize:11}} />
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
  return (
    <View style={{flex:1}}>
      <TouchableOpacity onPress={goBack} style={{height:25, width:25, marginTop:vh(2), marginLeft:vw(2)}}>
        <Image source={Images.back_3d} style={{height:'100%', width:'100%'}} />
      </TouchableOpacity>
      <View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <CustomText title={(data?.title).toUpperCase()} isBold style={{fontSize:16}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            marginTop: vh(2),
            width: '50%',
            elevation: 3,
            borderWidth: 0.5,
            borderColor: Colors.borderColor,
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent:'center',
            alignItems:'center'
          }}>
        <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: vh(1),
              paddingBottom: vh(1),
            }}>
            
            <View style={{flexDirection:'row'}}>
              <CustomText title={'Balance'} isBold style={{fontSize: 16, marginLeft:vw(5)}} />
              <TouchableOpacity onPress={()=>checkBal()} style={{left:vw(10)}}>
                <Image source={Images.show} style={{height:20, width:20}} />
              </TouchableOpacity>
            </View>
            <Image source={Images.totalMoney} style={{height: 40, width: 40}} />
            <CustomText title={`${'\u20B9'}${total}`} />
        </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            marginTop: vh(2),
            width: '90%',
            elevation: 3,
            borderWidth: 0.5,
            borderColor: Colors.borderColor,
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: vh(1),
              paddingBottom: vh(1),
            }}>
            <CustomText title={'Income'} isBold style={{fontSize: 16}} />
            <Image source={Images.increase} style={{height: 40, width: 40}} />
            <CustomText title={`${'\u20B9'}${income}`} />
          </View>
          <View
            style={{borderLeftWidth: 1, borderLeftColor: Colors.black + 18}}
          />
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: vh(1),
              paddingBottom: vh(1),
            }}>
            <CustomText title={'Expenses'} isBold style={{fontSize: 16}} />
            <Image
              source={Images.decrease}
              style={{
                height: 40,
                width: 40,
                transform: [{rotate: '180deg'}],
              }}
            />
            <CustomText title={`${'\u20B9'}${expense}`} />
          </View>
        </View>
      </View>
      <View style={{marginTop:vh(2), width:'90%', alignSelf:'center'}}>
        <View>
          <CustomText title={'Transaction History'} isBold />
        </View>
        <View style={{marginTop:vh(1)}}>
          <FlatList style={{paddingTop:vh(1), marginBottom:vh(41)}} data={expenseData} renderItem={renderExpense} ListEmptyComponent={renderEmpty} showsVerticalScrollIndicator={false} />
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  expense: state.expenseData,
  total: state.totalAmt,
})

const mapDispatchToProps = dispatch => {
  return {
    total_amount: data => {
      dispatch(total_income(data));
    },
  };
};


export default connect (mapStateToProps, mapDispatchToProps) (BankDetail)

const styles = StyleSheet.create({})