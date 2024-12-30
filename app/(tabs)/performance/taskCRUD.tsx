import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useTaskContext } from '@/Context/TaskContext';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

const TaskCRUD = () => {
    const { tasks } = useTaskContext();
    const { status } = useLocalSearchParams();

    const filteredTasks = tasks.filter((task) => {
        switch (status) {
            case 'Pending':
                return task.status === 'pending';
            case 'Completed':
                return task.status === 'completed';
            case 'Archived':
                return task.status === 'archived';
            default:
                return true;
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{status} Tasks</Text>

            {filteredTasks.length > 0 ? (
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={[styles.tableRow, styles.headerRow]}>
                            <Text style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>
                                S.No.
                            </Text>
                            <Text style={[styles.tableCell, styles.headerCell, { flex: 2 }]}>
                                Title
                            </Text>
                            <Text style={[styles.tableCell, styles.headerCell, { flex: 3 }]}>
                                Description
                            </Text>
                        </View>

                        {/* Table Rows */}
                        {filteredTasks.map((task, index) => (
                            <View
                                key={task.id}
                                style={[
                                    styles.tableRow,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                ]}
                            >
                                <Text style={[styles.tableCell, { flex: 1 }]}>
                                    {index + 1}
                                </Text>
                                <Text style={[styles.tableCell, { flex: 2 }]}>
                                    {task.title}
                                </Text>
                                <Text style={[styles.tableCell, { flex: 3 }]}>
                                    {task.description || 'N/A'}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <Text style={styles.noTasksText}>
                    No tasks available for this status.
                </Text>
            )}
        </View>
    );
};

export default TaskCRUD;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.facebookLightGray,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.facebookDarkBlue,
        textAlign: 'center',
    },
    scrollContainer: {
        marginTop: 10,
    },
    table: {
        borderRadius: 10,
        overflow: 'hidden',
        // borderWidth: 1,
        // borderColor: Colors.facebookBlue,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    headerRow: {
        backgroundColor: Colors.facebookBlue,
    },
    tableCell: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        color: Colors.instagramDarkGray,
        textAlign: 'left',
    },
    headerCell: {
        fontWeight: 'bold',
        color: Colors.facebookLightGray,
    },
    evenRow: {
        backgroundColor: Colors.facebookLightGray,
    },
    oddRow: {
        backgroundColor: Colors.instagramLightPurple,
    },
    noTasksText: {
        fontSize: 16,
        color: Colors.notificationRed,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '500',
    },
});
