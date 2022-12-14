import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Images from '../../utils/images';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../../components/CustomText';
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen';
import Colors from '../../utils/color';
import CustomInvestFav from '../../components/Fav/InvestCatFav';
import { connect } from 'react-redux';
import { delete_investment } from '../../redux/Action/Action';
import Notify from '../../utils/Dialog';

const InvestmentDetail = props => {
  const data = props?.route?.params?.data;
  const navigation = useNavigation()
  const [total, setTotal] = useState(0)
  const [history, setHistory] = useState('')
  const onBack = () => {
    navigation.goBack()
  }
  const getInvestData = () => {
    let investData = props?.investment
    let allData = investData?.filter((i,j)=>{
        return i?.investment_type == data?.category
    })
    var totalAmt = 0;
    allData?.map((k,l)=>{
        totalAmt = totalAmt + k?.investment_amount
    })
    setTotal(totalAmt)
    setHistory(allData)
  } 

  useEffect(()=>{
    getInvestData()
  },[props?.investment])

  const renderHistory = ({item,index}) => {
    return(
        <View style={{backgroundColor:Colors.white, padding:vh(1), elevation:3, marginBottom:vh(1.5), borderRadius:15, width:'90%', alignSelf:'center'}}>
            <View style={{flexDirection:'row'}}>
                <View style={{width:40, height:40, borderRadius:25, backgroundColor:Colors.white, elevation:3, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                    <Image source={Images.expense} style={{height:'80%', width:'80%', resizeMode:'contain'}} />
                </View>
                <View style={{width:'40%', marginLeft:vh(3)}}>
                    <CustomText title={item?.investment_title} />
                    <CustomText title={`By ${item?.investment_platform}`} />
                </View>
                <View style={{width:'30%', justifyContent:'center', alignItems:'center'}}>
                    <View>
                        <Image source={Images.increase} style={{height:20,width:20}} />
                    </View>
                    <View>
                        <CustomText title={`${'\u20B9'}${(item?.investment_amount).toFixed(2)}`} />
                    </View>

                </View>
                    <TouchableOpacity onPress={()=>delete_investment(item?.id)} style={{marginTop:vh(1), left:vh(1)}}>
                        <Image source={Images.delete} style={{height:20,width:20}} />
                    </TouchableOpacity>
            </View>
            <View style={{marginTop:vh(1), alignItems:'flex-end'}}>
                <CustomText title={`Invest on: ${item?.investment_date}`} style={{fontSize:11}} />
            </View>
            </View>
    )
  }
  const renderEmpty = () => {
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
  }

  const delete_investment = (id) => {
    Notify('success', 'Successfull', 'You investment is deleted successfully')
    props?.delete_investment(id)
  }
  return (
    <View style={{marginTop:vh(2), flex:1}}>
      <View style={{flexDirection:'row', marginLeft:vw(5)}}>
        <TouchableOpacity style={{width:'10%'}} onPress={onBack}>
            <Image source={Images.back_3d} style={{height:22, width:22}} />
        </TouchableOpacity>
        <View style={{width:'74%', alignItems:'center'}}>
            <CustomText title={data?.category} isBold style={{color:Colors.themeColor}} />
        </View>
      </View>
      <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            marginTop: vh(2),
            width: '50%',
            elevation: 3,
            borderWidth: 0.5,
            borderColor: Colors.borderColor,
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent:'center',
            alignItems:'center'
          }}>
        <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: vh(1),
              paddingBottom: vh(1),
            }}>
            
            <View style={{}}>
              <CustomText title={'Total'} isBold style={{fontSize: 16}} />
            </View>
            <Image source={Images.totalMoney} style={{height: 40, width: 40}} />
            <CustomText title={`${'\u20B9'}${total}`} />
        </View>
      </View>
      <View style={{marginTop:vh(2), width:'90%', alignSelf:'center'}}>
        <CustomText title={'Transaction History'} isBold style={{fontSize:12}} />
      </View>
      <View style={{marginTop:vh(2), marginBottom:vh(20)}}>
        <FlatList data={history} renderItem={renderHistory} ListEmptyComponent={renderEmpty} />
      </View>
      <CustomInvestFav />
    </View>
  );
};

const mapStateToProps = state => ({
    investment: state.invest
})

const mapDispatchToProps = dispatch => {
    return{
        delete_investment: id => {
            dispatch(delete_investment(id))
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (InvestmentDetail);

const styles = StyleSheet.create({});
