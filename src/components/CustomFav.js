import React, {useState} from 'react'
import { FAB, Portal, Provider } from 'react-native-paper';
import Images from '../utils/images';
import Colors from '../utils/color';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as vh } from 'react-native-responsive-screen';

const CustomFav = () => {
    const [state, setState] = useState({ open: false });
    const navigation = useNavigation()
    const onStateChange = ({ open }) => setState({ open });
  
    const { open } = state;
  return (
    <Provider>
    <Portal>
      <FAB.Group
      style={{marginBottom:vh(0.1)}}
        open={open}
        color={Colors.white}
        backdropColor={'transparent'}
        fabStyle={{backgroundColor:Colors.themeColor}}
        icon={!open ? Images.add_black : Images.minus_black}
        actions={[
          {
            icon: Images.saving,
            label: 'Add Expense',
            onPress: () => navigation.navigate('AddExpense'),
            color:Colors.red
          },
          {
            icon: Images.goal,
            label: 'Add Goals',
            onPress: () => navigation.navigate('AddGoal'),
            color:Colors.orange
          },
          // {
          //   icon: Images.investment,
          //   label: 'Add Investment',
          //   onPress: () => navigation.navigate('AddInvestCat'),
          //   color:Colors.themeColor
          // },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  </Provider>
  )
}

export default CustomFav
