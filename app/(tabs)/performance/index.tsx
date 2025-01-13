import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import PerformanceGraph from '@/components/PerformanceGraph';
import UpdateUserProfile from '@/components/UpdateUserProfile';
import { useUserContext } from '@/Context/UserContext';

const Dashboard = () => {
    const { tasks } = useTaskContext();
    const { user } = useUserContext();
    const taskCounts = {
        pending: tasks.filter((task) => task.status === "pending").length,
        completed: tasks.filter((task) => task.status === "completed").length,
        archived: tasks.filter((task) => task.status === "archived").length,
    };

    const taskTypes = [
        { title: 'Pending Tasks', count: taskCounts.pending, color: Colors.warningYellow, status: 'Pending' },
        { title: 'Completed Tasks', count: taskCounts.completed, color: Colors.successGreen, status: 'Completed' },
        { title: 'Archived Tasks', count: taskCounts.archived, color: Colors.facebookDarkGray, status: 'Archived' },
    ];

    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: user?.profile_picture || 'https://picsum.photos/100' }}
                    style={styles.profileImage}
                />
                <View style={styles.profileDetails}>
                    <Text style={styles.profileName}>{user?.name}</Text>
                    <Text style={styles.profileSubtitle}>{user?.email}</Text>
                </View>
                <UpdateUserProfile />
            </View>

            {/* Performance Graph */}
            <PerformanceGraph />

            {/* Task Types Section */}
            <View style={styles.taskTypesContainer}>
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
        borderRadius: 12,
        padding: 10,
        shadowColor: Colors.text,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginRight: 10,
    },
    profileDetails: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
    },
    profileSubtitle: {
        fontSize: 10,
        color: Colors.icon,
    },
    editProfileButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.facebookLightGray,
        padding: 10,
        borderRadius: 50,
        shadowColor: Colors.text,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskTypesContainer: {
        marginTop: 20,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: Colors.facebookLightGray,
        shadowColor: Colors.text,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskColorIndicator: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 15,
    },
    taskTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
    taskCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.facebookDarkBlue,
    },
});

export default Dashboard;
