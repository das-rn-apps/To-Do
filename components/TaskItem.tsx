import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Task } from '@/types';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

interface TaskItemProps {
    task: Task;
    onToggleCompletion: (id: string) => void;
    onDelete: (id: string) => void;
    onArchive: (id: string) => void;
    onEdit: (id: string, text: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onToggleCompletion,
    onDelete,
    onArchive,
    onEdit,
}) => {
    const [showActions, setShowActions] = useState(false);
    const formattedCreatedDate = moment(task.createdDate).fromNow();
    const formattedUpdatedDate = moment(task.updatedDate).fromNow();

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity
                    style={styles.taskTextContainer}
                    onPress={() => onToggleCompletion(task.id)}
                >
                    <Text style={[styles.taskText, task.completed && styles.completedText]}>
                        {task.text}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.completionCircle}
                    onPress={() => onToggleCompletion(task.id)}
                >
                    <MaterialIcons
                        name={task.completed ? 'check-circle' : 'radio-button-unchecked'}
                        size={24}
                        color={task.completed ? Colors.successGreen : Colors.icon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.datesContainer}>
                    <Text style={styles.dateText}>Open since: {formattedCreatedDate}</Text>
                    <Text style={styles.dateText}>Last Updated: {formattedUpdatedDate}</Text>
                </View>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setShowActions(!showActions)}
                >
                    <MaterialIcons name="more-horiz" size={24} color={Colors.icon} />
                </TouchableOpacity>
                {showActions && (
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity onPress={() => onEdit(task.id, "Hurrrrrrrrrrrrray")} style={styles.actionIcon}>
                            <MaterialIcons name="edit" size={20} color={Colors.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onArchive(task.id)} style={styles.actionIcon}>
                            <MaterialIcons name="archive" size={20} color={Colors.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.actionIcon}>
                            <MaterialIcons name="delete" size={20} color={Colors.icon} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: Colors.facebookBlue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskTextContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 15,
        color: Colors.facebookBlue,
        fontWeight: '400',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: Colors.successGreen,
    },
    completionCircle: {
        padding: 5,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    datesContainer: {
        flex: 1,
    },
    dateText: {
        fontSize: 10,
        color: Colors.icon,
    },
    actionButton: {
        padding: 5,
    },
    actionsContainer: {
        position: 'absolute',
        top: -55,
        right: 40,
        shadowColor: Colors.facebookDarkBlue,
        padding: 5,
    },
    actionIcon: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default TaskItem;
