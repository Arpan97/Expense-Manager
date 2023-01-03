import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Images from '../../utils/images';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../../components/CustomText';
import CustomBankFav from '../../components/CustomBankFav';
import {connect} from 'react-redux';
import {delete_account} from '../../redux/Action/Action';
import { useMemo } from 'react';

const BankAccount = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [bankAcc, setBankAcc] = useState('');
  const [accBackup, setAccBackup] = useState('');
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

  const renderAcc = ({item, index}) => {
    let allData = props?.expense?.filter((i, j) => {
      return i?.account == item?.title;
    });
    var total = 0,
      income = 0,
      expense = 0;
      console.log('the all data is ', allData == '')
      if(allData == ''){
        total = item?.openingAmt
        income = 0
        expense = 0
      }else{
        allData?.map(x => {
          income = income + x?.incomeAmount;
          expense = expense + x?.expenseAmount;
          total = item?.openingAmt + income - expense;
        });
      }
    console.log('the total is ===>', total)
    return (
      <TouchableOpacity onPress={() => navigation.navigate('BankDetails', {data: item})} style={{width:'90%', alignSelf:'center', marginTop:vh(1.5), marginBottom:vh(1), borderRadius:10, overflow:'hidden'}}>
        <ImageBackground source={item?.cardImage} style={{height:200, width:'100%'}} >
        <TouchableOpacity
                onPress={() => navigation.navigate('AddCard',{data:item})}
                style={{
                  height: 25,
                  width: 25,
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
              height: 25,
              width: 25,
              position: 'absolute',
              right: 10,
              top: 10,
            }}>
            <Image
              source={Images.delete}
              style={{height: '100%', width: '100%'}}
            />
          </TouchableOpacity>
          <View style={{justifyContent:'center', marginTop:vh(2), width:'100%', alignSelf:'center', alignItems:'center'}}>
            <CustomText
              title={(item?.title).toUpperCase()}
              isCardBold
              style={{color: Colors.white, fontSize:20}}
            />
          </View>
          {/* <View style={{justifyContent:'center', width:'88%', alignSelf:'center', top:vh(1)}}>
            <CustomText
              title={item?.accNo == undefined ? '' : `Account No : ${item?.accNo}`}
              isBold
              style={{color: Colors.white}}
            />
          </View> */}
          <View style={{justifyContent:'center', marginTop:vh(3), width:'88%', alignSelf:'center', left:vw(20)}}>
            <CustomText title={item?.cardNum == undefined ? '' : `${item?.cardNum?.substring(0,4)}  ${item?.cardNum?.substring(4,8)}  ${item?.cardNum?.substring(8,12)}  ${item?.cardNum?.substring(12,16)}`} isCardBold style={{fontSize:24, color:Colors.white}} />
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center', width:'40%', alignSelf:'center', left:vw(25.4), bottom:vh(1)}}>
              <CustomText title={item?.cvv == undefined ? '' : `CVV : ${item?.cvv}`}  isCardBold style={{fontSize:16, color:Colors.white}}  />
            </View>
            <View style={{justifyContent:'center', alignItems:'center',  marginLeft:vw(27), top:vh(5)}}>
              <CustomText title={'Valid'}  isBold style={{fontSize:10, color:Colors.white}} />
              <CustomText title={'Upto'}   isBold style={{fontSize:10, color:Colors.white}}/>
            </View>
            <View style={{marginTop:vh(0.3), marginLeft:vw(2), top:vh(5)}}>
              <CustomText title={item?.expiryDate == undefined ? '' : `${item?.expiryDate?.substring(0,2)}/${item?.expiryDate?.substring(2,4)}`}  isCardBold style={{fontSize:20, color:Colors.white}}  />
            </View>
          </View>
          <View style={{justifyContent:'center', bottom:vh(1), width:'89%', alignSelf:'center', marginTop:vh(2)}}>
          <CustomText
            title={`Available Bal : ${'\u20B9'} ${total}`}
            isCardBold
            style={{fontSize: 18, color: Colors.white}}
          />
        </View>
          <View style={{justifyContent:'center', width:'89%', alignSelf:'center', bottom:vh(1)}}>
            <CustomText title={item?.accHolder == undefined ? '' : `${item?.accHolder}`} isCardBold style={{fontSize:20, color:Colors.white}} />
          </View>
          <View style={{justifyContent:'center', width:'88%', alignSelf:'center', bottom:vh(1)}}>
            <CustomText
              title={item?.accNo == undefined ? '' : `Account No : ${item?.accNo}`}
              isCardBold
              style={{color: Colors.white}}
            />
          </View>
          
        </ImageBackground>
      </TouchableOpacity>
      // <TouchableOpacity
      //   onPress={() => navigation.navigate('BankDetails', {data: item})}
      //   style={{
      //     backgroundColor: Colors.themeColor,
      //     width: '41%',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     marginLeft: vw(6),
      //     marginTop: vh(2),
      //     paddingVertical: vh(3),
      //     borderRadius: 10,
      //     elevation: 5,
      //     marginBottom: vh(0.6),
      //   }}>
        // <TouchableOpacity
        //   onPress={() => delete_account(item?.id)}
        //   style={{
        //     height: 20,
        //     width: 20,
        //     position: 'absolute',
        //     right: 10,
        //     top: 10,
        //   }}>
        //   <Image
        //     source={Images.delete}
        //     style={{height: '100%', width: '100%'}}
        //   />
        // </TouchableOpacity>
      //   <View style={{height: 30, width: 30}}>
      //     <Image source={Images.bank} style={{height: '100%', width: '100%'}} />
      //   </View>
        // <View>
        //   <CustomText
        //     title={item?.title}
        //     isBold
        //     style={{color: Colors.white}}
        //   />
        // </View>
      //   {console.log('the total balance is ===>', total)}
        // <View>
        //   <CustomText
        //     title={`${'\u20B9'} ${total}`}
        //     isBold
        //     style={{fontSize: 14, color: Colors.white}}
        //   />
        // </View>
      // </TouchableOpacity>
    );
  };
  const searchFunctionality = async txt => {
    setSearch(txt);
    let masterDataSource = props?.accountData;
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
    props?.delete_account(id);
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: vh(20),
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
    setBankAcc(props?.accountData);
    setAccBackup(props?.accountData);
  }, [props?.accountData]);

  return (
    <View
      style={{
        backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor,
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        // marginTop: vh(2),
      }}>
      <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop:vh(2)}}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: vw(4),
          }}>
          <Image source={nightMode == true ? Images.menu_white : Images.menu} style={{height: 30, width: 30}} />
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
      <CustomBankFav />
    </View>
  );
};

const mapStateToProps = state => ({
  accountData: state.account,
  expense: state.expenseData,
  themeMode: state.theme
});

const mapDispatchToProps = dispatch => {
  return {
    delete_account: id => {
      dispatch(delete_account(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount);

const styles = StyleSheet.create({});
