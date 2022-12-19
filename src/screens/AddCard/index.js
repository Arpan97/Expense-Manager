import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Images from '../../utils/images'
import CustomText from '../../components/CustomText'
import Colors from '../../utils/color'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'
import { connect } from 'react-redux'
import { account_data } from '../../redux/Action/Action'

const AddCard = (props) => {
    const navigation = useNavigation()
    const [name, setName] = useState('')
    const [openingAmt, setOpeningAmt] = useState(0)
    const [cardNo, setCardNo] = useState('')
    const [userName, setUserName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')

    const addNewCard = () => {
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
            cvv:cvv
        }

        props?.save_account(body)
        navigation.replace('Drawer',{screen:'Bank'})
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
      <ScrollView style={{marginTop:vh(3)}}>
      <View style={{width:'90%', alignSelf:'center'}}>
            <View>
                <CustomText title={'Card Holder Name'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter card holder name...' value={userName} onChangeText={(txt)=>setUserName(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} />
            </View>
        </View>
        <View style={{width:'90%', alignSelf:'center', marginTop:vh(2)}}>
            <View>
                <CustomText title={'Card Number (optional)'} style={{fontSize:12}} isBold />
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
                <CustomText title={'Opening Balance'} style={{fontSize:12}} isBold />
            </View>
            <View>
                <TextInput placeholder='Enter opening balance...' keyboardType='numeric' value={openingAmt} onChangeText={(txt)=>setOpeningAmt(txt)} style={{borderBottomWidth:0.3, color:Colors.black, fontSize:12}} />
            </View>
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
            title={'Save Account'}
            txtStyle={{color: Colors.white}}
          />
        </View>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center', alignItems:'center', marginTop:vh(2)}}>
            <CustomText title={'Cancel'} isBold />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  )
}

const mapStateToProps = state => ({
    accountData : state.account
})

const mapDispatchToProps = dispatch => {
    return{
        save_account: data => {
            dispatch(account_data(data))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (AddCard)

const styles = StyleSheet.create({})