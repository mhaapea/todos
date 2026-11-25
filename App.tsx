import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, TextInput} from 'react-native';
import React, { useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Row, RowProps } from './components/Row'

const storage_key = 'todo_items';

interface Todo {
  id: string;
  name: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(storage_key);
        if (json) setTodos(JSON.parse(json));
      } catch (e) {
        Error("Jotain meni pieleen");
      }
    })();
  }, [])

  useEffect (() => {
    AsyncStorage.setItem(storage_key, JSON.stringify(todos));
  }, [todos])

  const addTodo = () => {
    if (input.trim()) {
      setTodos(prev => [
        ...prev, { id: Date.now().toString(), name: input.trim()},
      ]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder='Add todo'>
      </TextInput>
      <Button title="Add" onPress={addTodo}></Button>
      <FlatList
      data={todos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.text}>
          <Text style={styles.text}>{item.name}</Text>
          <Button title="X" onPress={() => {
            setTodos(prev => prev.filter(i => i.id !== item.id));
          }}></Button>
        </View>
      )}>
      </FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    margin: 8
  },
  text: {
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 16,
  }
});
