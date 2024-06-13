import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const ApplyForSchoolScreen = ({ navigation, route }) => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch schools, countries, and types data
        const [schoolsResponse, countriesResponse, typesResponse] = await Promise.all([
          axios.get('http://localhost:3000/schools'),
          axios.get('http://localhost:3000/countries_all'),
          axios.get('http://localhost:3000/school_types_all')
        ]);

        setSchools(schoolsResponse.data);
        setFilteredSchools(schoolsResponse.data);
        setCountries(countriesResponse.data);

        // Manually create objects with unique identifiers for each school type
        const typesData = typesResponse.data.map((type, index) => ({ id: type.type_id, name: type.type_name }));
        setTypes(typesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterSchools();
  }, [selectedCountry, selectedType, searchText]);

  // Function to filter schools based on selected country, type, and search text
  const filterSchools = () => {
    let filtered = schools.filter((school) => {
      const name = school.school_name ? school.school_name.toLowerCase() : '';
      const abbreviation = school.abbreviation ? school.abbreviation.toLowerCase() : '';
      const matchesCountry = selectedCountry === '' || school.country_id === selectedCountry;
      const matchesType = selectedType === '' || school.type_id === selectedType;
      const matchesSearch = searchText === '' ||
        name.includes(searchText.toLowerCase()) ||
        abbreviation.includes(searchText.toLowerCase());
      return matchesCountry && matchesType && matchesSearch;
    });
    setFilteredSchools(filtered);
  };

  // Function to navigate to school detail screen
  const navigateToSchoolDetail = async (school) => {
    try {
      const { token } = route.params;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch country and type information for the school
      const [countryResponse, typeResponse] = await Promise.all([
        axios.get(`http://localhost:3000/countries/${school.country_id}`, config),
        axios.get(`http://localhost:3000/school_types/${school.type_id}`, config)
      ]);
      const countryName = countryResponse.data.country;
      const typeName = typeResponse.data.type;

      // Navigate to the school detail screen passing necessary data
      navigation.navigate('SchoolDetailScreen', { school, countryName, typeName , token });
    } catch (error) {
      console.error('Error fetching country or type:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}>
          <Picker.Item key="" label="Select Country" value="" />
          {countries.map((country) => (
            <Picker.Item key={country.country_id} label={country.country_name} value={country.country_id} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedType}
          onValueChange={(itemValue) => setSelectedType(itemValue)}>
          <Picker.Item key="" label="Select Type" value="" />
          {types.map((type) => (
            <Picker.Item key={type.id} label={type.name} value={type.id} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or abbreviation"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredSchools}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToSchoolDetail(item)}>
            <View style={styles.schoolItem}>
              <Text>{item.school_name}</Text>
              <Text>{item.abbreviation}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  schoolItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
});

export default ApplyForSchoolScreen;
