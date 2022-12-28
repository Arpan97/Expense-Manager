import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import CustomText from '../../components/CustomText';
import Images from '../../utils/images';
import Add_Goals from '../../components/Dashboard_Component/Add_Goals';
import {connect} from 'react-redux';
import CustomFav from '../../components/CustomFav';
import History from '../../components/Dashboard_Component/History';
import {total_income} from '../../redux/Action/Action';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import Constant from '../../utils/language/index'

const Dashboard = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [greet, setGreet] = useState('')
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
    findGreet()
  }, [props?.expense]);

  const searchFunctionality = async txt => {};

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };

  useEffect(()=>{
    
  },[])

  const Push = (title, message) => {
    PushNotification.localNotification({
      title:title,
      message:message,
      channelId:'Arpan'
      // title:'Expense Manager',
      // message:'Please update your expenses',
      // channelId:'Arpan'
    })
  }

  return (
    <View
      style={{
        backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor,
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        // marginTop: vh(2),
      }}>
      {/* header section  */}
      <View style={{flexDirection:'row', width:'90%', alignSelf:'center', marginTop:vh(2)}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:vw(4)}}>
          <Image source={ nightMode == true ? Images.menu_white : Images.menu} style={{height:30, width:30}} />
        </TouchableOpacity>
        <View style={{justifyContent:'center', width:'74%'}}>
          <CustomText title={`Good ${greet}, ${props?.user?.name == '' ? 'User' : props?.user?.name}`} isBold style={{fontSize:15, color:nightMode == true ? Colors.white : Colors.textColor}} />
        </View>
        {/* <TouchableOpacity style={{width:'10%', justifyContent:'center', alignItems:'center'}}>
          <Image source={Images.show_account} style={{height:25, width:25}} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={()=>navigation.navigate('Report')} style={{width:'10%', justifyContent:'center', alignItems:'center'}}>
          <Image source={Images.calendar} style={{height:25, width:25}} />
        </TouchableOpacity> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* total amount section  */}
        <LinearGradient
        colors={['#E7F5FF', '#BDDDFF']}
          style={{
            flexDirection: 'row',
            // backgroundColor: Colors.white,
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
            <CustomText title={Constant.income} isBold style={{fontSize: 16}} />
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
            <CustomText title={Constant.expense} isBold style={{fontSize: 16}} />
            <Image
              source={Images.decrease}
              style={{
                height: 40,
                width: 40,
                // transform: [{rotate: '180deg'}],
              }}
            />
            <CustomText title={`${'\u20B9'}${expense}`} />
          </View>
        </LinearGradient>
        {/* add goals */}
        {props?.goal != '' && (
        <View style={{marginTop: vh(2), width:'90%', alignSelf:'center'}}>
          <Add_Goals />
        </View>
        )}
        {/* history  */}
        <View style={{marginTop: vh(2), width:'100%', alignSelf:'center'}}>
          <View style={{marginBottom: vh(2), width:'90%', alignSelf:'center'}}>
            <CustomText title={Constant.history} isBold style={{fontSize: 14, color: nightMode == true ? Colors.white : Colors.textColor}} />
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
  goal: state.goalData,
  themeMode: state.theme
});

const mapDispatchToProps = dispatch => {
  return {
    total_amount: data => {
      dispatch(total_income(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
