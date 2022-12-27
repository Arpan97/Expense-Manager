import { Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import CustomText from '../../components/CustomText'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import Colors from '../../utils/color'
import moment from 'moment'

const ViewDeposit = (props) => {
    const navigation = useNavigation()
    const propData = props?.route?.params?.data
    const [totalInc, setTotalInc] = useState(0)
    const [depositData, setDepositData] = useState('')
    const [nightMode, setNightMode] = useState(false)

    const calculateAmt = () => {
        var save = 0;
        let d = props?.deposit?.filter((i,j)=>{
            return i?.goalId == propData?.id
          })
        d?.map((a,c) => {
          save = save + a?.depositAmt
        })
        setTotalInc(save)
      };

      const getData = () => {
        let data = props?.deposit?.filter((i,j)=>{
            return i?.goalId == propData?.id
        })
        setDepositData(data)
      }

      const renderDeposit = ({item,index}) => {
        return(
          <View style={{backgroundColor:Colors.white, padding:vh(0.6), elevation:3, marginBottom:vh(1), marginTop:vh(0.6), borderRadius:15, width:'95%', alignSelf:'center'}}>
          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', borderBottomWidth:0.6, borderColor:'lightgrey', borderStyle:'dashed', paddingBottom:vh(1), marginBottom:vh(1)}}>
              <View style={{width:'80%', flexDirection:'row', left:vw(2)}} >
                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Image source={Images.calendar} style={{height:30, width:30}} />
                </View>
                <View>
                  <CustomText title={moment(item?.depositDate).format('DD')} isBold style={{fontSize:28}} />
                </View>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                  <CustomText title={`${moment(item?.depositDate).format('MMM')}`} isBold style={{fontSize:10}} />
                  <CustomText title={`${moment(item?.depositDate).format('YYYY')}`} isBold style={{fontSize:10}} />
                </View>
                
              </View>
          </View>
          <View style={{flexDirection:'row', width:'100%', borderRadius:15, justifyContent:'space-between', left:vw(2)}}>
            <View style={{width:'80%'}} >
              <CustomText title={`${item?.goalTitle}`} style={{fontSize:14}} />
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:vh(1), marginBottom:vh(1)}}>
            <View style={{width:'30%', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <View>
                  <Image source={Images.increase} style={{height:20,width:20}} />
              </View>
              <View>
                  <CustomText title={`${'\u20B9'}${(item?.depositAmt).toFixed(2)}`} />
              </View>
            </View>
            <View style={{width:'30%', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
              <View>
                  <Image source={Images.decrease} style={{height:20,width:20}} />
              </View>
              <View>
                  <CustomText title={`${'\u20B9'}0.00`} />
              </View>
            </View>
          </View>
      </View>
            // <View style={{backgroundColor:Colors.white, padding:vh(1), elevation:3, borderRadius:15, width:'95%', marginTop:vh(0.6), alignSelf:'center', marginBottom:vh(1.5)}}>
            // <View style={{flexDirection:'row', alignItems:'center'}}>
            //     <View style={{width:60, height:60, justifyContent:'center', alignItems:'center'}}>
            //         <Image source={propData?.imgSet} style={{height:'80%', width:'80%', resizeMode:'contain'}} />
            //     </View>
            //     <View style={{width:'40%', marginLeft:vh(3)}}>
            //         <CustomText title={item?.goalTitle} />
            //     </View>
            //     <View style={{width:'30%', justifyContent:'center', alignItems:'center'}}>
            //         <View>
            //             <Image source={Images.increase} style={{height:20,width:20}} />
            //         </View>
            //         <View>
            //             <CustomText title={`${'\u20B9'}${(item?.depositAmt).toFixed(2)}`} />
            //         </View>

            //     </View>
            // </View>
            // <View style={{marginTop:vh(1), alignItems:'flex-end'}}>
            //     <CustomText title={`Deposit on: ${item?.depositDate}`} style={{fontSize:11}} />
            // </View>
            // </View>
        )
      }
    
      useEffect(()=>{
        calculateAmt()
        getData()
      },[])
      useMemo(()=>{
        if(props?.themeMode == false){
          setNightMode(false)
        }else if(props?.themeMode == true){
          setNightMode(true)
        }
      },[props?.themeMode, nightMode])
  return (
    <View  style={{flex:1, backgroundColor: nightMode == true ? Colors.black : Colors.backgroundColor}} >
      <View style={{flexDirection:'row', width:'100%', marginTop:vh(2), marginBottom:vh(2)}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:'10%', justifyContent:'center', alignItems:'center'}}>
            <Image source={nightMode == true ? Images.back_white : Images.back_3d} style={{height:22, width:22}} />
        </TouchableOpacity>
        <View style={{width:'80%', justifyContent:'center', alignItems:'center'}}>
            <CustomText isBold style={{fontSize:16, textAlign:'center', color: nightMode == true ? Colors.white : Colors.textColor}} title={'Deposit Detail'} />
        </View>
      </View>
      <View style={{width:'95%', alignSelf:'center', borderRadius:20, overflow:'hidden'}}>
        <ImageBackground source={Images.goal_card} style={{height:210, width:'100%'}}>
            <View style={{justifyContent:'center', alignItems:'center', top:vh(1)}}>
                <CustomText title={propData?.title} isBold style={{fontSize:16}} />
            </View>
            <View style={{marginTop:vh(0.4)}}>
            <View style={{}}>
                <CustomText title={'Target Amount'} isBold style={{fontSize:12}} />
            </View>
            <View style={{paddingLeft:vw(1), marginTop:vh(0.7)}}>
                <CustomText title={`${'\u20B9'}${propData?.amount}`} style={{fontSize:12, color:Colors.white}} />
            </View>
            </View>
            <View style={{marginTop:vh(0.4)}}>
            <View style={{}}>
                <CustomText title={'Deposit Amount'} isBold style={{fontSize:12}} />
            </View>
            <View style={{paddingLeft:vw(1), marginTop:vh(0.7)}}>
                <CustomText title={`${'\u20B9'}${totalInc}`} style={{fontSize:12, color:Colors.white}} />
            </View>
            </View>
            <View style={{position:'absolute', bottom:vh(7.5), right:vw(28)}}>
                <Image source={propData?.imgSet} style={{height:60, width:60}} />
            </View>
        </ImageBackground>
      </View>
      <View>
        <FlatList data={depositData} renderItem={renderDeposit} style={{marginBottom:vh(32)}} />
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
    deposit: state.goalDeposit,
    goal: state.goalData,
    themeMode: state.theme
})

export default connect (mapStateToProps, null) (ViewDeposit)

const styles = StyleSheet.create({})