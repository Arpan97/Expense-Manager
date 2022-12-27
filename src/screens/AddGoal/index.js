import {View, Image, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import Colors from '../../utils/color';
import CustomText from '../../components/CustomText';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native';
import Images from '../../utils/images';
import {TextInput} from 'react-native';
import Textstyles from '../../utils/text';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {add_goal, delete_goal} from '../../redux/Action/Action';
import Snack from '../../utils/snackbar';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import Notify from '../../utils/Dialog';
import { useMemo } from 'react';

const AddGoal = props => {
  const [catImgs, setCatImgs] = useState([
    {id: 1, img: Images.home, title: 'Home'},
    {id: 2, img: Images.car, title: 'Car'},
    {id: 3, img: Images.mobile, title: 'Mobile'},
    {id: 4, img: Images.laptop, title: 'Electronics'},
    {id: 5, img: Images.retirement, title: 'Retirement Saving'},
    {id: 6, img: Images.jewel, title: 'Jewellery'},
    {id: 7, img: Images.vacation, title: 'Vacation'},
    {id: 8, img: Images.hospital, title: 'Medical Emergency'},
    {id: 9, img: Images.emergency, title: 'Emergency Fund'},
    {id: 10, img: Images.education, title: 'Education'},
    {id: 11, img: Images.marriage, title: 'Marriage'},
    {id: 12, img: Images.startup, title: 'Start-Up'},
    {id: 13, img: Images.wealth, title: 'Wealth'},
    {id: 14, img: Images.saving, title: 'Other'},
  ]);

  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [imgSet, setImgSet] = useState('');
  const [goals, setGoals] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
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

  const checkGoal = () => {
    goals.filter((item, index) => {
      if (item.status == 'active') {
        if (item.totalAmount == item.complete) {
          setCheckComplete(true);
        } else {
          setCheckComplete(false); //change after redux implement
        }
      }
    });
  };

  const getAllGoal = () => {
    setGoals(props?.goal);
  };

  const addNewGoal = () => {
    if (title !== '') {
      if (amount !== '') {
        if (imgSet !== '') {
          let obj = {
            id: Math.random().toString(16).slice(2),
            title: title,
            amount: amount,
            imgSet: imgSet,
            status: 'Pending',
          };
          props?.add_new_goal(obj);
          navigation.replace('Drawer', {screen: 'ViewGoal'});
        }else{
          Notify('error', "Alert", "Please select Goal type")
        }
      }else{
        Notify('error', 'Alert', "Please add amount for goal")
      }
    }else{
      Notify('error', 'Alert','Please add goal title')
    }
  };

  const deleteExistGoal = id => {
    setIsModal(false);
    props?.delete_goal(id);
    Snack('Goal deleted successfully');
  };

  useEffect(() => {
    checkGoal();
    getAllGoal();
  }, [props?.goal]);

  return (
    <View style={{backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor, flex: 1}}>
        <View style={{top: vh(3), justifyContent:'center', alignItems:'center'}}>
          <CustomText
            title={`Create your new saving goal!`}
            isBold
            style={{fontSize: 20, color: nightMode == true ? Colors.white : Colors.textColor}}
          />
        </View>
      
          <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:vh(8)}}>
        <View>
          <ScrollView
            horizontal
            style={{marginTop: vh(2)}}
            showsHorizontalScrollIndicator={false}>
            {catImgs?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setImgSet(item?.img)}
                  style={{
                    borderRadius: 10,
                    borderWidth: item?.img == imgSet ? 1 : 0,
                    borderColor: item?.img == imgSet ? Colors.themeColor : 0,
                    justifyContent:'center',
                    alignItems:'center',
                    height:110,
                    width:120,
                    backgroundColor:nightMode == true ? Colors.white : null,
                    marginLeft:nightMode == true ? vw(1) : null
                  }}>
                  <Image source={item?.img} style={{height: 40, width: 40}} />
                  <CustomText title={item?.title} isBold style={{fontSize:12, marginTop:vh(1)}} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View
            style={{
              marginTop: vh(2),
              width: '92%',
              alignSelf: 'center',
            }}>
            <View>
              <CustomText title={'Goal title'} isRegular style={{color:nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View style={{marginTop:vh(0.6)}}>
              <TextInput
                placeholder="Enter your goal..."
                value={title}
                onChangeText={txt => setTitle(txt)}
                style={[
                  Textstyles.medium,
                  {
                    color: Colors.black,
                    backgroundColor: nightMode == true ? Colors.white : Colors.white,
                    borderRadius:10
                  },
                ]}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: vh(2),
              width: '92%',
              alignSelf: 'center',
            }}>
            <View>
              <CustomText title={'Target Amount'} isRegular style={{color:nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View style={{marginTop:vh(0.6)}}>
              <TextInput
                placeholder="Enter amount..."
                value={amount}
                onChangeText={amt => setAmount(amt)}
                keyboardType="number-pad"
                style={[
                  Textstyles.medium,
                  {
                    color: Colors.black,
                    backgroundColor: nightMode == true ? Colors.white : Colors.white,
                    borderRadius:10
                  },
                ]}
              />
            </View>
          </View>
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
            txtStyle={{ color: nightMode == true ? Colors.white : Colors.textColor}}
          />
          <CustomButton
            onPress={() => addNewGoal()}
            title={'Save Goal'}
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
            onPress={() => addNewGoal()}
            btnStyle={{
              backgroundColor: Colors.themeColor,
              borderRadius: 10,
              elevation: 3,
              marginBottom: vh(1),
              paddingVertical: vh(1.4),
            }}
            title={'Save Goal'}
            txtStyle={{color: Colors.white}}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <CustomText title={'Cancel'} isBold style={{fontSize: 14, color: nightMode == true ? Colors.white : Colors.textColor}} />
        </TouchableOpacity> */}
        </ScrollView>
        
    </View>
  );
};

const mapStateToProps = state => ({
  goal: state.goalData,
  themeMode: state.theme
});

const mapDispatchToProps = dispatch => {
  return {
    add_new_goal: data => {
      dispatch(add_goal(data));
    },
    delete_goal: id => {
      dispatch(delete_goal(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGoal);
