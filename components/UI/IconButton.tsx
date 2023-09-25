import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import React from 'react';

type Props = { color: string; icon: string | any; onPress: () => void };

const IconButton: React.FC<Props> = ({ color, icon, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({ pressed: { opacity: 0.7 } });
