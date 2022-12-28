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
import CustomInput from '../../../components/CustomComponent/CustomInput'

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
    const [error, setError] = useState('')

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
        if(userName != ''){
          if(openingAmt != 0){
            if(name != ''){
              if(cardNo != ''){
                if(expiry != ''){
                  if(cvv != ''){
                    if(payableTime != ''){
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
                    setError(false)
                    props?.update_credit(obj)
                    navigation.replace('Drawer', {screen:'CreditCard'})
                    Notify('success', "Successfully", "Your card detail updated successfully")
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
          }else{
            setError(true)
          }
        }else{
          setError(true)
        }
    }
    const addNewCard = () => {
      var date = new Date(); // Now
      date.setDate(date.getDate() + parseInt(payableTime)); // Set now + 30 days as the new date
      if(userName != ''){
        if(openingAmt != 0){
          if(name != ''){
            if(cardNo != ''){
              if(expiry != ''){
                if(cvv != ''){
                  if(payableTime != ''){
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
                  setError(false)
                  props?.save_credit(body)
                  navigation.replace('Drawer',{screen:'CreditCard'})
                  Notify('success', "Successfully", "Your card detail saved successfully")
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
        }else{
          setError(true)
        }
      }else{
        setError(true)
      }
        
    }
  return (
    <View style={{flex:1, backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor}}>
      <View style={{flexDirection:'row', marginTop:vh(1), marginLeft:vw(3)}}>
        
        <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
            <CustomText title={'Add Credit Card'} isBold style={{fontSize:18, color:nightMode == true ? Colors.white : Colors.textColor}} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:vh(3)}}>
      <View style={{width:'90%', alignSelf:'center'}}>
            <View>
                <CustomText title={'Credit Card Holder Name'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
              <CustomInput
                value={userName}
                onChangeText={txt => setUserName(txt)}
                placeholder={'Enter credit card holder name'}
                error={error == '' ? null : error}
              />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Credit Card Number'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
              <CustomInput
                value={cardNo}
                onChangeText={txt => setCardNo(txt)}
                placeholder={'Enter card number'}
                error={error == '' ? null : error}
                maxLength={16}
                keyboardType={'number-pad'}
              />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Expiry Date'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
            <CustomInput
              value={expiry}
              onChangeText={txt => setExpiry(txt)}
              placeholder={'Enter expiry date (Enter without special characters)'}
              error={error == '' ? null : error}
              maxLength={4}
              keyboardType={'number-pad'}
            />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'CVV'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
            <CustomInput
              value={cvv}
              onChangeText={txt => setCvv(txt)}
              placeholder={'Enter cvv number'}
              error={error == '' ? null : error}
              maxLength={3}
              keyboardType={'number-pad'}
            />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Bank Name'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
            <CustomInput
              value={name}
              onChangeText={txt => setName(txt)}
              placeholder={'Enter bank name'}
              error={error == '' ? null : error}
            />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Credit Limit'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
            <CustomInput
              value={openingAmt}
              onChangeText={txt => setOpeningAmt(txt)}
              placeholder={'Enter credit limit'}
              error={error == '' ? null : error}
              keyboardType={'numeric'}
            />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Payable Time'} style={{fontSize:12, color: nightMode == true ? Colors.white : Colors.textColor}} isBold />
            </View>
            <View style={{marginTop:vh(0.6)}}>
            <CustomInput
              value={payableTime}
              onChangeText={txt => setPayableTime(txt)}
              placeholder={'Enter payable time (in days)'}
              error={error == '' ? null : error}
              keyboardType={'numeric'}
            />
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
            onPress={() => {
              navigation.goBack()
              setError(false)
            }}
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