import { Image, Pressable, Text, View } from 'react-native';
import { Platform, StyleSheet } from 'react-native';

type Props = {
  affordability: string;
  complexity: string;
  duration: number;
  imageUrl: string;
  onPress: () => void;
  title: string;
};

const MealItem: React.FC<Props> = props => {
  const { affordability, complexity, duration, imageUrl, onPress, title } = props; // prettier-ignore

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        android_ripple={{ color: '#ccc' }}
        onPress={onPress}
      >
        <View style={styles.contentWrap}>
          <View style={styles.info}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsText}>{duration}MINS</Text>
            <Text style={styles.detailsText}>{complexity.toUpperCase()}</Text>
            <Text style={styles.detailsText}>
              {affordability.toUpperCase()}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    margin: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  details: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    padding: 8,
  },
  detailsText: {
    color: '#2b2a2a',
    fontFamily: 'Inter',
    fontSize: 12,
    textAlign: 'center',
  },
  image: { width: '100%', height: 200 },
  info: {},
  pressable: {},
  pressed: { opacity: 0.85 },
  contentWrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    color: '#2b2a2a',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    margin: 8,
    textAlign: 'center',
  },
});
