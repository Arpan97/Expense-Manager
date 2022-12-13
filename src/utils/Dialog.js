import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export default function Notify(type, title, msg) {
  if (type == 'success') {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: title,
      textBody: msg,
    });
  } else if (type == 'error') {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: title,
      textBody: msg,
    });
  } else if (type == 'warning') {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: title,
      textBody: msg,
    });
  }
}
