import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import Images from '../../../utils/images'
import CustomText from '../../../components/CustomText'
import Colors from '../../../utils/color'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../../components/CustomButton'
import { connect } from 'react-redux'
import { credit_card, update_credit } from '../../../redux/Action/Action'
import { Cards } from '../../../utils/constants'
import Notify from '../../../utils/Dialog'
import { useMemo } from 'react'

const AddCreditCard = (props) => {
    // console.log('the props route', props?.route?.params?.data)
    const data = props?.route?.params?.data
    const navigation = useNavigation()
    const [name, setName] = useState(data == undefined ? '' : data?.title)
    const [openingAmt, setOpeningAmt] = useState(data == undefined ? 0 : (data?.openingAmt).toString())
    const [cardNo, setCardNo] = useState(data == undefined ? '' : data?.cardNum)
    const [userName, setUserName] = useState(data == undefined ? '' : data?.accHolder)
    const [expiry, setExpiry] = useState(data == undefined ? '' : data?.expiryDate)
    const [cvv, setCvv] = useState(data == undefined ? '' : data?.cvv)
    const [cardSelect, setCardSelect] = useState('')
    const [payableTime, setPayableTime] = useState(data == undefined ? '' : data?.payableTime)
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

    const updateCreditCard = () => {
        var date = new Date();
        date.setDate(date.getDate() + parseInt(payableTime));
        let obj = {
            id:data?.id,
            title:name,
            openingAmt: parseInt(openingAmt),
            img: Images.bank,
            totalIncome:0,
            totalExpense:0,
            totalBal:0,
            accHolder:userName,
            cardNum:cardNo,
            expiryDate:expiry,
            cvv:cvv,
            cardImage:cardSelect?.card_img,
            payableTime:date
        }
        props?.update_credit(obj)
        navigation.replace('Drawer', {screen:'CreditCard'})
        Notify('success', "Successfully", "Your card detail updated successfully")
    }
    const addNewCard = () => {
      var date = new Date(); // Now
      date.setDate(date.getDate() + parseInt(payableTime)); // Set now + 30 days as the new date
        let body = {
            id: Math.random().toString(16).slice(2),
            title: name,
            openingAmt: parseInt(openingAmt),
            img: Images.bank,
            totalIncome:0,
            totalExpense:0,
            totalBal:0,
            accHolder:userName,
            cardNum:cardNo,
            expiryDate:expiry,
            cvv:cvv,
            cardImage: cardSelect?.card_img,
            payableTime: date
        }
        props?.save_credit(body)
        navigation.replace('Drawer',{screen:'CreditCard'})
        Notify('success', "Successfully", "Your card detail saved successfully")
    }
  return (
    <View style={{flex:1, backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor}}>
      {/* <View style={{flexDirection:'row', marginTop:vh(1), marginLeft:vw(3)}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{height:22, width:22}}>
            <Image source={Images.back_3d} style={{height:'100%', width:'100%'}} />
        </TouchableOpacity>
        <View style={{width:'85%', alignItems:'center', justifyContent:'center'}}>
            <CustomText title={'Add Bank Account'} isBold style={{fontSize:16, color:Colors.themeColor}} />
        </View>
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:vh(3)}}>
      <View style={{width:'90%', alignSelf:'center'}}>
            <View>
                <CustomText title={'Credit Card Holder Name'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
                <TextInput placeholder='Enter credit card holder name...' value={userName} onChangeText={(txt)=>setUserName(txt)} style={{ color:Colors.black, fontSize:12, backgroundColor:nightMode == true ? Colors.white : Colors.white, borderRadius:10}} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Credit Card Number'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
                <TextInput placeholder='Enter credit number...' value={cardNo} onChangeText={(txt)=>setCardNo(txt)} style={{ color:Colors.black, fontSize:12, backgroundColor:nightMode == true ? Colors.white : Colors.white, borderRadius:10}} keyboardType='number-pad' maxLength={16} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Expiry Date'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
                <TextInput placeholder='Enter expiry date (Enter without special characters)' value={expiry} onChangeText={(txt)=>setExpiry(txt)} style={{ color:Colors.black, fontSize:12, backgroundColor:nightMode == true ? Colors.white : Colors.white, borderRadius:10}} maxLength={4} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'CVV'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
                <TextInput placeholder='Enter cvv number...' value={cvv} onChangeText={(txt)=>setCvv(txt)} style={{ color:Colors.black, fontSize:12, backgroundColor:nightMode == true ? Colors.white : Colors.white, borderRadius:10}} keyboardType='number-pad' maxLength={3} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Bank Name'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
                <TextInput placeholder='Enter bank name...' value={name} onChangeText={(txt)=>setName(txt)} style={{ color:Colors.black, fontSize:12, backgroundColor:nightMode == true ? Colors.white : Colors.white, borderRadius:10}} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Available Limit'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
                <TextInput placeholder='Enter available limit...' keyboardType='numeric' value={openingAmt} onChangeText={(txt)=>setOpeningAmt(txt)} style={{ color:Colors.black, fontSize:12, backgroundColor:nightMode == true ? Colors.white : Colors.white, borderRadius:10}} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Payable Time'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
                <TextInput placeholder='Enter payable time (in days)...' keyboardType='numeric' value={payableTime} onChangeText={(txt)=>setPayableTime(txt)} style={{ color:Colors.black, fontSize:12, backgroundColor:nightMode == true ? Colors.white : Colors.white, borderRadius:10}} />
            </View>
        </View>
        <View style={{marginTop:vh(2), width:'90%', alignSelf:'center'}}>
            <View>
                <CustomText title={'Select Card Type'} isBold style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            {/* pending work */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{backgroundColor:nightMode == true ? Colors.white : Colors.backgroundColor, borderRadius:10, marginTop:vh(0.6)}} >
                {Cards?.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} onPress={()=>setCardSelect(item)} style={{borderWidth: item?.id == cardSelect?.id ? 1 : 0, marginLeft:vw(2), borderRadius: item?.id == cardSelect?.id ? 10 : 0, borderColor:item?.id == cardSelect?.id ? Colors.themeColor : null, marginTop:vw(2), paddingBottom:10 }}>
                            <Image source={item?.card_img} style={{height:160, width:250}} />
                        </TouchableOpacity>
                    )
                })}
                
            </ScrollView>
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
           onPress={() => data == undefined ? addNewCard() : updateCreditCard()}
           title={data == undefined ? 'Save Card' : 'Update Card'}
            btnStyle={{
              backgroundColor: Colors.themeColor,
              borderRadius: 10,
              elevation: 3,
            }}
            txtStyle={{color: Colors.white}}
          />
        </View>
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: vh(5),
          }}>
          <CustomButton
            onPress={() => data == undefined ? addNewCard() : updateCreditCard()}
            btnStyle={{
              backgroundColor: Colors.themeColor,
              borderRadius: 10,
              elevation: 3,
              marginBottom: vh(1),
              paddingVertical: vh(1.4),
            }}
            title={data == undefined ? 'Save Card' : 'Update Card'}
            txtStyle={{color: Colors.white}}
          />
        </View>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center', alignItems:'center', marginTop:vh(2), marginBottom:vh(2)}}>
            <CustomText title={'Cancel'} isBold style={{color: nightMode == true ? Colors.white : Colors.textColor}} />
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  )
}

const mapStateToProps = state => ({
    creditData : state.credit,
    themeMode: state.theme
})

const mapDispatchToProps = dispatch => {
    return{
        save_credit: data => {
            dispatch(credit_card(data))
        },
        update_credit: data => {
            dispatch(update_credit(data))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (AddCreditCard)

const styles = StyleSheet.create({})