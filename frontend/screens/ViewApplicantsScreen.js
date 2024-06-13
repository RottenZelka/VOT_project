import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ViewApplicantsScreen = ({ navigation, route }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { token } = route.params; // Assuming schoolId and token are passed as parameters

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const decoded = jwtDecode(token);
        console.log(decoded);
        // Fetch applicants for the given school with JWT token
        const response = await axios.get(`http://localhost:3000/school_applicants/${decoded.school_id}`, config);
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, []);

  const navigateToStudentDetail = (student) => {
    navigation.navigate('StudentDetailScreen', { student });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={applicants}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToStudentDetail(item)}>
            <View style={styles.applicantItem}>
              <Text>{`Student ID: ${item.student_id}`}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  applicantItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
});

export default ViewApplicantsScreen;
