// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LogInScreen';
import SchoolSignUpScreen from './SchoolSignUpScreen';
import SchoolLogInScreen from './SchoolLogInScreen';
import { View, Button, StyleSheet } from 'react-native';
import StudentHomeScreen from './StudentHomeScreen';
import ApplyForSchoolScreen from './ApplyForSchoolScreen';
import SchoolDetailScreen from './SchoolDetailScreen';
import SchoolHomeScreen from './SchoolHomeScreen';
import SchoolEditScreen from './SchoolEditScreen';
import EditInfoScreen from './EditInfoScreen';
import ViewApplicantsScreen from './ViewApplicantsScreen';
import StudentDetailScreen from './StudentDetailScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ title: 'Welcome' }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: 'Sign Up' }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Login' }}
            />
            <Stack.Screen
              name="SchoolSignUp"
              component={SchoolSignUpScreen} // Add SchoolSignUpScreen as a new screen
              options={{ title: 'School Sign Up' }}
            />
            <Stack.Screen
              name="SchoolLogIn"
              component={SchoolLogInScreen} // Add SchoolSignUpScreen as a new screen
              options={{ title: 'School Log In' }}
            />
            <Stack.Screen name="StudentHomeScreen" component={StudentHomeScreen} />
            <Stack.Screen name="ApplyForSchoolScreen" component={ApplyForSchoolScreen} />
            <Stack.Screen name="SchoolDetailScreen" component={SchoolDetailScreen} />
            <Stack.Screen name="SchoolHomeScreen" component={SchoolHomeScreen} />
            <Stack.Screen name="SchoolEditScreen" component={SchoolEditScreen} />
            <Stack.Screen name="EditInfoScreen" component={EditInfoScreen} />
            <Stack.Screen name="ViewApplicantsScreen" component={ViewApplicantsScreen} />
            <Stack.Screen name="StudentDetailScreen" component={StudentDetailScreen} />
            {/* <Stack.Screen name="EditStudiesScreen" component={EditStudiesScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
  );
};

type WelcomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign Up School"
        onPress={() => navigation.navigate('SchoolSignUp')}
      />
      <Button
        title="Sign Up User"
        onPress={() => navigation.navigate('SignUp')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Login School"
        onPress={() => navigation.navigate('SchoolLogIn')}
      />
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

export default App;
