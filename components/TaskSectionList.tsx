import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import TaskItem from '@/components/TaskItem';
import { Colors } from '@/constants/Colors';
import { Task } from '@/types';

interface TaskSectionListProps {
    tasks: Task[];
}

const TaskSectionList: React.FC<TaskSectionListProps> = ({ tasks }) => {
    const sections = [
        { title: 'Pending Tasks', data: tasks.filter(task => task.status === 'pending') },
        { title: 'Completed Tasks', data: tasks.filter(task => task.status === 'completed') },
        { title: 'Archived Tasks', data: tasks.filter(task => task.status === 'archived') },
    ];

    const renderSection = ({ item }: { item: { title: string; data: Task[] } }) =>
        item.data.length ? (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{item.title} ({item.data.length})</Text>
                <FlatList
                    data={item.data}
                    renderItem={({ item }) => <TaskItem task={item} />}
                    keyExtractor={(task) => task.id}
                />
            </View>
        ) : null;

    return (
        <FlatList
            data={sections}
            renderItem={renderSection}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    scrollContainer: { paddingBottom: 20 },
    section: { marginBottom: 10 },
    sectionTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.instagramLightPurple, textAlign: 'center' },
});

export default TaskSectionList;
