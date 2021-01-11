import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TextInput,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [name, setName] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
    } catch (error) {
      console.error(new Error('Storage data'));
    }
  };

  const loadData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      console.log(`almacenado: ${storedName}`);
    } catch (error) {
      console.error(new Error('Storage data'));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          onChangeText={(value) => setName(value)}
        />
        <Button
          title="Guardar"
          color="#333"
          style={styles.saveButton}
          onPress={() => saveData()}
        />
        <TouchableHighlight style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar nombre &times;</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 10,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
