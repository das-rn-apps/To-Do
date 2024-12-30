import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Priority, Task, TaskStatus } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { useTaskContext } from '@/Context/TaskContext';


interface UpdatetaskModalProps {
    isVisible: boolean;
    onClose: () => void;
    currentTask: Task;
}

const UpdatetaskModal: React.FC<UpdatetaskModalProps> = ({
    isVisible,
    onClose,
    currentTask,
}) => {
    const { tasks, editTask } = useTaskContext();

    const [taskTitle, setTaskTitle] = useState(currentTask?.title);
    const [taskStatus, setTaskStatus] = useState(currentTask?.status);
    const [taskDescription, setTaskDescription] = useState(currentTask?.description);
    const [taskPriority, setTaskPriority] = useState<Priority>(currentTask?.priority);
    const [subtaskOf, setSubtaskOf] = useState<string | undefined>(currentTask?.subtask_of);
    const translateY = useRef(new Animated.Value(-Dimensions.get('window').height)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: -Dimensions.get('window').height,
                duration: 700,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    const handleEditTask = () => {
        if (taskTitle.trim()) {
            const updatedTask: Task = {
                ...currentTask,
                title: taskTitle,
                description: taskDescription,
                priority: taskPriority,
                status: taskStatus,
                subtask_of: subtaskOf || undefined,
                updatedDate: new Date().toISOString(),
            };
            editTask(updatedTask.id, updatedTask.title, updatedTask.description || '', updatedTask.priority, updatedTask.status)
            onClose();
        }
    };

    return (
        <Modal transparent visible={isVisible} animationType="fade">
            <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {/* Title */}
                        <Text style={styles.label}>Task Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter task title"
                            value={taskTitle}
                            onChangeText={setTaskTitle}
                            placeholderTextColor={Colors.text}
                        />

                        {/* Description */}
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Enter task description"
                            value={taskDescription}
                            onChangeText={setTaskDescription}
                            multiline
                            placeholderTextColor={Colors.text}
                        />

                        {/* Priority */}
                        <Text style={styles.label}>Priority</Text>
                        <View style={styles.priorityContainer}>
                            {Object.values(Priority).map((priority) => (
                                <TouchableOpacity
                                    key={priority}
                                    style={[
                                        styles.priorityButton,
                                        taskPriority === priority && styles.prioritySelected,
                                    ]}
                                    onPress={() => setTaskPriority(priority)}
                                >
                                    <Text
                                        style={[
                                            styles.priorityText,
                                            taskPriority === priority && styles.priorityTextSelected,
                                        ]}
                                    >
                                        {priority.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Subtask */}
                        <Text style={styles.label}>Subtask of</Text>
                        <Picker
                            selectedValue={subtaskOf}
                            onValueChange={(value) => setSubtaskOf(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Parent Task" value={subtaskOf} />
                            {tasks.map((task) => (
                                <Picker.Item key={task.id} label={`${task.title} -  ${task.description?.slice(0, 27)}...`} value={task.id} />
                            ))}
                        </Picker>
                        <Text style={styles.label}>Status</Text>
                        <View style={styles.priorityContainer}>
                            {Object.values(TaskStatus).map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    style={[
                                        styles.priorityButton,
                                        taskStatus === status && styles.prioritySelected,
                                    ]}
                                    onPress={() => setTaskStatus(status)}
                                >
                                    <Text
                                        style={[
                                            styles.priorityText,
                                            taskStatus === status && styles.priorityTextSelected,
                                        ]}
                                    >
                                        {status.toUpperCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Update Button */}
                        <TouchableHighlight
                            style={styles.addButton}
                            onPress={handleEditTask}
                            underlayColor={Colors.secondaryButtonColor}
                        >
                            <Text style={styles.addButtonText}>Update Task</Text>
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
    addButtonText: { textAlign: 'center', fontSize: 16, fontWeight: '600', color: Colors.facebookLightGray },
    closeModalButton: { paddingVertical: 13, backgroundColor: Colors.facebookDarkGray, borderRadius: 10, marginTop: 10, alignItems: 'center' },

});

export default UpdatetaskModal;
