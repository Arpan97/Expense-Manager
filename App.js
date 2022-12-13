import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import AppContainer from './src/route/AppContainer';
import {persistor, store} from './src/redux/store/store';
import Colors from './src/utils/color';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <AlertNotificationRoot>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            backgroundColor={Colors.themeColor}
            barStyle="dark-content"
            animated={true}
          />
          <AppContainer />
        </PersistGate>
      </Provider>
    </AlertNotificationRoot>
  );
};

export default App;
