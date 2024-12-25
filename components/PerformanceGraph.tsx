import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Colors } from '@/constants/Colors';
import { useTaskContext } from '@/Context/TaskContext';

const PerformanceGraph = () => {
    const { tasks } = useTaskContext();
    const completedCount = tasks.filter((task) => task.completed).length;
    const pendingCount = tasks.filter((task) => task.pending).length;
    const archivedCount = tasks.filter((task) => task.archived).length;

    const chartData = {
        labels: ['Pending', 'Completed', 'Archived'],
        datasets: [
            {
                data: [pendingCount, completedCount, archivedCount],
            },
        ],
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Performance</Text>
            <BarChart
                data={chartData}
                width={Dimensions.get('window').width - 50} // Subtract padding
                height={200}
                yAxisLabel="" // Optional: Add a label if required, e.g., "Tasks "
                yAxisSuffix="" // <-- Fix added here (even a space satisfies the requirement)
                chartConfig={{
                    backgroundColor: Colors.facebookLightGray,
                    backgroundGradientFrom: Colors.facebookLightGray,
                    backgroundGradientTo: Colors.facebookLightGray,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(24, 119, 242, ${opacity})`,
                    labelColor: () => Colors.text,
                    barPercentage: 0.6,
                }}
                style={styles.chartStyle}
                fromZero
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        borderRadius: 10,
        backgroundColor: Colors.facebookLightGray,
        padding: 10,
        shadowColor: Colors.text,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: Colors.text,
    },
    chartStyle: {
        borderRadius: 10,
    },
});

export default PerformanceGraph;
