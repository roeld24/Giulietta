import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Toolbar = ({ screen }) => {
  const navigation = useNavigation();

  const handleIconPress = (targetScreen) => {
    navigation.navigate(targetScreen);
  };

  const renderIcons = () => {
    switch (screen) {
      case 'HomeScreen':
        return (
          <>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleIconPress('DocumentScreen')}>
              <Icon name="document-outline" size={30} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleIconPress('Profile')}>
              <Icon name="person-outline" size={30} style={styles.icon} />
            </TouchableOpacity>
          </>
        );
      case 'DocumentScreen':
        return (
          <>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleIconPress('HomeScreen')}>
              <Icon name="home-outline" size={30} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleIconPress('Profile')}>
              <Icon name="person-outline" size={30} style={styles.icon} />
            </TouchableOpacity>
          </>
        );
      case 'Profile':
        return (
          <>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleIconPress('HomeScreen')}>
              <Icon name="home-outline" size={30} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleIconPress('DocumentScreen')}>
              <Icon name="document-outline" size={30} style={styles.icon} />
            </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.toolbarContainer}>
      {renderIcons()}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#C98F60',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#444444',
  },
  iconButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    color: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default Toolbar;
