import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Priority, Task, TaskStatus } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { useTaskContext } from '@/Context/TaskContext';

interface AddTaskModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isVisible, onClose }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState<Priority>(Priority.Low);
    const [subtaskOf, setSubtaskOf] = useState<string | undefined>('');
    const { tasks, addTask } = useTaskContext();
    const translateY = useRef(new Animated.Value(-Dimensions.get('window').height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: isVisible ? 0 : -Dimensions.get('window').height,
            duration: isVisible ? 700 : 600,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    const handleAddTask = () => {
        if (!taskTitle.trim()) return Alert.alert('Error', 'Task title cannot be empty.');
        const newTask: Task = { id: Date.now().toString(), title: taskTitle, description: taskDescription, status: TaskStatus.Pending, priority: taskPriority, subtask_of: subtaskOf || undefined, createdDate: new Date().toISOString(), updatedDate: new Date().toISOString() };
        addTask(newTask);
        setTaskTitle(''); setTaskDescription(''); setTaskPriority(Priority.Low); setSubtaskOf('');
        onClose();
    };

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Text style={styles.label}>Task Title</Text>
                        <TextInput style={styles.input} placeholder="Enter task title" value={taskTitle} onChangeText={setTaskTitle} placeholderTextColor={Colors.text} />
                        <Text style={styles.label}>Description</Text>
                        <TextInput style={[styles.input, styles.textArea]} placeholder="Enter task description" value={taskDescription} onChangeText={setTaskDescription} multiline placeholderTextColor={Colors.text} />
                        <Text style={styles.label}>Priority</Text>
                        <View style={styles.priorityContainer}>
                            {Object.values(Priority).map(priority => (
                                <TouchableOpacity key={priority} style={[styles.priorityButton, taskPriority === priority && styles.prioritySelected]} onPress={() => setTaskPriority(priority)}>
                                    <Text style={[styles.priorityText, taskPriority === priority && styles.priorityTextSelected]}>{priority.toUpperCase()}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.label}>Subtask of</Text>
                        <Picker selectedValue={subtaskOf} onValueChange={setSubtaskOf} style={styles.picker}>
                            <Picker.Item label="Select Parent Task" value={subtaskOf} />
                            {tasks.map(task => <Picker.Item key={task.id} label={`${task.title} - ${task.description?.slice(0, 27)}...`} value={task.id} />)}
                        </Picker>
                        <TouchableHighlight style={styles.addButton} onPress={handleAddTask} underlayColor={Colors.primaryButtonColor}>
                            <Text style={styles.addButtonText}>Add Task</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.closeModalButton} onPress={onClose} underlayColor={Colors.primaryButtonColor}>
                            <Text style={styles.addButtonText}>Close</Text>
                        </TouchableHighlight>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '90%', borderRadius: 20, padding: 20, backgroundColor: Colors.background, elevation: 15 },
    scrollViewContent: { paddingBottom: 20 },
    label: { fontSize: 10, fontWeight: 'bold', marginVertical: 5, color: Colors.instagramLightPurple },
    input: { backgroundColor: Colors.facebookLightGray, borderRadius: 10, padding: 12, fontSize: 14, marginBottom: 10 },
    textArea: { height: 100 },
    priorityContainer: { flexDirection: 'row', marginVertical: 10 },
    priorityButton: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 20, borderWidth: 0.7, marginRight: 5, borderColor: Colors.facebookBlue },
    prioritySelected: { backgroundColor: Colors.primaryButtonColor },
    priorityText: { color: Colors.facebookBlue },
    priorityTextSelected: { color: Colors.facebookLightGray },
    picker: { height: 50, backgroundColor: Colors.facebookLightGray, borderRadius: 10 },
    addButton: { paddingVertical: 15, borderRadius: 10, backgroundColor: Colors.primaryButtonColor, marginTop: 20 },
    closeModalButton: { paddingVertical: 13, backgroundColor: Colors.facebookDarkGray, borderRadius: 10, marginTop: 10, alignItems: 'center' },
    addButtonText: { textAlign: 'center', fontSize: 16, fontWeight: '600', color: Colors.facebookLightGray },
});

export default AddTaskModal;
