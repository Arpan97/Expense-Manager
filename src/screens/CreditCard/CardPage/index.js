import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../utils/color'
import CustomText from '../../../components/CustomText'
import Images from '../../../utils/images'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import CustomCreditFav from '../../../components/Fav/CreditCustomFav'

const CreditCard = (props) => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const [accBackup, setAccBackup] = useState('')
    const searchFunctionality = async txt => {
        setSearch(txt);
        // let masterDataSource = props?.accountData;
        // if (txt) {
        //   const newData = masterDataSource.filter(function (item) {
        //     const itemData = item.title
        //       ? item.title.toUpperCase()
        //       : ''.toUpperCase();
        //     const textData = txt.toUpperCase();
        //     return itemData.indexOf(textData) > -1;
        //   });
        //   setAccBackup(newData);
        // } else {
        //   setAccBackup(masterDataSource);
        // }
      };
      const renderAcc = ({item,index}) => {}

      const renderEmpty = () => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: vh(30),
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
    <ImageBackground source={Images.back_1} style={{flex:1}}>
      <View style={{flexDirection:'row', width:'100%', marginTop:vh(2), marginLeft:vw(2)}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:'10%', justifyContent:'center'}}>
            <Image source={Images.menu} style={{height: 30, width: 30}} />
        </TouchableOpacity>
        <View
          style={{
            width: '85%',
            backgroundColor: Colors.inputColor,
            borderRadius: 10,
            paddingLeft: vh(1),
            elevation: 2,
          }}>
          <TextInput
            placeholder="Search account..."
            value={search}
            onChangeText={txt => searchFunctionality(txt)}
          />
        </View>
      </View>
      <View style={{marginBottom:vh(6)}}>
        <FlatList
          data={accBackup}
          renderItem={renderAcc}
          // numColumns={2}
          ListEmptyComponent={renderEmpty}
        />
      </View>
      <CustomCreditFav />
    </ImageBackground>
  )
}

export default CreditCard

const styles = StyleSheet.create({})