import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, View, Alert } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import TaskItem from '@/components/TaskItem';
import { Colors } from '@/constants/Colors';
import AddTaskModal from '@/components/AddTaskModal';
import { AddPostIcon } from '@/assets/icons/Icons';

const TodoApp = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, archiveTask, editTask } = useTaskContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddTask = (taskText: string): void => {
    if (!taskText.trim()) {
      Alert.alert('Error', 'Task cannot be empty.');
      return;
    }
    addTask(taskText);
  };

  const handleToggleCompletion = (id: string): void => {
    toggleTaskCompletion(id);
  };

  const handleDeleteTask = (id: string): void => {
    deleteTask(id);
  };
  const handleArchiveTask = (id: string): void => {
    archiveTask(id);
  };

  const handleEditTask = (id: string, newText: string): void => {
    editTask(id, newText);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <AddPostIcon color={Colors.facebookBlue} size={45} />
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleCompletion={handleToggleCompletion}
            onDelete={handleDeleteTask}
            onArchive={handleArchiveTask}
            onEdit={handleEditTask}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
      />

      <AddTaskModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1
  },
  taskList: {
    paddingVertical: 5,
  },
});

export default TodoApp;
