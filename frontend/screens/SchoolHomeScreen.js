import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const SchoolHomeScreen = ({ navigation, route }) => {
  // Extract the token from route params
  const { token } = route.params;

  const handleEdit = () => {
    // Navigate to the screen for editing studies and pass the token
    navigation.navigate('SchoolEditScreen', { token });
  };

  const handleViewApplicants = () => {
    // Navigate to the screen for viewing applicants and pass the token
    navigation.navigate('ViewApplicantsScreen', { token });
  };

  const handleViewStudents = () => {
    // Navigate to the screen for viewing students and pass the token
    navigation.navigate('ViewStudentsScreen', { token });
  };

  const handleViewTeachers = () => {
    // Navigate to the screen for viewing teachers and pass the token
    navigation.navigate('ViewTeachersScreen', { token });
  };

  return (
    <View style={styles.container}>
      <Button title="Edit Studies" onPress={handleEdit} />
      <Button title="View Applicants" onPress={handleViewApplicants} />
      <Button title="View Students" onPress={handleViewStudents} />
      <Button title="View Teachers" onPress={handleViewTeachers} />
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

export default SchoolHomeScreen;
