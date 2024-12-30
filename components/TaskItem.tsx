import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Pressable } from 'react-native';
import { Priority, Task, TaskStatus } from '@/types';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import UpdatetaskModal from './UpdateTask';
import { getTime } from '@/utils/time';


interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isStatusChangeVisisble, setIsStatusChangeVisisble] = useState(false);

    const getPriorityInfo = (priority: string) => {
        switch (priority) {
            case 'low':
                return { icon: 'check-circle' as const, color: Colors.successGreen };
            case 'medium':
                return { icon: 'access-time' as const, color: Colors.facebookBlue };
            case 'high':
                return { icon: 'local-fire-department' as const, color: Colors.notificationRed };
            case 'urgent':
                return { icon: 'warning' as const, color: Colors.errorRed };
            default:
                return { icon: 'help' as const, color: Colors.icon };
        }
    };

    const { icon, color } = getPriorityInfo(task.priority);


    return (
        <View >
            <Pressable style={styles.container}
                onPress={() => { setIsModalVisible(true) }}
            >
                <View style={styles.topRow}>
                    <View style={styles.taskTextContainer}>

                        <Text style={styles.taskTitle}>{task.title}</Text>
                        {task.description && <Text style={styles.taskDescription}>{task.description.slice(0, 40)}{(task.description.length > 41) && "..."}</Text>}
                    </View>
                    <View style={{ marginTop: -20 }}>
                        <MaterialIcons
                            name={icon}
                            size={24}
                            color={color}
                        />
                    </View>
                </View>

                <View style={styles.datesContainer}>
                    <View style={styles.dateRow}>
                        <MaterialIcons name="date-range" size={16} color={Colors.icon} />
                        <Text style={styles.dateText}>{getTime(task.createdDate)}</Text>
                    </View>
                    <View style={styles.dateRow}>
                        <MaterialIcons name="update" size={16} color={Colors.successGreen} />
                        <Text style={styles.dateText}>{getTime(task.updatedDate)}</Text>
                    </View>
                </View>
                <UpdatetaskModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    currentTask={task} />
            </Pressable>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    iconContainer: {
        padding: 8, // Space around the icon
        borderRadius: 12, // Rounded corners
        alignItems: 'center', // Center the icon
        justifyContent: 'center', // Center the icon vertically
    },
    container: {
        backgroundColor: Colors.card,
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
    taskTitle: {
        fontSize: 15,
        color: Colors.facebookBlue,
        fontWeight: '500',
    },
    taskDescription: {
        fontSize: 12,
        color: Colors.instagramLightPurple,
        marginTop: 4,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: Colors.successGreen,
    },
    statusIcon: {
        padding: 5,
    },

    datesContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 10
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
