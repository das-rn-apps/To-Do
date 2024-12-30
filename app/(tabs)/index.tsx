import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import { Colors } from '@/constants/Colors';
import CurrentDate from '@/components/CurrentDate';
import TaskSectionList from '@/components/TaskSectionList';
import AddTaskButton from '@/components/AddTaskButton';

const TodoApp = () => {
  const { tasks } = useTaskContext();

  const today = new Date().toISOString().split('T')[0];

  const todayTasks = tasks.filter(task => {
    const taskDate = task.createdDate.split('T')[0];
    return taskDate === today;
  });

  return (
    <View style={styles.container}>
      <CurrentDate />
      <TaskSectionList tasks={todayTasks} />
      <AddTaskButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
  }
});

export default TodoApp;
