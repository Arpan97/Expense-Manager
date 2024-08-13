import {View, ImageBackground, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../CustomText';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Images from '../../utils/images';
import Colors from '../../utils/color';
import {connect} from 'react-redux';
import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import Constant from '../../utils/language';

const Add_Goals = props => {
  const [goals, setGoals] = useState([]);
  const [nightMode, setNightMode] = useState(false);
  const navigation = useNavigation();

  useMemo(() => {
    if (props?.themeMode === false) {
      setNightMode(false);
    } else if (props?.themeMode === true) {
      setNightMode(true);
    }
  }, [props?.themeMode, nightMode]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (props?.themeMode === false) {
        setNightMode(false);
      } else if (props?.themeMode === true) {
        setNightMode(true);
      }
    });
    return unsubscribe;
  }, [navigation, props?.themeMode]);

  const checkGoal = () => {
    let goals = props?.goal?.filter((i, j) => {
      return i?.status == 'Pending';
    });
    setGoals(goals);
  };

  useEffect(() => {
    checkGoal();
  }, [props?.goal]);

  return (
    <View>
      {goals && (
        <>
          <View style={{marginBottom: vh(1)}}>
            <CustomText
              title={Constant.goalHeading}
              isBold
              style={{
                fontSize: 14,
                color: nightMode == true ? Colors.white : Colors.textColor,
              }}
            />
          </View>
          <ScrollView
            style={{width: '100%', borderRadius: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {goals?.map((item, index) => {
              var totalAmount = 0;
              let a = props?.deposit?.filter((i, j) => {
                return i?.goalId == item?.id;
              });
              a?.map((c, d) => {
                totalAmount = totalAmount + c?.depositAmt;
              });
              return (
                <View style={{width: vw(90)}}>
                  <View
                    style={{
                      width: '95%',
                      alignSelf: 'center',
                      borderRadius: 20,
                      overflow: 'hidden',
                    }}>
                    <ImageBackground
                      source={Images.goal_card}
                      style={{height: 210, width: '100%'}}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomText
                          title={(item?.title).toUpperCase()}
                          isBold
                          style={{fontSize: 16}}
                        />
                      </View>
                      <View style={{marginTop: vh(0.4)}}>
                        <View style={{marginLeft: vw(1)}}>
                          <CustomText
                            title={Constant.target}
                            isBold
                            style={{fontSize: 12}}
                          />
                        </View>
                        <View
                          style={{
                            paddingLeft: vw(1),
                            marginTop: vh(0.7),
                            marginLeft: vw(0.6),
                          }}>
                          <CustomText
                            title={`${'\u20B9'}${item?.amount}`}
                            style={{fontSize: 12, color: Colors.white}}
                          />
                        </View>
                      </View>
                      <View style={{marginTop: vh(0.4)}}>
                        <View style={{marginLeft: vw(1)}}>
                          <CustomText
                            title={Constant.deposit}
                            isBold
                            style={{fontSize: 12}}
                          />
                        </View>
                        <View
                          style={{
                            paddingLeft: vw(1),
                            marginTop: vh(0.7),
                            marginLeft: vw(0.6),
                          }}>
                          <CustomText
                            title={`${'\u20B9'}${totalAmount}`}
                            style={{fontSize: 12, color: Colors.white}}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: vh(7.5),
                          right: vw(23),
                        }}>
                        <Image
                          source={item?.imgSet}
                          style={{height: 60, width: 60}}
                        />
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              );
            })}
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
  themeMode: state.theme,
});

export default connect(mapStateToProps, null)(Add_Goals);
