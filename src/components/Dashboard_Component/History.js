import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CustomText from '../CustomText'
import Images from '../../utils/images'
import Colors from '../../utils/color'
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from 'react-native-responsive-screen'
import { delete_expense } from '../../redux/Action/Action'

const History = (props) => {
    const [history, setHistory] = useState([])
    const delete_expense = (id) => {
        props?.delete_expense(id)
    }
    const renderItem = ({item,index}) => {
        return(
            <View style={{backgroundColor:Colors.white, padding:vh(1), elevation:3, marginBottom:vh(1.5), borderRadius:15, width:'100%'}}>
            <View style={{flexDirection:'row'}}>
                <View style={{width:40, height:40, borderRadius:25, backgroundColor:Colors.white, elevation:3, overflow:'hidden', justifyContent:'center', alignItems:'center'}}>
                    <Image source={Images.expense} style={{height:'80%', width:'80%', resizeMode:'contain'}} />
                </View>
                <View style={{width:'40%', marginLeft:vh(3)}}>
                    <CustomText title={item?.category} />
                    <CustomText title={item?.description} />
                </View>
                <View style={{width:'30%', justifyContent:'center', alignItems:'center'}}>
                    <View>
                        {item?.expenseType == 'Expense' ? (
                            <Image source={Images.decrease} style={{height:20,width:20}} />
                        ):(
                            <Image source={Images.increase} style={{height:20,width:20}} />
                        )}
                    </View>
                    <View>
                        <CustomText title={item?.incomeAmount == 0 ? `${'\u20B9'}${(item?.expenseAmount).toFixed(2)}` : `${'\u20B9'}${(item?.incomeAmount).toFixed(2)}`} />
                    </View>

                </View>
                    <TouchableOpacity onPress={()=>delete_expense(item?.id)} style={{marginTop:vh(1), left:vh(1)}}>
                        <Image source={Images.delete} style={{height:20,width:20}} />
                    </TouchableOpacity>
            </View>
            <View style={{marginTop:vh(1), alignItems:'flex-end'}}>
                <CustomText title={`Created at: ${item?.expenseDate}`} style={{fontSize:11}} />
            </View>
            </View>
        )
    }

    const emptyComponent = () => {
        return(
            <View>
                <CustomText title={'No history found...'} style={{fontSize:13}} />
            </View>
        )
    }

    useEffect(()=>{
        setHistory(props?.expense)
    },[props?.expense])

    // console.log('the props', props?.expense)

  return (
    <View>
      <FlatList data={history} renderItem={renderItem} ListEmptyComponent={emptyComponent} keyExtractor={(item,index)=>index + ''} />
    </View>
  )
}

const mapStateToProps = state => ({
    expense: state.expenseData
})

const mapDispatchToProps = dispatch => {
    return{
        delete_expense: id => {
            dispatch(delete_expense(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)