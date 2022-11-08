import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native'
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import Details from '../screens/Details';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import AddGoal from '../screens/AddGoal';
import AddExpense from '../screens/AddExpense';
import ViewGoal from '../screens/ViewGoal';
import CategoryWise from '../screens/CategoryWise';
import EditProfile from '../screens/EditProfile';
import Privacy from '../screens/Privacy';
import CustomBill from '../components/CustomBill';
import ShowHistory from '../screens/ShowHistory';
import StepOne from '../screens/SignUp/StepOne';
import StepTwo from '../screens/SignUp/StepTwo';

const Stack = createNativeStackNavigator()

const AppContainer = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Onboarding' component={Onboarding} />
            <Stack.Screen name='Detail' component={Details} />
            <Stack.Screen name='Dashboard' component={Dashboard} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='AddGoal' component={AddGoal} />
            <Stack.Screen name='ViewGoal' component={ViewGoal} />
            <Stack.Screen name='AddExpense' component={AddExpense} />
            <Stack.Screen name='CategoryWise' component={CategoryWise} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='Privacy' component={Privacy} />
            <Stack.Screen name='CustomBill' component={CustomBill} />
            <Stack.Screen name='ShowHistory' component={ShowHistory} />
            <Stack.Screen name='StepOne' component={StepOne} />
            <Stack.Screen name='StepTwo' component={StepTwo} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer