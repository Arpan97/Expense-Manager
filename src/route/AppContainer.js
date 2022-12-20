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
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContainer from '../components/DrawerContainer';
import { Dimensions } from 'react-native';
import CategorySection from '../screens/Category';
import BankAccount from '../screens/BankAccount';
import AddCard from '../screens/AddCard';
import BankDetail from '../screens/BankDetail';
import Premium from '../screens/Premium';
import Investment from '../screens/Investment';
import AddInvestCat from '../screens/AddInvestCat';
import InvestmentDetail from '../screens/InvestmentDetail';
import DepositGoal from '../screens/DepositGoal';
import ViewDeposit from '../screens/ViewDeposit';
import Report from '../screens/Calendar';
import CreditCard from '../screens/CreditCard/CardPage';
import AddCreditCard from '../screens/CreditCard/AddCreditCard/index'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const width = Dimensions.get('window').width

const AppContainer = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Onboarding' component={Onboarding} />
            <Stack.Screen name='Detail' component={Details} />
            {/* <Stack.Screen name='Dashboard' component={Dashboard} /> */}
            <Stack.Screen name='Drawer' component={DrawerNavigator} />
            {/* <Stack.Screen name='Profile' component={Profile} /> */}
            <Stack.Screen name='AddGoal' component={AddGoal} />
            {/* <Stack.Screen name='ViewGoal' component={ViewGoal} /> */}
            <Stack.Screen name='AddExpense' component={AddExpense} />
            <Stack.Screen name='AddInvestCat' component={AddInvestCat} />
            <Stack.Screen name='BankDetails' component={BankDetail} />
            <Stack.Screen name='Premium' component={Premium} />
            <Stack.Screen name='InvestDetail' component={InvestmentDetail} />
            <Stack.Screen name='DepositGoal' component={DepositGoal} />
            <Stack.Screen name='ViewDeposit' component={ViewDeposit} />
            <Stack.Screen name='Report' component={Report} />
            <Stack.Screen name='AddCreditCard' component={AddCreditCard} />
            {/* <Stack.Screen name='CategoryWise' component={CategoryWise} /> */}
            {/* <Stack.Screen name='EditProfile' component={EditProfile} /> */}
            {/* <Stack.Screen name='Privacy' component={Privacy} />
            <Stack.Screen name='CustomBill' component={CustomBill} />
            <Stack.Screen name='ShowHistory' component={ShowHistory} /> */}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

const DrawerNavigator = () =>{
  return(
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={(props) => <DrawerContainer {...props} />}
      screenOptions={{headerShown:false,  drawerPosition: 'left', drawerStyle:{backgroundColor: 'transparent', width:width/1.3}}}>
        <Drawer.Screen name='Dashboard' component={Dashboard} />
        <Drawer.Screen name='EditProfile' component={EditProfile} />
        <Drawer.Screen name='CategoryWise' component={CategoryWise} />
        <Drawer.Screen name='Privacy' component={Privacy} />
        <Drawer.Screen name='CustomBill' component={CustomBill} />
        <Drawer.Screen name='ShowHistory' component={ShowHistory} />
        <Drawer.Screen name='ViewGoal' component={ViewGoal} />
        <Drawer.Screen name='Category' component={CategorySection} />
        <Drawer.Screen name='Bank' component={BankAccount} />
        <Drawer.Screen name='AddCard' component={AddCard} />
        <Drawer.Screen name='Invest' component={Investment} />
        <Drawer.Screen name='CreditCard' component={CreditCard} />
      </Drawer.Navigator>

  )
}

export default AppContainer