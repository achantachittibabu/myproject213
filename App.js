import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import FailureScreen from './screens/FailureScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import GradeScreen from './screens/GradeScreen';
import GradeEditScreen from './screens/GradeEditScreen';
import TimeTableScreen from './screens/TimeTableScreen';
import TimeTableDetailScreen from './screens/TimeTableDetailScreen';
import AssignmentsScreen from './screens/AssignmentsScreen';
import AssignmentDetailScreen from './screens/AssignmentDetailScreen';
import ExamsScreen from './screens/ExamsScreen';
import ExamDetailScreen from './screens/ExamDetailScreen';
import LibraryScreen from './screens/LibraryScreen';
import LibraryDetailScreen from './screens/LibraryDetailScreen';
import FeePaymentScreen from './screens/FeePaymentScreen';
import FeePaymentDetailScreen from './screens/FeePaymentDetailScreen';
import TransportScreen from './screens/TransportScreen';
import TransportDetailScreen from './screens/TransportDetailScreen';
import MessagesScreen from './screens/MessagesScreen';
import MessageDetailScreen from './screens/MessageDetailScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'Login' }}
          screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'Register' }}
          screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home', headerLeft: null }}
          screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
        />
        <Stack.Screen 
          name="Failure" 
          component={FailureScreen}
          options={{ title: 'Error' }}
          screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
        />
        <Stack.Screen 
          name="Attendance" 
          component={AttendanceScreen}
          options={{ title: 'Attendance' }}
          screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
        />
        <Stack.Screen 
          name="Grade" 
          component={GradeScreen}
          options={{ title: 'Grades' }}
          screenOptions={{
          headerShown: false, // Hide header for all screens
        }}
        />
        <Stack.Screen 
          name="GradeEdit" 
          component={GradeEditScreen}
          options={{ title: 'Grade Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="TimeTable" 
          component={TimeTableScreen}
          options={{ title: 'Time Table' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="TimeTableDetail" 
          component={TimeTableDetailScreen}
          options={{ title: 'Time Table Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="Assignments" 
          component={AssignmentsScreen}
          options={{ title: 'Assignments' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="AssignmentDetail" 
          component={AssignmentDetailScreen}
          options={{ title: 'Assignment Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="Exams" 
          component={ExamsScreen}
          options={{ title: 'Exams' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="ExamDetail" 
          component={ExamDetailScreen}
          options={{ title: 'Exam Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="Library" 
          component={LibraryScreen}
          options={{ title: 'Library' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="LibraryDetail" 
          component={LibraryDetailScreen}
          options={{ title: 'Book Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="FeePayment" 
          component={FeePaymentScreen}
          options={{ title: 'Fee Payment' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="FeePaymentDetail" 
          component={FeePaymentDetailScreen}
          options={{ title: 'Fee Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="Transport" 
          component={TransportScreen}
          options={{ title: 'Transport' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="TransportDetail" 
          component={TransportDetailScreen}
          options={{ title: 'Transport Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="Messages" 
          component={MessagesScreen}
          options={{ title: 'Messages' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="MessageDetail" 
          component={MessageDetailScreen}
          options={{ title: 'Message Details' }}
          screenOptions={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Settings' }}
          screenOptions={{
          headerShown: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
