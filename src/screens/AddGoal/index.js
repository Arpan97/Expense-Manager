import {View, Image} from 'react-native';
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

const AddGoal = props => {
  const [catImgs, setCatImgs] = useState([
    {id: 1, img: Images.home},
    {id: 2, img: Images.car},
    {id: 3, img: Images.mobile},
    {id: 4, img: Images.laptop},
    {id: 5, img: Images.saving},
  ]);
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [imgSet, setImgSet] = useState('');
  const [goals, setGoals] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

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
          };
          props?.add_new_goal(obj);
          navigation.replace('Drawer',{screen:'ViewGoal'});
        }
      }
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
    <View style={{backgroundColor: Colors.themeColor, flex: 1}}>
      <View style={{backgroundColor: Colors.themeColor, flex: 0.25}}>
        <View style={{top: vh(8), marginLeft: vw(4)}}>
          <CustomText
            title={`Create your new ${'\n'}saving goal!`}
            isBold
            style={{fontSize: 25, color:Colors.white}}
          />
        </View>
      </View>
      <ScrollView
        style={{
          flex: 0.7,
          backgroundColor: Colors.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 3,
          marginTop: vh(12),
        }}>
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
                    padding: vh(4),
                    marginLeft: vw(2),
                    borderRadius: 10,
                    borderWidth: item?.img == imgSet ? 2 : 0,
                    borderColor: item?.img == imgSet ? Colors.themeColor : 0,
                  }}>
                  <Image source={item?.img} style={{height: 40, width: 40}} />
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
              <CustomText title={'Goal title'} isRegular />
            </View>
            <View>
              <TextInput
                placeholder="Enter your goal..."
                value={title}
                onChangeText={txt => setTitle(txt)}
                style={[
                  Textstyles.bold,
                  {
                    borderBottomWidth: 1,
                    borderColor: Colors.black + 50,
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
              <CustomText title={'Target Amount'} isRegular />
            </View>
            <View>
              <TextInput
                placeholder="Enter amount..."
                value={amount}
                onChangeText={amt => setAmount(amt)}
                keyboardType="number-pad"
                style={[
                  Textstyles.bold,
                  {
                    borderBottomWidth: 1,
                    borderColor: Colors.black + 50,
                  },
                ]}
              />
            </View>
          </View>
        </View>
        <View
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
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center', alignItems:'center'}}>
          <CustomText title={'Cancel'} isBold style={{fontSize:14}} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  goal: state.goalData,
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
