import {View, TextInput, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import CustomText from '../../components/CustomText';
import {connect} from 'react-redux';
import {goal_deposit, update_goal} from '../../redux/Action/Action';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Textstyles from '../../utils/text';
import CustomButton from '../../components/CustomButton';
import Notify from '../../utils/Dialog';
import moment from 'moment';
import Images from '../../utils/images';
import CustomInput from '../../components/CustomComponent/CustomInput';

const DepositGoal = props => {
  const navigation = useNavigation();
  const [goalCat, setGoalCat] = useState(props?.route?.params?.data?.title);
  const [depositAmt, setDepositAmt] = useState(0);
  const [totalInc, setTotalInc] = useState(0)
  const [nightMode, setNightMode] = useState(false)

  useMemo(()=>{
    if(props?.themeMode == false){
      setNightMode(false)
    }else if(props?.themeMode == true){
      setNightMode(true)
    }
  },[props?.themeMode, nightMode])

  const addNewDeposit = () => {
    if(depositAmt != ''){
        if(depositAmt != 0){
            if(depositAmt <= totalInc){
                let body = {
                    id:Math.random().toString(16).slice(2),
                    goalId: props?.route?.params?.data?.id,
                    goalTitle: props?.route?.params?.data?.title,
                    depositAmt: parseInt(depositAmt),
                    depositDate: new Date()
                }
                let obj = {
                    id:props?.route?.params?.data?.id,
                    imgSet:props?.route?.params?.data?.imgSet,
                    amount:props?.route?.params?.data?.amount,
                    title:props?.route?.params?.data?.title,
                    status: depositAmt == totalInc ? 'Complete' : 'Pending'
                }
                if(depositAmt == totalInc){
                    props?.update_goal(obj)
                    props?.save_deposit(body)
                    navigation.goBack()
                    Notify('success', 'Congratulations', `You successfully deposit ${'\u20B9'}${parseInt(depositAmt)}`)
                }else{
                    props?.save_deposit(body)
                    navigation.goBack()
                    Notify('success', 'Congratulations', `You successfully deposit ${'\u20B9'}${parseInt(depositAmt)}`)
                }
            }else{
                Notify('error', "Alert", `You can add ${'\u20B9'}${totalInc} or less than ${'\u20B9'}${totalInc}`)
            }
        }else{
            Notify('error', "Alert", "Deposit amount should not be zero")
        }
    }else{
        Notify('error', "Alert", "Deposit amount should not be blank")
    }
  };

  const calculateAmt = () => {
    var save = 0;
    let d = props?.deposit?.filter((i,j)=>{
        return i?.goalId == props?.route?.params?.data?.id
      })
    d?.map((a,c) => {
      save = save + a?.depositAmt
    })
    let left = props?.route?.params?.data?.amount - save
    setTotalInc(left)
  };

  useEffect(()=>{
    calculateAmt()
  },[])
  return (
    <View style={{backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor, flex: 1}}>
      <View style={{height:200}}>
        <View style={{top: vh(8), marginLeft: vw(4), width:'90%', alignSelf:'center'}}>
          <CustomText
            title={`Deposit amount to save for ${props?.route?.params?.data?.title}`}
            isBold
            style={{fontSize: 25, color: nightMode == true ? Colors.white : Colors.textColor}}
          />
        </View>
      </View>
     
        <View>
          <View
            style={{
              marginTop: vh(2),
              width: '92%',
              alignSelf: 'center',
            }}>
            <View>
              <CustomText title={'Goal title'} isBold style={{fontSize: 13, color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View style={{marginTop:vh(0.6)}}>
              <CustomInput value={goalCat} editable={false} />
            </View>
          </View>
          <View
            style={{
              marginTop: vh(2),
              width: '92%',
              alignSelf: 'center',
            }}>
            <View>
              <CustomText
                title={'Deposit Amount'}
                isBold
                style={{fontSize: 13, color: nightMode == true ? Colors.white : Colors.textColor}}
              />
            </View>
            <View style={{marginTop:vh(0.6)}}>
            <CustomInput keyboardType="number-pad" value={depositAmt} editable={false} placeholder={'Enter amount to deposit'} onChangeText={amt => setDepositAmt(amt)} />
              {/* <TextInput
                placeholder="Enter amount to save"
                value={depositAmt}
                placeholderTextColor={nightMode == true ? Colors.white : Colors.textColor}
                onChangeText={amt => setDepositAmt(amt)}
                keyboardType="number-pad"
                style={[
                  Textstyles.medium,
                  {
                    color: Colors.black,
                    backgroundColor: nightMode == true ? Colors.white : Colors.white,
                    borderRadius:10,
                    // borderColor: nightMode == true ? Colors.white : Colors.black,
                    // borderWidth:0.6
                  },
                ]}
              /> */}
            </View>
          </View>
        </View>
        <View style={{marginTop:vh(1)}}>
            <CustomText title={`*You have ${'\u20B9'}${totalInc} left to complete your ${props?.route?.params?.data?.title} Goal`} style={{fontSize:12, color:Colors.red, textAlign:'center'}} isBold  />
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
            txtStyle={{
              color: nightMode == true ? Colors.white : Colors.textColor,
            }}
          />
          <CustomButton
            onPress={() => addNewDeposit()}
            btnStyle={{
              backgroundColor: Colors.themeColor,
              borderRadius: 10,
              elevation: 3,
              marginBottom: vh(1),
              paddingVertical: vh(1.4),
            }}
            title={'Deposit'}
            txtStyle={{color: Colors.white}}
          />
        </View>
    </View>
  );
};

const mapStateToProps = state => ({
    deposit: state.goalDeposit,
    themeMode: state.theme
})

const mapDispatchToProps = dispatch => {
  return {
    save_deposit: data => {
      dispatch(goal_deposit(data));
    },
    update_goal: data => {
        dispatch(update_goal(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositGoal);
