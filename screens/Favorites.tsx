// import { useContext } from 'react';
import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import MealList from '../components/Meal/MealList';
// import { FavoritesContext } from '../contexts/favorites';
import { MEALS } from '../data/dummy-data';
import { useAppSelector } from '../redux/hooks/hooks';

type RootDrawerParamList = {
  Categories: undefined;
  Favorites: undefined;
  Detail?: { id: string }; // FIXME
};

type Props = DrawerScreenProps<RootDrawerParamList, 'Favorites'>;

type Params = { id: string };

const Favorites: React.FC<Props> = ({ navigation, route }) => {
  //   const { ids, removeFavorite } = useContext(FavoritesContext);

  const ids = useAppSelector(state => state.favorites.ids);

  const displayedMeals = MEALS.filter(meal => ids.includes(meal.id)); // one-liner

  //   ALTERNATIVE: displays meals according to when they were added
  //   let displayedMeals: Meal[] = [];

  //   ids.forEach(id => {
  //     const foundMeal = MEALS.find(meal => meal.id === id);
  //     foundMeal && displayedMeals.push(foundMeal);
  //   });

  //   prettier-ignore
  const navigateHandler = (params: Params) => navigation.navigate('Detail', params);

  let content;

  content = <MealList data={displayedMeals} onPress={navigateHandler} />;

  if (ids.length === 0) {
    content = (
      <View style={styles.container}>
        <Text style={styles.text}>Add a meal to your favorites</Text>
      </View>
    );
  }

  return <>{content}</>;
};

export default Favorites;

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  text: {
    color: 'white',
    fontFamily: 'Mooli',
    fontSize: 22,
    textAlign: 'center',
  },
});
