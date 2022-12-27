import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../components/CustomText'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import Colors from '../../utils/color'
import { category } from '../../utils/constants'
import { connect } from 'react-redux'
import { useMemo } from 'react'

const CategorySection = (props) => {
    const navigation = useNavigation()
    const [selectCat, setSelectCat] = useState('Income')
    const [categories, setCategories] = useState('')
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

    const renderCat = ({item,index}) => {
        return(
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', flex:1, padding:vw(5), borderBottomWidth:2, borderColor:Colors.borderColor }} onPress={()=>navigation.navigate('CategoryWise',{data:item, category: item?.category})}>
            <View>
              <CustomText title={item?.category} isBold style={{fontSize:13, color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
            <View>
              <Image source={nightMode == true ? Images.right_white : Images.back_black} style={{height:20, width:20, transform: nightMode == true ? [{rotate:'0deg'}] :[{rotate:'180deg'}]}} />
            </View>
          </TouchableOpacity>
        )
    }

    const changeCat = () => {
      let data = category?.filter(item => {
        return item?.type == selectCat
      })
      setCategories(data)
    }

    useEffect(()=>{
      changeCat()
    },[selectCat])
  return (
    <View style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor
      }}>
        <View style={{width:'90%', alignSelf:'center', flexDirection:'row', marginTop:vh(2)}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:vw(4)}}>
            <Image source={nightMode == true ? Images.menu_white : Images.menu} style={{height:30, width:30}} />
            </TouchableOpacity>
            <View style={{width:'75%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                <CustomText title={'Category'} isBold style={{fontSize: 16, color: nightMode == true ? Colors.white : Colors.textColor}} />
            </View>
        </View>
        <View style={{
                width:'95%', 
                flexDirection:'row', 
                backgroundColor:Colors.white, 
                elevation:3, 
                alignSelf:'center', 
                borderRadius:3, 
                height:40,
                marginTop:vh(2)
                }}>
                <TouchableOpacity style={{borderRadius:3, width:'50%', justifyContent:'center', alignItems:'center', backgroundColor: selectCat == 'Income' ? Colors.themeColor : Colors.white}} onPress={()=>setSelectCat('Income')}>
                  <CustomText title={'Income'} isBold style={{color: selectCat == 'Income' ? Colors.white : Colors.textColor }} />
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:3,width:'50%', justifyContent:'center', alignItems:'center', backgroundColor: selectCat == 'Expense' ? Colors.themeColor : Colors.white}} onPress={()=>setSelectCat('Expense')}>
                  <CustomText title={'Expense'} isBold  style={{color: selectCat == 'Expense' ? Colors.white : Colors.textColor }} />
                </TouchableOpacity>
              </View>
        <View style={{paddingBottom:vh(4), marginTop:vh(1)}}>
            <FlatList data={categories} renderItem={renderCat} style={{marginBottom:vh(9)}} />
        </View>
    </View>
  )
}

const mapStateToProps = state => ({
  themeMode: state.theme
})

export default connect(mapStateToProps, null) (CategorySection)

const styles = StyleSheet.create({})