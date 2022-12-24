import {
  View,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Images from '../../utils/images';
import CustomText from '../../components/CustomText';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Colors from '../../utils/color';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CategoryWise = props => {
  let data = props?.route?.params?.data;
  const [catdata, setCatdata] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  const getExpense = () => {
    const filterData = props?.expense?.filter((i, j) => {
      return i.category == data.category;
    });
    setCatdata(filterData);
  };

  useEffect(() => {
    getExpense();
  }, [props?.expense]);

  useEffect(() => {
    checkExpense();
  }, [catdata]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          padding: vh(1),
          elevation: 2,
          marginBottom: vh(1.5),
          borderRadius: 10,
          flexDirection: 'row',
          width: '100%',
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 25,
            backgroundColor: Colors.white,
            elevation: 3,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.expense}
            style={{height: '80%', width: '80%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: '40%', marginLeft: vh(3)}}>
          <CustomText title={item?.category} />
          <CustomText title={item?.description} />
        </View>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: vh(4),
          }}>
          <View>
            {item?.expenseType == 'Expense' ? (
              <Image source={Images.decrease} style={{height: 20, width: 20}} />
            ) : (
              <Image source={Images.increase} style={{height: 20, width: 20}} />
            )}
          </View>
          <View>
            <CustomText
              title={
                item?.incomeAmount == 0
                  ? `${'\u20B9'}${(item?.expenseAmount).toFixed(2)}`
                  : `${'\u20B9'}${(item?.incomeAmount).toFixed(2)}`
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const emptyComponent = () => {
    return (
      <View>
        <CustomText title={'No history found...'} style={{fontSize: 13}} />
      </View>
    );
  };

  const checkExpense = () => {
    var total = 0,
      income = 0,
      expense = 0;
    catdata?.map(item => {
      income = income + item?.incomeAmount;
      expense = expense + item?.expenseAmount;
      total = income - expense;
    });
    setIncome(income.toFixed(2));
    setExpense(expense.toFixed(2));
    setTotal(total.toFixed(2));
  };

  return (
    <ImageBackground source={Images.back_1} style={{flex: 1}}>
      {/* header component */}
      <View style={{flexDirection: 'row', width: '95%'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            marginTop: vh(0.6),
            marginLeft: vw(2),
          }}>
          <Image source={Images.back_3d} style={{height: 22, width: 22}} />
        </TouchableOpacity>
        {/* <CustomHeader isBack /> */}
        <View style={{justifyContent: 'center'}}>
          <CustomText
            title={data?.category}
            style={{fontSize: 18, marginTop: vh(0.6), marginLeft: vw(5)}}
          />
        </View>
      </View>
      <>
        {/* total amount section  */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            marginTop: vh(3),
            width: '95%',
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
            <CustomText title={'Total Income'} isBold style={{fontSize: 16}} />
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
            <CustomText title={'Total Expense'} isBold style={{fontSize: 16}} />
            <Image
              source={Images.decrease}
              style={{height: 40, width: 40, transform: [{rotate: '180deg'}]}}
            />
            <CustomText title={`${'\u20B9'}${expense}`} />
          </View>
        </View>
        {/*history section */}
        <View style={{marginTop: vh(2), width: '95%', alignSelf: 'center'}}>
          <View style={{marginBottom: vh(2)}}>
            <CustomText title={'History'} isBold style={{fontSize: 16}} />
          </View>
          <View style={{}}>
            <FlatList
              data={catdata}
              renderItem={renderItem}
              ListEmptyComponent={emptyComponent}
            />
          </View>
        </View>
      </>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  expense: state.expenseData,
});

export default connect(mapStateToProps, null)(CategoryWise);
