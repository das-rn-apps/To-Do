import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import PerformanceGraph from '@/components/PerformanceGraph';

const Dashboard = () => {
    const { tasks } = useTaskContext();

    const taskCounts = {
        pending: tasks.filter((task) => task.status == "pending").length,
        completed: tasks.filter((task) => task.status == "completed").length,
        archived: tasks.filter((task) => task.status == "archived").length,
    };

    const taskTypes = [
        { title: 'Pending Tasks', count: taskCounts.pending, color: Colors.warningYellow, status: 'Pending' },
        { title: 'Completed Tasks', count: taskCounts.completed, color: Colors.successGreen, status: 'Completed' },
        { title: 'Archived Tasks', count: taskCounts.archived, color: Colors.facebookDarkGray, status: 'Archived' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileSubtitle}>Welcome back!</Text>
                </View>
            </View>

            <PerformanceGraph />

            <View>
                {taskTypes.map((taskType, index) => (
                    <Pressable
                        key={index}
                        style={styles.taskRow}
                        onPress={() => router.push({ pathname: '/performance/taskCRUD', params: { status: taskType.status } })}
                    >
                        <View style={[styles.taskColorIndicator, { backgroundColor: taskType.color }]} />
                        <Text style={styles.taskTitle}>{taskType.title}</Text>
                        <Text style={styles.taskCount}>{taskType.count}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.facebookLightGray,
        borderRadius: 10,
        padding: 15,
        shadowColor: Colors.text,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        borderWidth: 2,
        borderColor: Colors.primaryButtonColor,
    },
    profileName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.text,
    },
    profileSubtitle: {
        fontSize: 16,
        color: Colors.icon,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: Colors.facebookLightGray,
        shadowColor: Colors.text,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskColorIndicator: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginRight: 15,
    },
    taskTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
    taskCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.facebookDarkBlue,
    },
});

export default Dashboard;
