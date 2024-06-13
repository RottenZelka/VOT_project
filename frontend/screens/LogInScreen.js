import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt_decode
import { decode } from "base-64"; 

global.atob = decode;

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful') {
        const token = response.data.token; // Extract token from response

        // Verify if token exists
        if (token) {
          console.log(token);
          // Decode the token to get user information
          const decodedToken = jwtDecode(token);

          // Check if decoded token contains role_id
          if (decodedToken.role_id === 1) {
            navigation.navigate('StudentHomeScreen', { token }); // Pass token during navigation
          } else {
            Alert.alert('Error', 'You do not have permission to access this page');
          }
        } else {
          // Handle case when token is missing
          Alert.alert('Error', 'Token is missing in the response');
        }
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Error logging in');
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
