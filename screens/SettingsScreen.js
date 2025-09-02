import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  const [currency, setCurrency] = useState('USD ($)');
  const [defaultCategory, setDefaultCategory] = useState('Food');
  const [darkTheme, setDarkTheme] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [pinProtection, setPinProtection] = useState('Off');

  const currencies = [
    'USD ($)',
    'EUR (€)',
    'GBP (£)',
    'JPY (¥)',
    'CAD ($)',
    'AUD ($)'
  ];

  const categories = [
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Healthcare',
    'Education',
    'Other'
  ];

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your expense data will be exported to a CSV file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your expense data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => console.log('Clearing all data...')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Currency Setting */}
      <View style={styles.settingGroup}>
        <Text style={styles.settingLabel}>Currency</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currency}
            onValueChange={setCurrency}
            style={styles.picker}
          >
            {currencies.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Default Category Setting */}
      <View style={styles.settingGroup}>
        <Text style={styles.settingLabel}>Default Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={defaultCategory}
            onValueChange={setDefaultCategory}
            style={styles.picker}
          >
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Dark Theme Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Theme</Text>
        <Switch
          value={darkTheme}
          onValueChange={setDarkTheme}
          trackColor={{ false: '#e0e0e0', true: '#2196F3' }}
          thumbColor={darkTheme ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      {/* Biometric Authentication Toggle */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Biometric Authentication</Text>
        <Switch
          value={biometricAuth}
          onValueChange={setBiometricAuth}
          trackColor={{ false: '#e0e0e0', true: '#2196F3' }}
          thumbColor={biometricAuth ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      {/* PIN Protection */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>PIN Protection</Text>
        <Text style={styles.settingValue}>{pinProtection}</Text>
      </View>

      {/* Export Data */}
      <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
        <Ionicons name="download-outline" size={20} color="#2196F3" />
        <Text style={styles.actionButtonText}>Export Data</Text>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      {/* Clear All Data */}
      <TouchableOpacity style={styles.actionButton} onPress={handleClearData}>
        <Ionicons name="trash-outline" size={20} color="#E53E3E" />
        <Text style={[styles.actionButtonText, { color: '#E53E3E' }]}>Clear All Data</Text>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  settingGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  settingRow: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  settingValue: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginLeft: 15,
  },
});
