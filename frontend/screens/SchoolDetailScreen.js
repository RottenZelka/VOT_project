  import React, { useState } from 'react';
  import { View, Text, StyleSheet, Button, Alert } from 'react-native';
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode'; // Import jwt_decode

  const SchoolDetailScreen = ({ route }) => {
    const { school, countryName, typeName, token } = route.params;
    const [isApplying, setIsApplying] = useState(false);

    const handleApply = async () => {
      try {
        setIsApplying(true);
        // Include the JWT token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const decodedToken = jwtDecode(token);
        // Get the user ID from the decoded token
        console.log(decodedToken.user_id);
        const userId = decodedToken.user_id;
        // Make a POST request to record the application
        const response = await axios.post(
          'http://localhost:3000/apply',
          { schoolId: school.school_id, userId }, // Pass user ID along with school ID
          config
        );
        Alert.alert('Application Submitted', 'Your application has been submitted successfully.');
      } catch (error) {
        Alert.alert('Error', 'Failed to submit application. Please try again later.');
      } finally {
        setIsApplying(false);
      }
    };    

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{school.school_name}</Text>
        <Text style={styles.subtitle}>Abbreviation: {school.abbreviation}</Text>
        <Text style={styles.subtitle}>Country: {countryName}</Text>
        <Text style={styles.subtitle}>Type: {typeName}</Text>
        <Text style={styles.subtitle}>Info: {school.info}</Text>
        <Button
          title={isApplying ? 'Applying...' : 'Apply Now'}
          onPress={handleApply}
          disabled={isApplying}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 5,
    },
  });

  export default SchoolDetailScreen;
