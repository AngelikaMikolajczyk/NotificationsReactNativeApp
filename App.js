import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true
    }
  }
});

export default function App() {
   const permissionsHandler = async () => {
    const settings = await Notifications.getPermissionsAsync();
 
    const isGranted = settings.granted;
    if (isGranted) {
      Alert.alert(
        "Permission has already been granted!",
        "You can receive notifications"
      );
    } else {
      const request = await Notifications.requestPermissionsAsync();
 
      if (request.granted) {
        Alert.alert(
          "You have granted permissions",
          "You can now receive notifications"
        );
      } else {
        Alert.alert(
          "You did not grant permissions",
          "You will be unable to receive notifications"
        );
      }
    }
  };

  useEffect(() => {
    const subscriptionNotify = Notifications.addNotificationReceivedListener((notification) => {
      console.log('notification received');
      console.log('notification', notification.request.content);
    });

    const subscriptionNotifyResponse = Notifications.addNotificationResponseReceivedListener((response) => {
       console.log('notification response received');
      console.log('response', response.notification.request.content);
    });

    return () => {
      subscriptionNotify.remove();
      subscriptionNotifyResponse.remove();
    }
  }, [])

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'First local notification',
        body: 'This is the body of first notification!',
        data: {
          userName: 'Angelika'
        }
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      }
    });
  }

  return (
     <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Permissions"
          onPress={permissionsHandler}
        />
      </View>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
