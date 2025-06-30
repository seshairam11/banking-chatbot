import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entry from './screens/Entry';
import Header from './components/Header';
import 'react-native-get-random-values';
import { useSelector } from "react-redux";
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import { StatusBar } from 'expo-status-bar';
import ChatScreen from './screens/ChatScreen';
import Passage from './screens/Passage';
import ListPassage from './screens/ListPassage';

const Stack = createStackNavigator();
const navigationRef = React.createRef();

export const GetCurrentRouteName = () => {
  return navigationRef.current?.getCurrentRoute()?.name;
};

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(null);
  const appState = useSelector((state) => state.appstate.login_info);
  const [cleanChat, setCleanChat] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCurrentRoute(GetCurrentRouteName());
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef} onStateChange={() => setCurrentRoute(GetCurrentRouteName())}>
        {currentRoute !== 'entry' && <Header setCleanChat={setCleanChat} cleanChat={cleanChat} />}
        <StatusBar backgroundColor="black" style='light' />
        <View style={styles.content}>
          <Stack.Navigator initialRouteName={appState.isAuth == true ? (appState.userType === "Admin" ? "passage" : "home") : "entry"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="entry" component={Entry} />
            <Stack.Screen name="home" children={() => <ChatScreen cleanChat={cleanChat} setCleanChat={setCleanChat} />} />
            <Stack.Screen name="myprofile" component={Profile} />
            <Stack.Screen name="settings" component={Settings} />
            <Stack.Screen name="passage" component={Passage} />
            <Stack.Screen name="listpassage" component={ListPassage} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
});

export default App;
