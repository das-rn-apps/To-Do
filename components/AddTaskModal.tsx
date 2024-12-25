import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    TextInput,
    ScrollView,
    StatusBar,
    TouchableHighlight,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface AddTaskModalProps {
    isVisible: boolean;
    onClose: () => void;
    onAddTask: (task: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
    isVisible,
    onClose,
    onAddTask,
}) => {
    const [task, setTask] = useState<string>('');
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
                duration: 600,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    const handleAddTask = () => {
        if (task.trim()) {
            onAddTask(task); // Call the parent callback to add the task
            setTask(''); // Reset the input field
            onClose(); // Close the modal
        }
    };

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <View style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}>
                    <TouchableOpacity style={styles.cancelIcon} onPress={onClose}>
                        <Ionicons name="close-circle" size={28} color={Colors.text} />
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={styles.scrollViewContent}>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter task description"
                            value={task}
                            onChangeText={setTask}
                            autoFocus
                            multiline
                            placeholderTextColor={Colors.text}
                        />

                        <TouchableHighlight
                            style={styles.addButton}
                            onPress={handleAddTask}
                            underlayColor={Colors.primaryButtonColor}
                        >
                            <Text style={styles.addButtonText}>Add Task</Text>
                        </TouchableHighlight>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        width: '95%',
    },
    modalContent: {
        width: '98%',
        marginTop: -20,
        backgroundColor: Colors.facebookLightGray,
        borderRadius: 20,
        padding: 20,
        shadowColor: Colors.facebookDarkBlue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
        height: '80%',
        position: 'relative',
    },
    cancelIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.instagramGradientEnd,
        marginTop: 10,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 350,
        borderColor: Colors.text,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 25,
        paddingLeft: 15,
        paddingTop: 10,
        fontSize: 16,
        backgroundColor: Colors.background,
        textAlignVertical: 'top',
    },
    addButton: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: Colors.primaryButtonColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 3,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
});

export default AddTaskModal;
