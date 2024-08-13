import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import CustomText from '../CustomText';
import Images from '../../utils/images';
import Colors from '../../utils/color';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import {delete_expense} from '../../redux/Action/Action';
import moment from 'moment';

const History = props => {
  const [history, setHistory] = useState([]);

  const delete_expense = id => {
    props?.delete_expense(id);
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.itm_container}>
        <View style={styles.expenseDetailsView}>
          <View style={styles.expenseListView}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image source={Images.calendar} style={{height: 30, width: 30}} />
            </View>
            <View>
              <CustomText
                title={moment(item?.expenseDate).format('DD')}
                isBold
                style={{fontSize: 28}}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <CustomText
                title={`${moment(item?.expenseDate).format('MMM')}`}
                isBold
                style={{fontSize: 10}}
              />
              <CustomText
                title={`${moment(item?.expenseDate).format('YYYY')}`}
                isBold
                style={{fontSize: 10}}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => delete_expense(item?.id)}
              style={{left: vh(1)}}>
              <Image source={Images.delete} style={{height: 20, width: 20}} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderRadius: 15,
            justifyContent: 'space-between',
            left: vw(2),
          }}>
          <View style={{width: '80%'}}>
            <CustomText title={`${item?.category}`} style={{fontSize: 14}} />
            <CustomText title={item?.description} style={{fontSize: 12}} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(1),
            marginBottom: vh(1),
          }}>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View>
              <Image source={Images.increase} style={{height: 20, width: 20}} />
            </View>
            <View>
              <CustomText
                title={`${'\u20B9'}${(item?.incomeAmount).toFixed(2)}`}
              />
            </View>
          </View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View>
              <Image source={Images.decrease} style={{height: 20, width: 20}} />
            </View>
            <View>
              <CustomText
                title={`${'\u20B9'}${(item?.expenseAmount).toFixed(2)}`}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={{
            uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/no-results-found-5732789-4812665.png',
          }}
          style={styles.emptyImgView}
        />
      </View>
    );
  };

  const checkDateExpense = () => {
    let x = props?.expense?.sort(function (a, b) {
      return new Date(b.expenseDate) - new Date(a.expenseDate);
    });
    setHistory(x);
  };
  useEffect(() => {
    checkDateExpense();
  }, [props?.expense]);

  useEffect(() => {
    setHistory(props?.expense);
  }, [props?.expense]);

  return (
    <View>
      <FlatList
        data={history}
        renderItem={renderItem}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item, index) => index + ''}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  expense: state.expenseData,
});

const mapDispatchToProps = dispatch => {
  return {
    delete_expense: id => {
      dispatch(delete_expense(id));
    },
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vh(10),
  },
  emptyImgView: {
    height: 200,
    width: 200,
  },
  itm_container: {
    backgroundColor: Colors.white,
    padding: vh(0.6),
    elevation: 3,
    marginBottom: vh(1),
    marginTop: vh(0.6),
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center',
  },
  expenseDetailsView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderColor: 'lightgrey',
    borderStyle: 'dashed',
    paddingBottom: vh(1),
    marginBottom: vh(1),
  },
  expenseListView: {width: '80%', flexDirection: 'row', left: vw(2)},
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
