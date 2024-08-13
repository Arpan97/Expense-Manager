import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Colors from '../../utils/color';
import moment from 'moment';
import CustomText from '../CustomText';
import Images from '../../utils/images';

export default function AccordianList(props) {
  return (
    <View>
      <View style={styles.containerView}>
        <View style={styles.calendarView}>
          <CustomText
            style={styles.dateTxt}
            title={`${moment(props?.expenseDate).format('DD')}`}
            isBold
          />
          <CustomText
            style={styles.dateTxt}
            title={`${moment(props?.expenseDate).format('MMM')}`}
            isBold
          />
        </View>
        <View style={styles.detailView}>
          <View style={styles.punchinTime}>
            <CustomText title={props?.account} isBold />
            <CustomText title={props?.category} style={{fontSize: 13}} />
          </View>
          <View style={styles.punchinTime}>
            <Image
              source={
                props?.expenseType == 'Income'
                  ? Images.increase
                  : Images.decrease
              }
              style={{height: 20, width: 20}}
            />
            <CustomText
              title={
                props?.expenseType == 'Income'
                  ? `${'\u20B9'}${props?.incomeAmount}`
                  : `${'\u20B9'}${props?.expenseAmount}`
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    borderRadius: 8,
    flexDirection: 'row',
    width: vw('95%'),
    height: vh(8),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    marginVertical: 5,
    padding: 5,
  },
  calendarView: {
    borderRadius: 8,
    width: '20%',
    padding: 4,
    backgroundColor: Colors.white,
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0,
      width: 1,
    },
  },
  dateTxt: {
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
    // color:Colors.black
  },
  detailView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  punchinTime: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
  },
});
