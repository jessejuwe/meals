import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FavoritesContextProvider from './contexts/favorites';
import store from './redux/store/store';
import Categories from './screens/Categories';
import Favorites from './screens/Favorites';
import MealDetail from './screens/MealDetail';
import MealsOverview from './screens/MealsOverview';

type RootStackParamList = {
  Detail: { id: string };
  Home: undefined;
  Overview: { id: string };
};

type RootDrawerParamList = {
  Categories: undefined;
  Favorites: undefined;
};

SplashScreen.preventAutoHideAsync();

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerAllowFontScaling: true,
        drawerHideStatusBarOnOpen: true,
        drawerStatusBarAnimation: 'slide',
        drawerStyle: { backgroundColor: '#24180f' },
        drawerContentStyle: { backgroundColor: '#24180f' },
        drawerContentContainerStyle: { backgroundColor: '#24180f' },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#24180f',
        drawerActiveBackgroundColor: '#cc8854',
        headerStyle: { backgroundColor: '#24180f' },
        headerTitleStyle: { fontFamily: 'Inter' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#3d291a' },
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    Mooli: require('./assets/fonts/Mooli-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Provider store={store}>
          <NavigationContainer>
            <Navigator
              initialRouteName="Home"
              screenOptions={{
                contentStyle: { backgroundColor: '#3d291a' },
                headerStyle: { backgroundColor: '#24180f' },
                headerBackTitleStyle: { fontSize: 12 },
                headerTitleStyle: { fontFamily: 'Inter' },
                headerTintColor: '#fff',
              }}
            >
              <Screen
                name="Detail"
                component={MealDetail}
                options={{
                  headerLargeTitle: true,
                  headerLargeTitleStyle: {
                    fontFamily: 'Inter-Bold',
                    fontSize: 20,
                  },
                }}
              />
              <Screen
                name="Home"
                options={{ headerShown: false }}
                component={DrawerNavigator}
              />
              <Screen name="Overview" component={MealsOverview} />
            </Navigator>
          </NavigationContainer>
        </Provider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });
