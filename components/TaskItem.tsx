// TaskItem.tsx
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Task } from '@/utils/types';
import { Colors } from '@/constants/Colors';

interface TaskItemProps {
    task: Task;
    onToggleCompletion: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleCompletion, onDelete }) => {
    return (
        <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => onToggleCompletion(task.id)} style={styles.toggleCompletion}>
                <Text
                    style={[
                        styles.taskText,
                        task.completed && styles.taskCompletedText,
                    ]}
                >
                    {task.text}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: Colors.background, // Light background color from palette
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        marginHorizontal: 15,
        overflow: 'hidden',
    },
    toggleCompletion: {
        flex: 1,
    },
    taskText: {
        fontSize: 18,
        color: Colors.text, // Dark text color for light theme
        fontFamily: 'Roboto-Bold',
        lineHeight: 24,
        textTransform: 'capitalize',
        letterSpacing: 0.5,
    },
    taskCompletedText: {
        textDecorationLine: 'line-through',
        color: Colors.icon, // Gray for completed task text
        // fontStyle: 'italic',
    },
    deleteButtonContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: Colors.facebookLightGray, // Light gray background for delete button
        borderRadius: 25,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: Colors.icon, // Dark gray border
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    deleteButton: {
        color: Colors.instagramGradientEnd, // Red color for delete button
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default TaskItem;
