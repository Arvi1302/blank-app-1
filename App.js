import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import SmartechReact from 'smartech-base-react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    </SafeAreaView>
  );
}

function NetcoreDeeplink() {
  useEffect(() => {
    const handleDeeplinkWithPayload = smartechData => {
      console.log('Smartech Data :: ', smartechData);
      console.log('Smartech Deeplink :: ', smartechData.smtDeeplink);
      console.log('Smartech CustomPayload:: ', smartechData.smtCustomPayload);
    };

    // Deeplink callback for Push Notification, InappMessage and AppInbox
    SmartechReact.addListener(
      SmartechReact.SmartechDeeplink,
      handleDeeplinkWithPayload,
    );
  });

  return () => {
    SmartechReact.removeListener(SmartechReact.SmartechDeeplink);
  };
}

// function Netcore() {
//   useEffect(() => {
//     const payloadata = {
//       FIRST_NAME: '',
//       LAST_NAME: '',
//       AGE: '',
//       COUNTRY: '',
//       STATE: '',
//       CITY: '',
//       PINCODE: '',
//     };

//     SmartechReact.updateUserProfile(
//       payloadata,
//       function (response) {},
//       function (error) {},
//     );

//     SmartechReact.setUserIdentity("<USER'S_IDENTITY>", (error, result) => {});

//     SmartechReact.login("<USER'S_IDENTITY>");

//     SmartechReact.logoutAndClearUserIdentity(false);

//     SmartechReact.trackEvent('EVENT_NAME', 'PAYLOAD_STRING');

//     // Sample code for reference purpose only
//     const payload = {
//       name: 'Galaxy',
//       description: '20gram bars',
//       payload_id: '1',
//       event_id: 21,
//     };
//     SmartechReact.trackEvent('Page Browse', payload);
//   }, []);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textView: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
