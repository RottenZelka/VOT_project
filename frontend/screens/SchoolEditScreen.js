import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const SchoolEditScreen = ({ navigation, route }) => {
  // Extract the token from route params
  const { token } = route.params;

  const handleEditInfo = () => {
    // Navigate to the screen for editing information and pass the token
    navigation.navigate('EditInfoScreen', { token });
  };

  const handleEditStudies = () => {
    // Navigate to the screen for editing studies and pass the token
    navigation.navigate('EditStudiesScreen', { token });
  };

  return (
    <View style={styles.container}>
      <Button title="Edit Information" onPress={handleEditInfo} />
      <Button title="Edit Studies" onPress={handleEditStudies} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SchoolEditScreen;
