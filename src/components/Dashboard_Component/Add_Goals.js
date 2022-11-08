import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../CustomText';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import Images from '../../utils/images';
import Colors from '../../utils/color';
import {FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

const Add_Goals = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [goals, setGoals] = useState([]);
  const [totalInc, setTotalInc] = useState()
  const [percent, setPercent] = useState()

  const getAllGoal = () => {
      setGoals(props?.goal);
  };


  const renderItem = ({item, index}) => {
    let a = (totalInc / item?.amount) * 100
    let fixedVal = a.toFixed(2)
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          marginTop: vh(2),
          marginBottom: vh(1),
          width: '100%',
          elevation: 1,
          borderWidth: 0.5,
          borderColor: Colors.borderColor,
          borderRadius: 10,
          padding: vh(1),
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              // backgroundColor: Colors.themeColor,
              height: 50,
              width: 50,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={item?.imgSet}
              style={{height: '60%', width: '60%', resizeMode: 'cover'}}
            />
          </View>
          <View
            style={{
              width: '73%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText title={item?.title} />
          </View>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
              right:vw(2)
            }}>
            <CustomText title={fixedVal >= 100 ? '100%' : `${fixedVal}%`} />
          </View>
        </View>
        <View>
          <Slider
            style={{width: 340, height: 40}}
            maximumValue={parseInt(item?.amount)}
            value={totalInc}
            maximumTrackTintColor="blue"
            // minimumTrackTintColor="blue"
            thumbTintColor={Colors.themeColor}
            thumbImage={Images.circle}
            disabled={true}
            // step={totalInc}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            {console.log('the total===>', totalInc >= item?.amount)}
            <CustomText title={ totalInc >= item?.amount ? `${'\u20B9'}${item?.amount}` : `${'\u20B9'}${totalInc}`} />
          </View>
          <View>
            <CustomText title={`${'\u20B9'}${item?.amount}`} />
          </View>
        </View>
        {totalInc >= item?.amount && (
        <View style={{flexDirection:'row', marginTop:vh(0.5), justifyContent:'center', alignItems:'center', borderTopWidth:0.6, borderStyle:'dotted', paddingTop:vh(1)}}>
          <Image source={Images.complete} style={{height:20,width:20}} />
          <CustomText title={'Congratulations, You have completed your goal'} style={{fontSize:12, color:Colors.themeColor}} />
        </View>
        )}
      </View>
    );
  };

  useEffect(() => {
    getAllGoal();
    setTotalInc(props?.total)
  }, [props?.goal, props?.total]);


  return (
    <View>
      {goals && (
        <>
          <View style={{}}>
            <CustomText title={'Add Goals'} isBold style={{fontSize: 16}} />
          </View>
          <FlatList data={goals} renderItem={renderItem} />
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  goal: state.goalData,
  total: state.totalAmt
})

export default connect(mapStateToProps, null)(Add_Goals);
