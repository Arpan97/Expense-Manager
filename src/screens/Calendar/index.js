import {View, ScrollView, Text, BackHandler, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Colors from '../../utils/color';
import AccordianList from '../../components/AccordianList';
import { connect } from 'react-redux';
import CustomText from '../../components/CustomText';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import Images from '../../utils/images';
import { useNavigation } from '@react-navigation/native';

const Report = (props) => {
  const [monthChng, setMonthChng] = useState(
    parseInt(moment(new Date()).format('M')),
  );
  const navigation = useNavigation()
  const [dataList, setDataList] = useState(props?.expense);
  const [userId, setUserId] = useState('');

  let markedDay = {};
  dataList?.map(item => {
    markedDay[item?.expenseDate] = {
      selected: true,
      marked: true,
      selectedColor: Colors.themeColor,
    };
  });


  return (
    <ImageBackground source={Images.back_1} style={{flex:1}}>
      <View style={{width:'100%', flexDirection:'row', marginTop:vh(2), marginLeft:vw(2)}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:'10%'}}>
          <Image source={Images.back_3d} style={{height:22, width:22}} />
        </TouchableOpacity>
        <View style={{width:'90%', justifyContent:'center'}}>
          <CustomText title={'Report'} isBold style={{fontSize:16}} />
        </View>
      </View>
      <>
        <View>
          <Calendar
            style={styles.calendarStyle}
            markedDates={markedDay}
            onMonthChange={month => setMonthChng(month.month)}
            theme={{
              indicatorColor: 'white',
              textDayFontSize: 16,
              textDayHeaderFontSize: 16,
              'stylesheet.calendar.main': {
                week: {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 5,
                },
              },
              'stylesheet.day.basic': {
                base: {
                  width:20,
                  height: 25,
                  paddingLeft:2
                },
              },
            }}
            disabledDaysIndexes={[0, 6]}
            // disableMonthChange={true}
            // disableArrowLeft={true}
            // disableArrowRight={true}
          />
        </View>
          <View style={{marginTop:vh(1), marginLeft:vw(3)}}>
            <CustomText title={'Monthly Report'} isBold />
          </View>
          {dataList == '' ? (
            <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: vh(6),
            }}>
            <Image
              source={{
                uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/no-results-found-5732789-4812665.png',
              }}
              style={{height: 200, width: 200}}
            />
          </View>
          ):(
            <ScrollView>
              {dataList?.map((item, index) => {
                let a = parseInt(moment(item?.expenseDate).format('M'));
                return (
                  <View key={item?.id}>
                    {monthChng == a && (
                        <AccordianList
                          expenseDate={item?.expenseDate}
                        incomeAmount={item?.incomeAmount}
                        expenseAmount={item?.expenseAmount}
                        expenseType={item?.expenseType}
                        description={item?.description}
                        category={item?.category}
                        account={item?.account}
                        />
                      )}
                  </View>
                );
              })}
            </ScrollView>
          )}
      </>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
    expense: state.expenseData
})

export default connect (mapStateToProps, null) (Report);

const styles = StyleSheet.create({});
