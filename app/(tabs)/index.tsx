import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View, Alert } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import TaskItem from '@/components/TaskItem';
import { Colors } from '@/constants/Colors';

const TodoApp = () => {
  const { tasks, setTasks } = useTaskContext();
  const [newTask, setNewTask] = useState<string>('');

  const addTask = (): void => {
    if (!newTask.trim()) {
      Alert.alert('Error', 'Task cannot be empty.');
      return;
    }
    const newTaskObj = { id: Date.now().toString(), text: newTask, completed: false, inProgress: true, archived: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id: string): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: string): void => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor={Colors.facebookDarkGray}
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleCompletion={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: Colors.primaryButtonColor,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButton: {
    backgroundColor: Colors.primaryButtonColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  taskList: {
    paddingVertical: 5,
  },
});

export default TodoApp;
