import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import TaskSectionList from '@/components/TaskSectionList';
import { Colors } from '@/constants/Colors';
import AddTaskButton from '@/components/AddTaskButton';
import FilterComponent from '@/components/FilterComponent';
import filterTasks from '@/utils/filter/filter';
import { Task, TaskFilter } from '@/types';

const TodoApp = () => {
    const { tasks } = useTaskContext();
    const [filters, setfilters] = useState<TaskFilter>()

    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

    useEffect(() => {
        const result = filterTasks(tasks, filters || {});
        setFilteredTasks(result);
    }, [tasks, filters]);


    return (
        <View style={styles.container}>
            {/* <CurrentDate /> */}
            <FilterComponent onFilter={(filterResult) => setfilters(filterResult)} />
            <TaskSectionList tasks={filteredTasks} />
            <AddTaskButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.background,
    },
});

export default TodoApp;
