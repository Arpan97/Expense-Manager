import PushNotification from "react-native-push-notification";

const not = (tit, mes) => {
    PushNotification.localNotification({
        title:tit,
        message:mes,
        channelId:'Expense'
    })
}

export {not}