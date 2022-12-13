import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomHeader from '../../components/CustomHeader';
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
import {delete_goal} from '../../redux/Action/Action';
import CustomLoader from '../../components/CustomLoader';
import Snack from '../../utils/snackbar';
import {useNavigation} from '@react-navigation/native';
import CustomFav from '../../components/CustomFav';

const ViewGoal = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [goalList, setGoalList] = useState([]);
  const [totalInc, setTotalInc] = useState();
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.flatlist_container}>
        <View style={styles.header_view}>
          <View style={styles.img_view}>
            <Image source={item?.imgSet} style={styles.img} />
          </View>
          <View style={styles.title_view}>
            <CustomText title={item?.title} />
          </View>
          <TouchableOpacity
            onPress={() => {
              delete_goal(item?.id);
            }}
            style={styles.delete_btn}>
            <Image source={Images.delete} style={styles.delete_icn} />
          </TouchableOpacity>
        </View>
        <View>
          <Slider
            style={styles.slider}
            maximumValue={parseInt(item?.amount)}
            value={totalInc}
            maximumTrackTintColor="blue"
            // minimumTrackTintColor="blue"
            thumbTintColor={Colors.themeColor}
            thumbImage={Images.circle}
            disabled={true}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            {/* here show amount of total income  */}
            <CustomText title={`${'\u20B9'}${totalInc}`} />
          </View>
          <View>
            <CustomText title={`${'\u20B9'}${item?.amount}`} />
          </View>
        </View>
      </View>
    );
  };

  const emptyComponent = () => {
    return (
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
    );
  };

  const getAllGoal = () => {
    setGoalList(props?.goal);
  };

  const delete_goal = id => {
    props?.delete_goal(id);
    Snack('Goal deleted successfully');
  };

  const search_functionality = text => {
    setSearch(text);
  };

  useEffect(() => {
    getAllGoal();
    setTotalInc(props?.total);
  }, [props?.goal, props?.total]);

  return (
    <View style={styles.container}>
      {/* header  */}
      <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center'}}>
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
            backgroundColor: Colors.white,
            borderRadius: 10,
            paddingLeft: vh(1),
            elevation: 2,
          }}>
          <TextInput
            placeholder="Search goals..."
            value={search}
            onChangeText={txt => search_functionality(txt)}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={goalList}
          renderItem={renderItem}
          ListEmptyComponent={emptyComponent}
        />
      </View>
      <CustomFav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: vh(2),
  },
  search_container: {
    marginVertical: vh(2),
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.white,
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
    marginTop: vh(2),
    marginBottom: vh(1),
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
});

const mapDispatchToProps = dispatch => {
  return {
    delete_goal: id => {
      dispatch(delete_goal(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewGoal);
