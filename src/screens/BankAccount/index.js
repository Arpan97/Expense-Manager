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

const BankAccount = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [bankAcc, setBankAcc] = useState('');
  const [accBackup, setAccBackup] = useState('');

  const renderAcc = ({item, index}) => {
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
      <TouchableOpacity onPress={() => navigation.navigate('BankDetails', {data: item})} style={{width:'90%', alignSelf:'center', marginTop:vh(1.5), marginBottom:vh(1), borderRadius:10, overflow:'hidden', backgroundColor:Colors.white, elevation:3}}>
        <ImageBackground source={Images.card} style={{height:200, width:'100%'}}>
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
          <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1)}}>
            <CustomText
              title={(item?.title).toUpperCase()}
              isBold
              style={{color: Colors.white}}
            />
          </View>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(3), marginLeft:vw(20)}}>
            <CustomText title={item?.cardNum == undefined ? '' : `${item?.cardNum?.substring(0,4)} ${item?.cardNum?.substring(4,8)} ${item?.cardNum?.substring(8,12)} ${item?.cardNum?.substring(12,16)}`} isBold style={{fontSize:22, color:Colors.white}} />
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1), marginLeft:vw(27)}}>
              <CustomText title={item?.expiryDate == undefined ? '' : `Valid To : ${item?.expiryDate?.substring(0,2)}/${item?.expiryDate?.substring(2,4)}`}  isBold style={{fontSize:13, color:Colors.white}}  />
            </View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:vh(1), marginLeft:vw(16)}}>
            <CustomText title={item?.cvv == undefined ? '' : `CVV : ${item?.cvv}`}  isBold style={{fontSize:13, color:Colors.white}}  />
            </View>
          </View>
          <View style={{justifyContent:'center',marginTop:vh(2), marginLeft:vw(10)}}>
            <CustomText title={item?.accHolder == undefined ? '' : `${item?.accHolder}`} isBold style={{fontSize:18, color:Colors.white}} />
          </View>
          <View style={{justifyContent:'center',marginTop:vh(2), marginLeft:vw(10)}}>
          <CustomText
            title={`Available Bal : ${'\u20B9'} ${total}`}
            isBold
            style={{fontSize: 14, color: Colors.white}}
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
    <ImageBackground
    source={Images.back_1}
      style={{
        // backgroundColor: Colors.backgroundColor,
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
      <CustomBankFav />
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  accountData: state.account,
  expense: state.expenseData,
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
