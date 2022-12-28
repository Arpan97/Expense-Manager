import {View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../CustomText';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Images from '../../utils/images';
import Colors from '../../utils/color';
import { connect } from 'react-redux';
import { useMemo } from 'react';
import {useNavigation} from '@react-navigation/native';
import Constant from '../../utils/language';

const Add_Goals = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [goals, setGoals] = useState([]);
  const [totalInc, setTotalInc] = useState()
  const [percent, setPercent] = useState()
  const [nightMode, setNightMode] = useState(false)
  const navigation = useNavigation()

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

  const getAllGoal = () => {
      // setGoals(props?.goal);
  };

  const checkGoal = () => {
    let goals = props?.goal?.filter((i,j)=>{
      return i?.status == 'Pending'
    })
    setGoals(goals)
  }


  const renderItem = ({item, index}) => {
    var totalAmount = 0;
    let a = props?.deposit?.filter((i, j) => {
      return i?.goalId == item?.id;
    });
    a?.map((c, d) => {
      totalAmount = totalAmount + c?.depositAmt;
    });
    return (
      <View style={{width:'95%', alignSelf:'center', borderRadius:20, overflow:'hidden', marginTop:vh(1)}}>
        <ImageBackground source={Images.goal_card} style={{height:210, width:'100%'}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <CustomText title={item?.title} isBold style={{fontSize:16}} />
            </View>
            <View style={{marginTop:vh(0.4)}}>
            <View style={{}}>
                <CustomText title={'Target Amount'} isBold style={{fontSize:12}} />
            </View>
            <View style={{paddingLeft:vw(1), marginTop:vh(0.7)}}>
                <CustomText title={`${'\u20B9'}${item?.amount}`} style={{fontSize:12, color:Colors.white}} />
            </View>
            </View>
            <View style={{marginTop:vh(0.4)}}>
            <View style={{}}>
                <CustomText title={'Deposit Amount'} isBold style={{fontSize:12}} />
            </View>
            <View style={{paddingLeft:vw(1), marginTop:vh(0.7)}}>
                <CustomText title={`${'\u20B9'}${totalAmount}`} style={{fontSize:12, color:Colors.white}} />
            </View>
            </View>
            <View style={{position:'absolute', bottom:vh(7.5), right:vw(23)}}>
                <Image source={item?.imgSet} style={{height:60, width:60}} />
            </View>
        </ImageBackground>
      </View>
      // <View
      //   style={{
      //     backgroundColor: Colors.white,
      //     marginTop: vh(2),
      //     marginBottom: vh(1),
      //     width: '100%',
      //     elevation: 1,
      //     borderWidth: 0.5,
      //     borderColor: Colors.borderColor,
      //     borderRadius: 10,
      //     padding: vh(1),
      //   }}>
      //   <View style={{flexDirection: 'row'}}>
      //     <View
      //       style={{
      //         // backgroundColor: Colors.themeColor,
      //         height: 50,
      //         width: 50,
      //         borderRadius: 30,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}>
      //       <Image
      //         source={item?.imgSet}
      //         style={{height: '60%', width: '60%', resizeMode: 'cover'}}
      //       />
      //     </View>
      //     <View
      //       style={{
      //         width: '73%',
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}>
      //       <CustomText title={item?.title} />
      //     </View>
      //     {/* <View
      //       style={{
      //         width: '15%',
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         right:vw(2)
      //       }}>
      //       <CustomText title={fixedVal >= 100 ? '100%' : `${fixedVal}%`} />
      //     </View> */}
      //   </View>
      //   <View>
      //     <Slider
      //       style={{width: 340, height: 40}}
      //       maximumValue={parseInt(item?.amount)}
      //       value={totalAmount}
      //       maximumTrackTintColor="blue"
      //       thumbTintColor={Colors.themeColor}
      //       thumbImage={Images.circle}
      //       disabled={true}
      //     />
      //   </View>
      //   <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      //     <View>
      //       <CustomText title={`${'\u20B9'}${totalAmount}`} />
      //     </View>
      //     <View>
      //       <CustomText title={`${'\u20B9'}${item?.amount}`} />
      //     </View>
      //   </View>
      //   {totalInc < 0 && (
      //     <View style={{flexDirection:'row', marginTop:vh(0.5), justifyContent:'center', alignItems:'center', borderTopWidth:0.6, borderStyle:'dotted', paddingTop:vh(1)}}>
      //       <Image source={Images.warning} style={{height:20,width:20}} />
      //       <CustomText title={'Alert: You are going backward to your goal'} style={{fontSize:12, color:Colors.red, marginLeft:vw(2)}} />
      //     </View>
      //   )}
      //   {totalInc >= item?.amount && (
      //   <View style={{flexDirection:'row', marginTop:vh(0.5), justifyContent:'center', alignItems:'center', borderTopWidth:0.6, borderStyle:'dotted', paddingTop:vh(1)}}>
      //     <Image source={Images.complete} style={{height:20,width:20}} />
      //     <CustomText title={'Congratulations, You have completed your goal'} style={{fontSize:12, color:Colors.themeColor}} />
      //   </View>
      //   )}
      // </View>
    );
  };

  const renderEmpty = () => {
    return(
      <View style={{marginTop:vh(1.5)}}>
          <CustomText title={'No goals available'} style={{fontSize:13, color:nightMode == true ? Colors.white : Colors.textColor}} />
      </View>
  )
  }

  useEffect(() => {
    checkGoal();
  }, [props?.goal]);


  return (
    <View>
      {goals && (
        <>
          <View style={{marginBottom:vh(1)}}>
            <CustomText title={Constant.goalHeading} isBold style={{fontSize: 14, color:nightMode == true ? Colors.white : Colors.textColor}} />
          </View>
          <ScrollView style={{width:'100%', borderRadius:20}} 
          horizontal 
          showsHorizontalScrollIndicator={false} >
            {goals?.map((item,index)=>{
              var totalAmount = 0;
              let a = props?.deposit?.filter((i, j) => {
                return i?.goalId == item?.id;
              });
              a?.map((c, d) => {
                totalAmount = totalAmount + c?.depositAmt;
              });
              return(
                <View style={{width:vw(90)}}>
                <View style={{width:'95%', alignSelf:'center', borderRadius:20, overflow:'hidden'}}>
                  <ImageBackground source={Images.goal_card} style={{height:210, width:'100%'}}>
                      <View style={{justifyContent:'center', alignItems:'center'}}>
                          <CustomText title={(item?.title).toUpperCase()} isBold style={{fontSize:16}} />
                      </View>
                      <View style={{marginTop:vh(0.4)}}>
                      <View style={{marginLeft:vw(1)}}>
                          <CustomText title={Constant.target} isBold style={{fontSize:12}} />
                      </View>
                      <View style={{paddingLeft:vw(1), marginTop:vh(0.7), marginLeft:vw(0.6)}}>
                          <CustomText title={`${'\u20B9'}${item?.amount}`} style={{fontSize:12, color:Colors.white}} />
                      </View>
                      </View>
                      <View style={{marginTop:vh(0.4)}}>
                      <View style={{marginLeft:vw(1)}}>
                          <CustomText title={Constant.deposit} isBold style={{fontSize:12}} />
                      </View>
                      <View style={{paddingLeft:vw(1), marginTop:vh(0.7), marginLeft:vw(0.6)}}>
                          <CustomText title={`${'\u20B9'}${totalAmount}`} style={{fontSize:12, color:Colors.white}} />
                      </View>
                      </View>
                      <View style={{position:'absolute', bottom:vh(7.5), right:vw(23)}}>
                          <Image source={item?.imgSet} style={{height:60, width:60}} />
                      </View>
                  </ImageBackground>
                </View>
                </View>
              )
            })}
            {/* <FlatList data={goals} renderItem={renderItem} ListEmptyComponent={renderEmpty} /> */}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  goal: state.goalData,
  total: state.totalAmt,
  deposit: state.goalDeposit,
  themeMode: state.theme
})

export default connect(mapStateToProps, null)(Add_Goals);
