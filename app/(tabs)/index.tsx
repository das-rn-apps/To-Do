import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { Task } from '@/utils/types';
import TaskItem from '@/components/TaskItem';
import { readTasksFromFile, writeTasksToFile } from '@/utils/fileSystemUtils';
import { Colors } from '@/constants/Colors';

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = (): void => {
    if (newTask.trim()) {
      const newTaskObj: Task = { id: Date.now().toString(), text: newTask, completed: false };
      const updatedTasks = [...tasks, newTaskObj];
      setTasks(updatedTasks);
      writeTasksToFile(updatedTasks);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id: string): void => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    writeTasksToFile(updatedTasks);
  };

  const deleteTask = (id: string): void => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    writeTasksToFile(updatedTasks);
  };

  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await readTasksFromFile();
      setTasks(loadedTasks);
    };

    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleCompletion={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background, // Light background from custom colors
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 36,
    fontWeight: '600',
    color: Colors.text, // Dark text from custom colors
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: Colors.primaryButtonColor, // Primary button blue for input border
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButton: {
    backgroundColor: Colors.primaryButtonColor, // Blue for Add button
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.facebookLightGray, // Light gray background for tasks
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    color: Colors.text, // Dark text color
    flex: 1,
  },
  taskCompletedText: {
    textDecorationLine: 'line-through',
    color: Colors.facebookDarkBlue, // Gray color for completed tasks
  },
  deleteButton: {
    color: Colors.errorRed, // Red for delete button
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoApp;
