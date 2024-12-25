import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTaskContext } from '@/Context/TaskContext';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

const TaskCRUD = () => {
    const { tasks } = useTaskContext();
    const { status } = useLocalSearchParams();

    // Filter tasks based on the status
    const filteredTasks = tasks.filter((task) => {
        if (status === 'Pending') return task.pending;
        if (status === 'Completed') return task.completed;
        if (status === 'Archived') return task.archived;
        return true;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{status} Tasks</Text>
            {filteredTasks.length > 0 ? (
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.headerCell]}>ID</Text>
                        <Text style={[styles.tableCell, styles.headerCell]}>Task</Text>
                    </View>
                    {filteredTasks.map((task) => (
                        <View key={task.id} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{task.id}</Text>
                            <Text style={styles.tableCell}>{task.text}</Text>
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.noTasksText}>No tasks available for this status.</Text>
            )}
        </View>
    );
};

export default TaskCRUD;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: Colors.instagramLogoColor,
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.facebookBlue,
    },
    tableCell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        fontSize: 14,
        color: Colors.instagramDarkGray,
    },
    headerCell: {
        fontWeight: 'bold',
        backgroundColor: Colors.facebookBlue,
        color: Colors.facebookLightGray,
    },
    noTasksText: {
        fontSize: 16,
        color: Colors.icon,
        textAlign: 'center',
        marginTop: 20,
    },
});
