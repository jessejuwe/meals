import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import MealList from '../components/Meal/MealList';
import { MEALS, CATEGORIES } from '../data/dummy-data';

type RootStackParamList = {
  Detail: { id: string };
  Home: undefined;
  Overview: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Overview'>;
type Params = { id: string };

const MealsOverview: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;

  const category = CATEGORIES.find(item => item.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category!.title,
      contentStyle: { backgroundColor: category!.color },
    });
  }, [category, navigation]);

  // prettier-ignore
  const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(id) >= 0);

  // prettier-ignore
  const navigateHandler = (params: Params) => navigation.navigate('Detail', params);

  return <MealList data={displayedMeals} onPress={navigateHandler} />;
};

export default MealsOverview;

const styles = StyleSheet.create({
  text: { color: 'white' },
});
