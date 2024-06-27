import React, { useContext } from 'react';
import Main from './components/Main';
import FullInfo from './components/FullInfo';
import TopicsSelectionPage from './components/About';
import SettingsScreen from './components/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ThemeContext from './ThemeContext';

const NativeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Main"
            component={Main}
            options={{
                title: 'НОВОСТИ',
                headerStyle: { backgroundColor: '#4682B4', height: 60},
                headerTitleAlign: 'center',
            }}
        />
        <Stack.Screen
            name="FullInfo"
            component={FullInfo}
            options={{ title: 'Полное описание новости' }}
        />
    </Stack.Navigator>
);

export default function Navigate() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'News') {
              iconName = 'network';
              return <Entypo name={iconName} size={size} color={color} />;
            } else if (route.name === 'About') {
              iconName = 'folder';
              return <FontAwesome name={iconName} size={size} color={color} />;
            } else if (route.name === 'Settings') {
              iconName = 'gear';
              return <FontAwesome name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: theme === 'светлая' ? '#4682B4' : '#fff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: theme === 'светлая' ? 'white' : '#242529',
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="News" component={MainStack} />
        <Tab.Screen name="About" component={TopicsSelectionPage} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
