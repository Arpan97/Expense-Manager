import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Images from '../../utils/images';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Colors from '../../utils/color';
import CustomInvestFav from '../../components/Fav/InvestCatFav';
import { investmentCat } from '../../utils/constants';
import CustomText from '../../components/CustomText';
import { connect } from 'react-redux';

const Investment = (props) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [totalInvest, setTotalInvest] = useState(0)
  const [allInvest, setAllInvest] = useState(0)

  const searchFunctionality = txt => {};
  const calculateTotal = () => {
    var allTotal = 0
    props?.investment?.map((a,b)=>{
      allTotal = allTotal + a?.investment_amount
    })
    setAllInvest(allTotal)
  }

  useEffect(()=>{
    calculateTotal()
  },[props?.investment])
  const renderCat = ({item,index}) => {
    
    let a = props?.investment?.filter((i,j)=>{
      return i?.investment_type == item?.category
    })
    var totalAmt = 0;
    a?.map((l,m)=>{
      totalAmt = totalAmt + l?.investment_amount
    })
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('InvestDetail',{data:item})} style={{width:'90%', alignSelf:'center', backgroundColor:Colors.white, elevation:3, borderRadius:10, borderColor:Colors.borderColor, marginBottom:vh(1), marginTop:vh(1)}}>
        <View style={{width:'100%', flexDirection:'row', padding:vh(1)}}>
          <View style={{width:'20%', overflow:'hidden', borderRadius:10, justifyContent:'center', alignItems:'center', backgroundColor:Colors.white}}>
            <Image source={item?.image} style={{height:60, width:60}} />
          </View>
          <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
            <CustomText title={item?.category} isBold />
          </View>
          <View style={{width:'30%', justifyContent:'center', alignItems:'center'}}>
            <CustomText title={`${'\u20B9'}${totalAmt}`} style={{color: totalInvest > 0 ? Colors.green : Colors.textColor}} />
          </View>
        </View>
      </TouchableOpacity>
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
  return (
    <View style={styles.container}>
      <View style={styles.header_view}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.back_btn_view}>
          <Image source={Images.menu} style={styles.menu_icn} />
        </TouchableOpacity>
        <View style={styles.input_view}>
          <TextInput
            placeholder="Search here..."
            value={search}
            onChangeText={txt => searchFunctionality(txt)}
          />
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
              <CustomText title={'Total Investment'} isBold style={{fontSize: 16, marginLeft:vw(5)}} />
            </View>
            <Image source={Images.totalMoney} style={{height: 40, width: 40}} />
            <CustomText title={`${'\u20B9'}${allInvest}`} />
        </View>
      </View>
      <View style={{marginTop:vh(2), marginBottom:vh(20)}}>
        <FlatList renderItem={renderCat} ListEmptyComponent={renderEmpty} data={investmentCat} />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  investment: state.invest
})

export default connect (mapStateToProps, null) (Investment);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: vh(2),
  },
  header_view: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  back_btn_view: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(4),
  },
  menu_icn: {
    height: 30,
    width: 30,
  },
  input_view: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingLeft: vh(1),
    elevation: 2,
  },
});
