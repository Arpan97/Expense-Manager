import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Images from '../../../utils/images'
import CustomText from '../../../components/CustomText'
import Colors from '../../../utils/color'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../../components/CustomButton'
import { connect } from 'react-redux'
import { credit_card } from '../../../redux/Action/Action'
import { Cards } from '../../../utils/constants'

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
    }
  return (
    <ImageBackground source={Images.back_1} style={{flex:1}}>
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
                <CustomText title={'Credit Card Holder Name'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter credit card holder name...' value={userName} onChangeText={(txt)=>setUserName(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Credit Card Number (optional)'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter account number...' value={cardNo} onChangeText={(txt)=>setCardNo(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} keyboardType='number-pad' maxLength={16} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Expiry Date (optional)'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter expiry date (Enter without special characters)' value={expiry} onChangeText={(txt)=>setExpiry(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} maxLength={4} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'CVV (optional)'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter cvv number...' value={cvv} onChangeText={(txt)=>setCvv(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} keyboardType='number-pad' maxLength={3} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Bank Name'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter bank name...' value={name} onChangeText={(txt)=>setName(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Available Limit'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter available limit...' keyboardType='numeric' value={openingAmt} onChangeText={(txt)=>setOpeningAmt(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Payable Time'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter payable time (in days)...' keyboardType='numeric' value={payableTime} onChangeText={(txt)=>setPayableTime(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} />
            </View>
        </View>
        <View style={{marginTop:vh(2), width:'90%', alignSelf:'center'}}>
            <View>
                <CustomText title={'Select Card Type'} isBold style={{fontSize:12}} />
            </View>
            {/* pending work */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {Cards?.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} onPress={()=>setCardSelect(item)} style={{borderWidth: item?.id == cardSelect?.id ? 1 : 0, marginLeft:vw(2), borderRadius: item?.id == cardSelect?.id ? 10 : 0, borderColor:item?.id == cardSelect?.id ? Colors.themeColor : null, marginTop:vw(2) }}>
                            <Image source={item?.card_img} style={{height:160, width:250}} />
                        </TouchableOpacity>
                    )
                })}
                
            </ScrollView>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: vh(5),
          }}>
          <CustomButton
            onPress={() => addNewCard()}
            btnStyle={{
              backgroundColor: Colors.themeColor,
              borderRadius: 10,
              elevation: 3,
              marginBottom: vh(1),
              paddingVertical: vh(1.4),
            }}
            title={'Save Card'}
            txtStyle={{color: Colors.white}}
          />
        </View>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center', alignItems:'center', marginTop:vh(2), marginBottom:vh(2)}}>
            <CustomText title={'Cancel'} isBold />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  )
}

const mapStateToProps = state => ({
    creditData : state.credit
})

const mapDispatchToProps = dispatch => {
    return{
        save_credit: data => {
            dispatch(credit_card(data))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (AddCreditCard)

const styles = StyleSheet.create({})