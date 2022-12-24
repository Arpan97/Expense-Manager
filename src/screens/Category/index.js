import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../components/CustomText'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import Colors from '../../utils/color'
import { category } from '../../utils/constants'

const CategorySection = () => {
    const navigation = useNavigation()
    const [selectCat, setSelectCat] = useState('Income')
    const [categories, setCategories] = useState('')

    const renderCat = ({item,index}) => {
        return(
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', flex:1, padding:vw(5), borderBottomWidth:2, borderColor:Colors.borderColor }} onPress={()=>navigation.navigate('CategoryWise',{data:item})}>
            <View>
              <CustomText title={item?.category} isBold style={{fontSize:13}} />
            </View>
            <View>
              <Image source={Images.back_black} style={{height:20, width:20, transform:[{rotate:'180deg'}]}} />
            </View>
          </TouchableOpacity>
            // <TouchableOpacity
            //       onPress={() =>
            //         navigation.navigate('CategoryWise', {data: item})
            //       }
            //       activeOpacity={0.6}
            //       style={{
            //         height: vh(25),
            //         width:'44%',
            //         // width: vw(40),
            //         backgroundColor: item?.color,
            //         marginLeft: vh(2),
            //         elevation: 5,
            //         borderRadius: 10,
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         marginBottom:vh(1),
            //         marginTop:vh(1)
            //       }}>
            //       <View style={{height: 50, width: 50}}>
            //         <Image
            //           source={item?.img}
            //           style={{height: '100%', width: '100%'}}
            //         />
            //       </View>
            //       <View style={{marginBottom: vh(1)}}>
            //         <CustomText
            //           title={item?.category}
            //           style={{
            //             color: Colors.white,
            //             textAlign: 'center',
            //             fontSize: 16,
            //           }}
            //         />
            //       </View>
            //       <View>
            //         <CustomText
            //           title={`Click to view${'\n'}expenses`}
            //           style={{color: Colors.white, textAlign: 'center'}}
            //         />
            //       </View>
            // </TouchableOpacity>
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
    <ImageBackground source={Images.back_1} style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
      }}>
        <View style={{width:'90%', alignSelf:'center', flexDirection:'row', marginTop:vh(2)}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:vw(4)}}>
            <Image source={Images.menu} style={{height:30, width:30}} />
            </TouchableOpacity>
            <View style={{width:'75%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                <CustomText title={'Category'} isBold style={{fontSize: 16, color:Colors.themeColor}} />
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
    </ImageBackground>
  )
}

export default CategorySection

const styles = StyleSheet.create({})