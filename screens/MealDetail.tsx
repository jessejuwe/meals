// import { useContext } from 'react';
import { useCallback, useLayoutEffect } from 'react';
import { Image, Text } from 'react-native';
import { View, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import IconButton from '../components/UI/IconButton';
// import { FavoritesContext } from '../contexts/favorites';
import { MEALS } from '../data/dummy-data';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { favActions } from '../redux/slices/favorites';

type RootStackParamList = {
  Detail: { id: string };
  Home: undefined;
  Overview: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const MealDetail: React.FC<Props> = ({ navigation, route }) => {
  //   const { addFavorite, ids, removeFavorite } = useContext(FavoritesContext);
  const { addFavorite, removeFavorite } = favActions;

  const ids = useAppSelector(state => state.favorites.ids);

  const dispatch = useAppDispatch();

  const { id } = route.params;

  const meal = MEALS.find(meal => meal.id === id);

  let favColor = 'white';

  const foundId = ids.includes(id);

  if (foundId) favColor = '#cc8854';

  const actionHandler = useCallback(() => {
    foundId ? dispatch(removeFavorite({ id })) : dispatch(addFavorite({ id }));
  }, [addFavorite, dispatch, foundId, id, removeFavorite]); // updating redux store

  //   ALTERNATIVE: using context
  //   const actionHandler = useCallback(() => {
  //     foundId ? removeFavorite(id) : addFavorite(id); // updating context
  //   }, [addFavorite, foundId, id, removeFavorite]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal!.title,
      headerRight: () => (
        <IconButton color={favColor} icon="star" onPress={actionHandler} />
      ),
    });
  }, [actionHandler, favColor, meal, navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Image style={styles.image} source={{ uri: meal!.imageUrl }} />
      <Text style={styles.title}>{meal!.title}</Text>

      <View style={styles.details}>
        <Text style={styles.detailsText}>{meal!.duration}MINS</Text>
        <Text style={styles.detailsText}>{meal!.complexity.toUpperCase()}</Text>
        <Text style={styles.detailsText}>
          {meal!.affordability.toUpperCase()}
        </Text>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.label}>
          <Text style={styles.subtitle}>INGREDIENTS</Text>
        </View>
        <View>
          {meal!.ingredients.map((ing, index) => (
            <View key={index} style={styles.list}>
              <Text style={styles.listItem}>{ing}</Text>
            </View>
          ))}
        </View>

        <View style={styles.label}>
          <Text style={styles.subtitle}>STEPS</Text>
        </View>

        <View>
          {meal!.steps.map((step, index) => (
            <View key={index} style={styles.list}>
              <Text style={styles.listItem}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetail;

const styles = StyleSheet.create({
  container: { padding: 16 },
  details: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    padding: 8,
  },
  detailsText: {
    color: 'white',
    fontFamily: 'Mooli',
    fontSize: 12,
    textAlign: 'center',
  },
  image: { borderRadius: 8, width: '100%', height: 200 + 150 },
  label: {
    borderBottomColor: '#e2b497',
    borderBottomWidth: StyleSheet.hairlineWidth,
    margin: 6,
    padding: 6,
  },
  list: {
    backgroundColor: '#e2b497',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  listContainer: {
    maxWidth: '85%',
  },
  listItem: {
    color: '#24180f',
    fontFamily: 'Mooli',
    fontSize: 12,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Mooli',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#e2b497',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
