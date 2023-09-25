import { FlatList } from 'react-native';
import { ListRenderItem } from 'react-native';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { CATEGORIES } from '../data/dummy-data';
import Category from '../models/category';
import GridTile from '../components/Category/GridTile';

type RootStackParamList = {
  Detail: { id: string };
  Home: undefined;
  Overview: { id: string };
};

type RootDrawerParamList = {
  Categories: undefined;
  Favorites: undefined;
  Overview?: { id: string }; // FIXME
};

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type Props = DrawerScreenProps<RootDrawerParamList, 'Categories'>;

const Categories: React.FC<Props> = ({ navigation }) => {
  const renderItem: ListRenderItem<Category> = ({ item }) => {
    const params = { id: item.id };

    const navigateHandler = () => navigation.navigate('Overview', params);

    const gridTileProps = {
      color: item.color,
      onPress: navigateHandler,
      title: item.title,
    };

    return <GridTile {...gridTileProps} />;
  };

  return (
    <FlatList
      data={CATEGORIES}
      horizontal={false}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({});
