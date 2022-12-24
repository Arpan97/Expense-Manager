import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../utils/color'
import CustomText from '../../../components/CustomText'
import Images from '../../../utils/images'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import CustomCreditFav from '../../../components/Fav/CreditCustomFav'
import { connect } from 'react-redux'
import { delete_credit } from '../../../redux/Action/Action'

const CreditCard = (props) => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [accBackup, setAccBackup] = useState('')
    const [bankAcc, setBankAcc] = useState('')
    const searchFunctionality = async txt => {
        setSearch(txt);
        let masterDataSource = props?.creditCard;
        if (txt) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.title
              ? item.title.toUpperCase()
              : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setAccBackup(newData);
        } else {
          setAccBackup(masterDataSource);
        }
      };
      const delete_account = id => {
        props?.delete_credit(id)
      }
      const renderAcc = ({item,index}) => {
        let allData = props?.expense?.filter((i, j) => {
          return i?.account == item?.title;
        });
        var total = 0,
          income = 0,
          expense = 0;
        allData?.map(x => {
          income = income + x?.incomeAmount;
          expense = expense + x?.expenseAmount;
          total = item?.openingAmt + income - expense;
        });
        return (
          <TouchableOpacity onPress={() => navigation.navigate('Credithistory', {data: item})} style={{width:'90%', alignSelf:'center', marginTop:vh(1.5), marginBottom:vh(1), borderRadius:10, overflow:'hidden'}}>
            <ImageBackground source={item?.cardImage} style={{height:200, width:'100%'}} >
            <TouchableOpacity
                onPress={() => navigation.navigate('AddCreditCard',{data:item})}
                style={{
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  right: 40,
                  top: 10,
                }}>
                <Image
                  source={Images.edit}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => delete_account(item?.id)}
                style={{
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                }}>
                <Image
                  source={Images.delete}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
              <View style={{justifyContent:'center', marginTop:vh(3), width:'88%', alignSelf:'center'}}>
                <CustomText
                  title={(item?.title).toUpperCase()}
                  isBold
                  style={{color: Colors.white}}
                />
              </View>
              <View style={{justifyContent:'center', marginTop:vh(7), width:'88%', alignSelf:'center'}}>
                <CustomText title={item?.cardNum == undefined ? '' : `${item?.cardNum?.substring(0,4)}  ${item?.cardNum?.substring(4,8)}  ${item?.cardNum?.substring(8,12)}  ${item?.cardNum?.substring(12,16)}`} isBold style={{fontSize:22, color:Colors.white}} />
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', width:'40%', alignSelf:'center', marginLeft:vw(5), bottom:vh(1)}}>
                  <CustomText title={item?.cvv == undefined ? '' : `CVV : ${item?.cvv}`}  isBold style={{fontSize:12, color:Colors.white}}  />
                </View>
                <View style={{justifyContent:'center', alignItems:'center',  marginLeft:vw(27)}}>
                  <CustomText title={'Valid'}  isBold style={{fontSize:10, color:Colors.white}} />
                  <CustomText title={'Upto'}   isBold style={{fontSize:10, color:Colors.white}}/>
                </View>
                <View style={{marginTop:vh(0.5), marginLeft:vw(2)}}>
                  <CustomText title={item?.expiryDate == undefined ? '' : `${item?.expiryDate?.substring(0,2)}/${item?.expiryDate?.substring(2,4)}`}  isBold style={{fontSize:16, color:Colors.white}}  />
                </View>
              </View>
              <View style={{justifyContent:'center', bottom:vh(1), width:'89%', alignSelf:'center'}}>
              <CustomText
                title={`Amount Available : ${'\u20B9'} ${ allData == '' ? item?.openingAmt : total}`}
                isBold
                style={{fontSize: 14, color: Colors.white}}
              />
            </View>
              <View style={{justifyContent:'center', width:'89%', alignSelf:'center', bottom:vh(1)}}>
                <CustomText title={item?.accHolder == undefined ? '' : `${item?.accHolder}`} isBold style={{fontSize:18, color:Colors.white}} />
              </View>
              
            </ImageBackground>
          </TouchableOpacity>
        );
      }

      const renderEmpty = () => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vh(30),
            }}>
            <Image
              source={{
                uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/no-results-found-5732789-4812665.png',
              }}
              style={{height: 200, width: 200}}
            />
          </View>
        );
      };

      useEffect(() => {
        setBankAcc(props?.creditCard);
        setAccBackup(props?.creditCard);
      }, [props?.accountData]);

      // console.log('the credit card ===>', props?.creditCard)
  return (
    <ImageBackground source={Images.back_1} style={{flex:1}}>
      <View style={{flexDirection:'row', width:'100%', marginTop:vh(2), marginLeft:vw(2)}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center'}}>
            <Image source={Images.menu} style={{height: 30, width: 30}} />
        </TouchableOpacity>
        <View
          style={{
            width: '85%',
            backgroundColor: Colors.inputColor,
            borderRadius: 10,
            paddingLeft: vh(1),
            elevation: 2,
          }}>
          <TextInput
            placeholder="Search account..."
            value={search}
            onChangeText={txt => searchFunctionality(txt)}
          />
        </View>
      </View>
      <View style={{marginBottom:vh(6)}}>
        <FlatList
          data={accBackup}
          renderItem={renderAcc}
          // numColumns={2}
          ListEmptyComponent={renderEmpty}
        />
      </View>
      <CustomCreditFav />
    </ImageBackground>
  )
}

const mapStateToProps = state => ({
  creditCard: state.credit,
  expense: state.expenseData,
})

const mapDispatchToProps = dispatch => {
  return{
    delete_credit: id => {
      dispatch(delete_credit(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreditCard)

const styles = StyleSheet.create({})