import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

const Dashboard = () => {
    const { tasks } = useTaskContext();

    const taskCounts = {
        pending: tasks.filter((task) => !task.completed && !task.archived).length,
        completed: tasks.filter((task) => task.completed && !task.archived).length,
        inProgress: tasks.filter((task) => task.inProgress && !task.archived).length,
        archived: tasks.filter((task) => task.archived).length,
    };

    const taskTypes = [
        { title: 'Pending Tasks', count: taskCounts.pending, color: Colors.warningYellow, status: 'Pending' },
        { title: 'Completed Tasks', count: taskCounts.completed, color: Colors.successGreen, status: 'Completed' },
        { title: 'In Progress', count: taskCounts.inProgress, color: Colors.instagramLightPurple, status: 'In Progress' },
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

            <View style={styles.cardContainer}>
                {taskTypes.map((taskType, index) => (
                    <Pressable
                        key={index}
                        style={[styles.card, { backgroundColor: taskType.color }]}
                        onPress={() => router.push({ pathname: '/dashboard/taskCRUD', params: { status: taskType.status } })}
                    >
                        <Text style={styles.cardTitle}>{taskType.title}</Text>
                        <Text style={styles.cardCount}>{taskType.count}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
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
    cardContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    card: {
        flexBasis: '48%',
        marginBottom: 20,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.text,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    cardCount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.facebookDarkBlue,
    },
});

export default Dashboard;
