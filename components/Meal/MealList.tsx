import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { ListRenderItem } from 'react-native';

import MealItem from './MealItem';
import Meal from '../../models/meal';

type Params = { id: string };

type Props = { data: Meal[]; onPress: (params: Params) => void };

const MealList: React.FC<Props> = ({ data, onPress }) => {
  const renderItem: ListRenderItem<Meal> = ({ item }) => {
    const params = { id: item.id };

    const mealItemProps = {
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
      imageUrl: item.imageUrl,
      onPress: onPress.bind(this, params),
      title: item.title,
    };

    return <MealItem {...mealItemProps} />;
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default MealList;

const styles = StyleSheet.create({
  text: { color: 'white' },
});
