import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

export default function ALertBox(type, title, msg) {
  if (type === 'success') {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: title,
      textBody: msg,
    });
  } else if (type === 'error') {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: title,
      textBody: msg,
    });
  } else if (type === 'warning') {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: title,
      textBody: msg,
    });
  }
}
