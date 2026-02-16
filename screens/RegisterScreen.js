import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Picker,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    // Account Info
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    aadharNumber: '',
    contactNumber: '',
    dateOfJoin: '',
    grade: '',
    classValue: '',
    classTeacher: '',

    // Parent Information
    fatherName: '',
    motherName: '',
    fatherAadharNumber: '',
    motherAadharNumber: '',
    fatherOccupation: '',

    // Present Address
    addressType: 'present',
    presentHouseNo: '',
    presentStreet: '',
    presentArea: '',
    presentLandmark: '',
    presentDistrict: '',
    presentState: '',
    presentPincode: '',
    presentPhone: '',
    sameAddress: false,

    // Permanent Address
    permanentHouseNo: '',
    permanentStreet: '',
    permanentArea: '',
    permanentLandmark: '',
    permanentDistrict: '',
    permanentState: '',
    permanentPincode: '',
    permanentPhone: '',

    // Files
    profilePic: '',
    aadharCardFile: '',
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicName, setProfilePicName] = useState('');
  const [aadharCardFileName, setAadharCardFileName] = useState('');

  const userTypes = ['student', 'teacher', 'admin'];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    // Account validation
    if (!formData.email || !formData.email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      Alert.alert('Validation Error', 'Please enter a valid phone number');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return false;
    }

    // Personal Information validation
    if (!formData.firstName.trim()) {
      Alert.alert('Validation Error', 'Please enter first name');
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert('Validation Error', 'Please enter last name');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const registrationData = {
        // Account Info
        username:formData.firstName.trim()+' '+formData.lastName.trim(),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: formData.userType,
        
        // Personal Information
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        aadharNumber: formData.aadharNumber.trim(),
        contactNumber: formData.contactNumber.trim(),
        dateOfJoin: formData.dateOfJoin,
        grade: formData.grade,
        class: formData.classValue,
        classTeacher: formData.classTeacher,

        // Parent Information
        fatherName: formData.fatherName.trim(),
        motherName: formData.motherName.trim(),
        fatherAadharNumber: formData.fatherAadharNumber.trim(),
        motherAadharNumber: formData.motherAadharNumber.trim(),
        fatherOccupation: formData.fatherOccupation.trim(),

        // Present Address
        addressType: formData.addressType,
        presentHouseNo: formData.presentHouseNo.trim(),
        presentStreet: formData.presentStreet.trim(),
        presentArea: formData.presentArea.trim(),
        presentLandmark: formData.presentLandmark.trim(),
        presentDistrict: formData.presentDistrict.trim(),
        presentState: formData.presentState.trim(),
        presentPincode: formData.presentPincode.trim(),
        presentPhone: formData.presentPhone.trim(),
        sameAddress: formData.sameAddress,

        // Permanent Address
        permanentHouseNo: formData.permanentHouseNo.trim(),
        permanentStreet: formData.permanentStreet.trim(),
        permanentArea: formData.permanentArea.trim(),
        permanentLandmark: formData.permanentLandmark.trim(),
        permanentDistrict: formData.permanentDistrict.trim(),
        permanentState: formData.permanentState.trim(),
        permanentPincode: formData.permanentPincode.trim(),
        permanentPhone: formData.permanentPhone.trim(),
      };

      const response = await axios.post('http://localhost:5000/api/users/', registrationData);

      setLoading(false);

      if (response.status == 200 || response.status == 201 || response.statusText == 'Created') {
        Alert.alert('Success', 'Registration successful! Please login.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      }
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error);

      navigation.navigate('Failure', {
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      });
    }
  };

  const handleClear = () => {
    setFormData({
      // Account Info
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      userType: 'student',
      
      // Personal Information
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      aadharNumber: '',
      contactNumber: '',
      dateOfJoin: '',
      grade: '',
      classValue: '',
      classTeacher: '',

      // Parent Information
      fatherName: '',
      motherName: '',
      fatherAadharNumber: '',
      motherAadharNumber: '',
      fatherOccupation: '',

      // Present Address
      addressType: 'present',
      presentHouseNo: '',
      presentStreet: '',
      presentArea: '',
      presentLandmark: '',
      presentDistrict: '',
      presentState: '',
      presentPincode: '',
      presentPhone: '',
      sameAddress: false,

      // Permanent Address
      permanentHouseNo: '',
      permanentStreet: '',
      permanentArea: '',
      permanentLandmark: '',
      permanentDistrict: '',
      permanentState: '',
      permanentPincode: '',
      permanentPhone: '',

      // Files
      profilePic: '',
      aadharCardFile: '',
    });
    setProfilePicName('');
    setAadharCardFileName('');
  };

  const pickProfilePic = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*'],
      });
      if (result.type === 'success') {
        setFormData((prev) => ({
          ...prev,
          profilePic: result.uri,
        }));
        setProfilePicName(result.name);
      }
    } catch (err) {
      console.error('Error picking profile pic:', err);
      Alert.alert('Error', 'Failed to select profile picture');
    }
  };

  const pickAadharCardFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
      });
      if (result.type === 'success') {
        setFormData((prev) => ({
          ...prev,
          aadharCardFile: result.uri,
        }));
        setAadharCardFileName(result.name);
      }
    } catch (err) {
      console.error('Error picking aadhar card:', err);
      Alert.alert('Error', 'Failed to select Aadhar card file');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Register for MySchool App</Text>

        {/* ===== ACCOUNT SECTION ===== */}
        <Text style={styles.sectionTitle}>Account Information</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            value={formData.firstName}
            onChangeText={(value) => updateFormData('firstName', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            value={formData.lastName}
            onChangeText={(value) => updateFormData('lastName', value)}
            editable={!loading}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            keyboardType="phone-pad"
            editable={!loading}
          />
        </View>

        {/* User Type Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>User Type</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
            disabled={loading}
          >
            <Text style={styles.dropdownText}>{formData.userType}</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {userTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.dropdownItem,
                    formData.userType === type && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    updateFormData('userType', type);
                    setShowDropdown(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      formData.userType === type && styles.dropdownItemTextActive,
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password (min 6 characters)"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* ===== PERSONAL INFORMATION SECTION ===== */}
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChangeText={(value) => updateFormData('dateOfBirth', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Aadhar Number</Text>
          <TextInput
            style={styles.input}
            placeholder="12-digit Aadhar number"
            value={formData.aadharNumber}
            onChangeText={(value) => updateFormData('aadharNumber', value)}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            value={formData.contactNumber}
            onChangeText={(value) => updateFormData('contactNumber', value)}
            keyboardType="phone-pad"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Join</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.dateOfJoin}
            onChangeText={(value) => updateFormData('dateOfJoin', value)}
            editable={!loading}
          />
        </View>

        {formData.userType === 'student' && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Grade</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter grade"
                value={formData.grade}
                onChangeText={(value) => updateFormData('grade', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Class</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter class"
                value={formData.classValue}
                onChangeText={(value) => updateFormData('classValue', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Class Teacher</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter class teacher name"
                value={formData.classTeacher}
                onChangeText={(value) => updateFormData('classTeacher', value)}
                editable={!loading}
              />
            </View>
          </>
        )}

        {/* ===== PARENT INFORMATION SECTION ===== */}
        {formData.userType === 'student' && (
          <>
            <Text style={styles.sectionTitle}>Parent Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Father Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter father name"
                value={formData.fatherName}
                onChangeText={(value) => updateFormData('fatherName', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mother Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter mother name"
                value={formData.motherName}
                onChangeText={(value) => updateFormData('motherName', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Father Aadhar Number</Text>
              <TextInput
                style={styles.input}
                placeholder="12-digit Aadhar number"
                value={formData.fatherAadharNumber}
                onChangeText={(value) => updateFormData('fatherAadharNumber', value)}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mother Aadhar Number</Text>
              <TextInput
                style={styles.input}
                placeholder="12-digit Aadhar number"
                value={formData.motherAadharNumber}
                onChangeText={(value) => updateFormData('motherAadharNumber', value)}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Father Occupation</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter father occupation"
                value={formData.fatherOccupation}
                onChangeText={(value) => updateFormData('fatherOccupation', value)}
                editable={!loading}
              />
            </View>
          </>
        )}

        {/* ===== PRESENT ADDRESS SECTION ===== */}
        <Text style={styles.sectionTitle}>Present Address</Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={formData.sameAddress ? 'checked' : 'unchecked'}
            onPress={() => updateFormData('sameAddress', !formData.sameAddress)}
            disabled={loading}
          />
          <Text style={styles.checkboxLabel}>Same as Present Address</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>House No.</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter house number"
            value={formData.presentHouseNo}
            onChangeText={(value) => updateFormData('presentHouseNo', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Street Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter street name"
            value={formData.presentStreet}
            onChangeText={(value) => updateFormData('presentStreet', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Area Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter area name"
            value={formData.presentArea}
            onChangeText={(value) => updateFormData('presentArea', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Land Mark</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter landmark"
            value={formData.presentLandmark}
            onChangeText={(value) => updateFormData('presentLandmark', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>District Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter district name"
            value={formData.presentDistrict}
            onChangeText={(value) => updateFormData('presentDistrict', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>State Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter state name"
            value={formData.presentState}
            onChangeText={(value) => updateFormData('presentState', value)}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pincode"
            value={formData.presentPincode}
            onChangeText={(value) => updateFormData('presentPincode', value)}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={formData.presentPhone}
            onChangeText={(value) => updateFormData('presentPhone', value)}
            keyboardType="phone-pad"
            editable={!loading}
          />
        </View>

        {/* ===== PERMANENT ADDRESS SECTION ===== */}
        {!formData.sameAddress && (
          <>
            <Text style={styles.sectionTitle}>Permanent Address</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>House No.</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter house number"
                value={formData.permanentHouseNo}
                onChangeText={(value) => updateFormData('permanentHouseNo', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Street Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter street name"
                value={formData.permanentStreet}
                onChangeText={(value) => updateFormData('permanentStreet', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Area Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter area name"
                value={formData.permanentArea}
                onChangeText={(value) => updateFormData('permanentArea', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Land Mark</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter landmark"
                value={formData.permanentLandmark}
                onChangeText={(value) => updateFormData('permanentLandmark', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>District Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter district name"
                value={formData.permanentDistrict}
                onChangeText={(value) => updateFormData('permanentDistrict', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>State Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter state name"
                value={formData.permanentState}
                onChangeText={(value) => updateFormData('permanentState', value)}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter pincode"
                value={formData.permanentPincode}
                onChangeText={(value) => updateFormData('permanentPincode', value)}
                keyboardType="numeric"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                value={formData.permanentPhone}
                onChangeText={(value) => updateFormData('permanentPhone', value)}
                keyboardType="phone-pad"
                editable={!loading}
              />
            </View>
          </>
        )}

        {/* File Upload Section */}
        <Text style={styles.sectionTitle}>Upload Documents</Text>

        <TouchableOpacity
          style={[styles.uploadButton, loading && styles.buttonDisabled]}
          onPress={pickProfilePic}
          disabled={loading}
        >
          <Text style={styles.uploadButtonText}>
            {profilePicName ? '✓ Profile Picture Selected' : '📷 Select Profile Picture'}
          </Text>
        </TouchableOpacity>
        {profilePicName && (
          <Text style={styles.selectedFileText}>{profilePicName}</Text>
        )}

        <TouchableOpacity
          style={[styles.uploadButton, loading && styles.buttonDisabled]}
          onPress={pickAadharCardFile}
          disabled={loading}
        >
          <Text style={styles.uploadButtonText}>
            {aadharCardFileName ? '✓ Aadhar Card Selected' : '📄 Select Aadhar Card (PDF/Image)'}
          </Text>
        </TouchableOpacity>
        {aadharCardFileName && (
          <Text style={styles.selectedFileText}>{aadharCardFileName}</Text>
        )}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.registerButton, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 40,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    paddingLeft: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#007AFF',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fff',
    marginTop: -8,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemActive: {
    backgroundColor: '#e8f4ff',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  dropdownItemTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF9500',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  uploadButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#E8F4FF',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  selectedFileText: {
    fontSize: 12,
    color: '#34C759',
    marginBottom: 12,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});
