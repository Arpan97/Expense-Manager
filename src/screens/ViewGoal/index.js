import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Images from '../../utils/images';
import {FlatList} from 'react-native';
import CustomText from '../../components/CustomText';
import Slider from '@react-native-community/slider';
import {connect} from 'react-redux';
import {delete_goal, update_goal} from '../../redux/Action/Action';
import Snack from '../../utils/snackbar';
import {useNavigation} from '@react-navigation/native';
import CustomFav from '../../components/CustomFav';
import LinearGradient from 'react-native-linear-gradient';

const ViewGoal = props => {
  const [search, setSearch] = useState('');
  const [goalList, setGoalList] = useState([]);
  const [totalInc, setTotalInc] = useState(0);
  const [targetAmt, setTargetAmt] = useState(0);
  const navigation = useNavigation();
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  const checkGoalComplete = () => {
    let g = props?.goal?.map((item, index) => {
      let d = props?.deposit?.filter((i, j) => {
        return i?.goalId == item?.id;
      });
      var depositAmount = 0;
      d?.map((c, e) => {
        depositAmount = depositAmount + c?.depositAmt;
      });
      let body = {
        id: item?.id,
        imgSet: item?.imgSet,
        amount: item?.amount,
        title: item?.title,
        status:
          parseInt(item?.amount) == depositAmount ? 'Complete' : 'Pending',
      };
      return body;
    });
    props?.update_goal(g);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkGoalComplete();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item, index}) => {
    var totalAmount = 0;
    let a = props?.deposit?.filter((i, j) => {
      return i?.goalId == item?.id;
    });
    a?.map((c, d) => {
      totalAmount = totalAmount + c?.depositAmt;
    });
    return (
      <View style={styles.flatlist_container}>
        <View style={styles.header_view}>
          <View style={styles.img_view}>
            <Image source={item?.imgSet} style={styles.img} />
          </View>
          <View style={styles.title_view}>
            <CustomText title={item?.title} />
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              delete_goal(item?.id);
            }}
            style={styles.delete_btn}>
            <Image source={Images.delete} style={styles.delete_icn} />
          </TouchableOpacity> */}
        </View>
        <View>
          <Slider
            style={styles.slider}
            maximumValue={parseInt(item?.amount)}
            value={totalAmount}
            maximumTrackTintColor="blue"
            thumbTintColor={Colors.themeColor}
            thumbImage={Images.circle}
            disabled={true}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <CustomText title={`${'\u20B9'}${totalAmount}`} />
          </View>
          <View>
            <CustomText title={`${'\u20B9'}${item?.amount}`} />
          </View>
        </View>
        <View style={{flexDirection: 'row', width: '100%', marginTop: vh(1)}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewDeposit', {data: item})}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              width: totalAmount != item?.amount ? '50%' : '100%',
            }}>
            <Image
              source={Images.show_account}
              style={{height: 30, width: 30, marginRight: vw(2)}}
            />
            <CustomText title={'View Deposit'} />
          </TouchableOpacity>

          {totalAmount != item?.amount && (
            <TouchableOpacity
              onPress={() => navigation.navigate('DepositGoal', {data: item})}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: '50%',
              }}>
              <Image
                source={Images.deposit}
                style={{height: 30, width: 30, marginRight: vw(2)}}
              />
              <CustomText title={'Deposit'} />
            </TouchableOpacity>
          )}
        </View>
        {totalAmount == item?.amount && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vh(1),
            }}>
            <View style={{marginLeft: vw(2)}}>
              <Image source={Images.gift} style={{height: 20, width: 20}} />
            </View>
            <View>
              <CustomText
                title={`Congratulations! You have completed your goal`}
                isBold
                style={{fontSize: 12, color: Colors.themeColor}}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  const getAllGoal = () => {
    setGoalList(props?.goal);
    let comp = props?.goal?.filter((i, j) => {
      return i?.status == 'Complete';
    });
    let pend = props?.goal?.filter((i, j) => {
      return i?.status == 'Pending';
    });
    setCompleted(comp?.length);
    setPending(pend?.length);
  };

  const delete_goal = id => {
    props?.delete_goal(id);
    Snack('Goal deleted successfully');
  };

  const search_functionality = text => {
    setSearch(text);
  };

  const calculateAmt = () => {
    var target = 0,
      save = 0;
    props?.goal?.map((i, j) => {
      target = target + parseInt(i?.amount);
    });
    setTargetAmt(target);

    props?.deposit?.map((a, c) => {
      save = save + a?.depositAmt;
    });
    setTotalInc(save);
  };

  useEffect(() => {
    calculateAmt();
    getAllGoal();
  }, [props?.goal]);

  return (
    <ImageBackground source={Images.back_1} style={styles.container}>
      {/* header  */}
      <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop:vh(1)}}>
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
            elevation: 3,
          }}>
          <TextInput
            placeholder="Search goals..."
            value={search}
            onChangeText={txt => search_functionality(txt)}
          />
        </View>
      </View>
      {props?.goal == '' ? (
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
      ) : (
        <>
          <LinearGradient
            colors={['#E7F5FF', '#BDDDFF']}
            style={{paddingVertical: vh(4), marginTop: vh(2)}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <CustomText title={'Total Goals'} isBold style={{fontSize: 16}} />
              <CustomText title={props?.goal?.length} isMedium />
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText title={'Completed'} isBold style={{fontSize: 16}} />
                <CustomText title={completed} isMedium />
              </View>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText title={'Pending'} isBold style={{fontSize: 16}} />
                <CustomText title={pending} isMedium />
              </View>
            </View>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  title={'Target Amount'}
                  isBold
                  style={{fontSize: 16}}
                />
                <CustomText title={`${'\u20B9'}${targetAmt}`} isMedium />
              </View>
              <View
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  title={'Amount Saved'}
                  isBold
                  style={{fontSize: 16}}
                />
                <CustomText title={`${'\u20B9'}${totalInc}`} isMedium />
              </View>
            </View>
          </LinearGradient>
          <View>
            <FlatList
              style={{marginBottom: vh(32)}}
              data={goalList}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
      <CustomFav />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  search_container: {
    marginVertical: vh(2),
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.inputColor,
    elevation: 3,
    borderRadius: 50,
  },
  search_input: {
    marginLeft: vh(1),
  },
  search_icon_view: {
    position: 'absolute',
    right: vw(5),
    top: vh(1.7),
  },
  icon: {
    height: 20,
    width: 20,
  },
  flatlist_container: {
    backgroundColor: Colors.white,
    marginTop: vh(1),
    marginBottom: vh(0.6),
    width: '92%',
    elevation: 1,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    padding: vh(1),
    alignSelf: 'center',
  },
  header_view: {
    flexDirection: 'row',
  },
  img_view: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: '60%',
    width: '60%',
    resizeMode: 'cover',
  },
  title_view: {
    width: '73%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete_btn: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete_icn: {
    height: 20,
    width: 20,
  },
  slider: {
    width: 340,
    height: 40,
  },
});

const mapStateToProps = state => ({
  goal: state.goalData,
  total: state.totalAmt,
  deposit: state.goalDeposit,
});

const mapDispatchToProps = dispatch => {
  return {
    delete_goal: id => {
      dispatch(delete_goal(id));
    },
    update_goal: data => {
      dispatch(update_goal(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewGoal);
