import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import CustomText from '../../components/CustomText'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import Colors from '../../utils/color'
import { category } from '../../utils/constants'

const CategorySection = () => {
    const navigation = useNavigation()

    const renderCat = ({item,index}) => {
        return(
            <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CategoryWise', {data: item})
                  }
                  activeOpacity={0.6}
                  style={{
                    height: vh(25),
                    width:'44%',
                    // width: vw(40),
                    backgroundColor: item?.color,
                    marginLeft: vh(2),
                    elevation: 5,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom:vh(1),
                    marginTop:vh(1)
                  }}>
                  <View style={{height: 50, width: 50}}>
                    <Image
                      source={item?.img}
                      style={{height: '100%', width: '100%'}}
                    />
                  </View>
                  <View style={{marginBottom: vh(1)}}>
                    <CustomText
                      title={item?.category}
                      style={{
                        color: Colors.white,
                        textAlign: 'center',
                        fontSize: 16,
                      }}
                    />
                  </View>
                  <View>
                    <CustomText
                      title={`Click to view${'\n'}expenses`}
                      style={{color: Colors.white, textAlign: 'center'}}
                    />
                  </View>
                </TouchableOpacity>
        )
    }
  return (
    <View style={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        marginTop: vh(2),
      }}>
        <View style={{width:'90%', alignSelf:'center', flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()} style={{width:'10%', justifyContent:'center', alignItems:'center', marginRight:vw(4)}}>
            <Image source={Images.menu} style={{height:30, width:30}} />
            </TouchableOpacity>
            <View style={{width:'75%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                <CustomText title={'Category'} isBold style={{fontSize: 16, color:Colors.themeColor}} />
            </View>
        </View>
        <View style={{paddingBottom:vh(4), marginTop:vh(1)}}>
            <FlatList data ={category} renderItem={renderCat} numColumns={2} />
        </View>
    </View>
  )
}

export default CategorySection

const styles = StyleSheet.create({})