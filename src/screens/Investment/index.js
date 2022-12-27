import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
  Text,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import Images from '../../utils/images';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Colors from '../../utils/color';
import CustomInvestFav from '../../components/Fav/InvestCatFav';
import {investmentCat} from '../../utils/constants';
import CustomText from '../../components/CustomText';
import {connect} from 'react-redux';

const Investment = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [totalInvest, setTotalInvest] = useState(0);
  const [allInvest, setAllInvest] = useState(0);
  const [category, setCategory] = useState('')
  const [nightMode, setNightMode] = useState(false)

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

  const searchFunctionality = txt => {
    setSearch(txt);
    let masterDataSource = investmentCat;
    if (txt) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.category
          ? item.category.toUpperCase()
          : ''.toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCategory(newData);
    } else {
      setCategory(masterDataSource);
    }
  };
  const calculateTotal = () => {
    var allTotal = 0;
    props?.investment?.map((a, b) => {
      allTotal = allTotal + a?.investment_amount;
    });
    setAllInvest(allTotal);
  };

  useEffect(()=>{
    setCategory(investmentCat);
  },[investmentCat])

  useEffect(() => {
    calculateTotal();
  }, [props?.investment]);

  const renderCat = ({item, index}) => {
    let a = props?.investment?.filter((i, j) => {
      return i?.investment_type == item?.category;
    });
    var totalAmt = 0;
    a?.map((l, m) => {
      totalAmt = totalAmt + l?.investment_amount;
    });
    return (
        <ImageBackground source={Images.cat_white} style={{width:'100%', height:150, borderRadius:10, overflow:'hidden', alignSelf:'center', marginTop:vh(2), justifyContent:'center'}}>
          <View style={{flexDirection:'row'}}>
            <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
              <Image source={item?.image} style={{height:62,width:62, borderTopLeftRadius:10}} />
            </View>
            <View style={{width:'50%', justifyContent:'center', alignItems:'center'}}>
              <CustomText title={item?.category} isBold />
              <CustomText title={`${'\u20B9'}${totalAmt}`} style={{color: totalInvest > 0 ? Colors.green : Colors.textColor}} />
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={()=>navigation.navigate('InvestDetail',{data:item})}
                style={{backgroundColor:'#131313', borderRadius:5, elevation:3, width:vw(25), height:vh(4), justifyContent:'center', marginTop:vh(2)}}>
                  <CustomText style={styles.explore_txt} title={'Explore'} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
    );
  };
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
  };
  return (
    <View style={{flex:1, width:'100%', alignSelf:'center', backgroundColor:nightMode == true ? Colors.black : Colors.backgroundColor}}>
      <View style={styles.header_view}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.back_btn_view}>
          <Image source={nightMode == true ? Images.menu_white : Images.menu} style={styles.menu_icn} />
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
          width: '95%',
          alignSelf: 'center',
          borderRadius: 20,
          overflow: 'hidden',
          marginTop: vh(2),
        }}>
        <ImageBackground
          source={Images.invest_background}
          style={{height: 210, width: '100%'}}>
          <View style={{position: 'absolute', bottom: vh(11.5), left: vw(8)}}>
            <Image source={Images.investment} style={{height: 60, width: 60}} />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vh(8),
              marginLeft: vw(15),
            }}>
            <CustomText
              title={'Total Investment'}
              isBold
              style={{fontSize: 16, color: Colors.white}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vh(2),
              marginLeft: vw(15),
            }}>
            <CustomText
              title={`${'\u20B9'}${allInvest}`}
              style={{fontSize: 16, color: Colors.white}}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={{marginBottom: vh(36), width:'95%', alignSelf:'center'}}>
        <FlatList
          renderItem={renderCat}
          ListEmptyComponent={renderEmpty}
          data={category}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <CustomInvestFav />
    </View>
  );
};

const mapStateToProps = state => ({
  investment: state.invest,
  themeMode: state.theme
});

export default connect(mapStateToProps, null)(Investment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  header_view: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: vh(2),
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
    backgroundColor: Colors.inputColor,
    borderRadius: 10,
    paddingLeft: vh(1),
    elevation: 2,
  },

  category_view: {
    flexDirection: 'row',
  },
  category_first_half_img: {
    // width: vw(40),
    borderTopLeftRadius: 10,
    // height: '100%',
    overflow: 'hidden',
  },
  category_img: {
    width: '95%',
    height: '95%',
    resizeMode: 'stretch',
    borderTopLeftRadius: 10,
  },
  category_second_half_img: {
    paddingLeft: 8,
    // width: vw(160),
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  category_second_txt: {
    fontSize: 23,
    color: Colors.black,
    textAlign: 'center',
    // borderBottomRightRadius: 10,
  },
  category_product_length: {
    color: Colors.black + 60,
  },
  explore_btn: {
    backgroundColor: '#131313',
    borderRadius: 5,
    // width: vw(116),
    // height: vw(33),
    // marginTop: vh(10),
    // paddingVertical: vh(8),
    elevation: 2,
  },
  explore_txt: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
});
