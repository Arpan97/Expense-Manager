import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import {category} from '../../utils/constants';
import CustomText from '../../components/CustomText';
import Images from '../../utils/images';
import Add_Goals from '../../components/Dashboard_Component/Add_Goals';
import {connect} from 'react-redux';
import CustomFav from '../../components/CustomFav';
import History from '../../components/Dashboard_Component/History';
import {total_income} from '../../redux/Action/Action';
import CustomLoader from '../../components/CustomLoader';
import {useNavigation} from '@react-navigation/native';

const Dashboard = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const checkExpense = () => {
    var total = 0,
      income = 0,
      expense = 0;
    props?.expense?.map(item => {
      income = income + item?.incomeAmount;
      expense = expense + item?.expenseAmount;
      total = income - expense;
    });
    setIncome(income.toFixed(2));
    setExpense(expense.toFixed(2));
    setTotal(total.toFixed(2));
    props.total_amount(total);
  };

  useEffect(() => {
    checkExpense();
  }, [props?.expense]);

  const searchFunctionality = async txt => {};


  return (
    <View
      style={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        marginTop: vh(2),
      }}>
      {/* header section  */}
      <View style={{flexDirection:'row', width:'90%', alignSelf:'center'}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:vw(4)}}>
          <Image source={Images.menu} style={{height:30, width:30}} />
        </TouchableOpacity>
        <View style={{width:'85%', backgroundColor:Colors.white, borderRadius:10, paddingLeft:vh(1), elevation:2}}>
          <TextInput placeholder='Search here...' value={search} onChangeText={(txt)=>searchFunctionality(txt)} />
        </View>
      </View>
      {/* <View style={{width:'90%', alignSelf:'center'}}>
        <CustomHeader isHome />
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* search bar  */}
        {/* <View
          style={{
            width:'90%',
            alignSelf:'center',
            backgroundColor: Colors.white,
            borderRadius: 10,
            paddingLeft: vh(1),
            elevation: 2,
            marginTop: vh(2),
          }}>
          <TextInput
            placeholder="Search here..."
            value={search}
            onPress={txt => searchFunctionality(txt)}
          />
        </View> */}
        {/* total amount section  */}
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
        {/* category section  */}
        {/* <View style={{marginTop: vh(2)}}>
          <View style={{width:'90%', alignSelf:'center'}}>
            <CustomText title={'Category'} isBold style={{fontSize: 16}} />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{marginTop: vh(2)}}
            horizontal>
            {category?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CategoryWise', {data: item})
                  }
                  activeOpacity={0.6}
                  style={{
                    height: vh(25),
                    width: vw(38),
                    backgroundColor: item?.color,
                    marginLeft: vh(2),
                    elevation: 5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom:vh(1)
                  }}>
                  <View style={{height: 50, width: 50}}>
                    <Image
                      source={item?.img}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                  <View style={{marginBottom: vh(1)}}>
                    <CustomText
                      title={item?.category}
                      style={{
                        color: Colors.white,
                        textAlign: 'center',
                        fontSize: 16,
                      }}
                    />
                  </View>
                  <View>
                    <CustomText
                      title={`Click to view${'\n'}expenses`}
                      style={{color: Colors.white, textAlign: 'center'}}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View> */}
        {/* add goals */}
        <View style={{marginTop: vh(2), width:'90%', alignSelf:'center'}}>
          <Add_Goals />
        </View>
        {/* history  */}
        <View style={{marginTop: vh(2), width:'90%', alignSelf:'center'}}>
          <View style={{marginBottom: vh(2)}}>
            <CustomText title={'History'} isBold style={{fontSize: 16}} />
          </View>
          <View>
            <History />
          </View>
        </View>
      </ScrollView>
      {/* fav button  */}
      <CustomFav />
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.userData,
  expense: state.expenseData,
  total: state.totalAmt,
});

const mapDispatchToProps = dispatch => {
  return {
    total_amount: data => {
      dispatch(total_income(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
