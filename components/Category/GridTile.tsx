import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Platform, StyleSheet } from 'react-native';

type Props = { color: string; onPress: () => void; title: string };

const GridTile: React.FC<Props> = ({ color, onPress, title }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        android_ripple={{ color: '#ccc' }}
        onPress={onPress}
      >
        <View style={[styles.textWrap, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default GridTile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#3d291a',
    borderRadius: 8,
    elevation: 4,
    flex: 1,
    height: 150,
    justifyContent: 'center',
    margin: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  pressable: { flex: 1 },
  pressed: { opacity: 0.5 },
  textWrap: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    padding: 6,
    width: 180,
  },
  title: {
    color: '#292929',
    fontFamily: 'Mooli',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
