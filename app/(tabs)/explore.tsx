import React from 'react';
import { StyleSheet, Text, FlatList, View, Image } from 'react-native';
import { useTaskContext } from '@/Context/TaskContext';
import TaskItem from '@/components/TaskItem';
import { Colors } from '@/constants/Colors';

const Explore = () => {
  const { tasks } = useTaskContext(); // Access tasks from context

  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your image URL
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileSubtitle}>Welcome back!</Text>
        </View>
      </View>

      {/* Task Count Cards */}
      <View style={styles.cardContainer}>
        <View style={[styles.card, styles.pendingCard]}>
          <Text style={styles.cardTitle}>Pending Tasks</Text>
          <Text style={styles.cardCount}>{pendingCount}</Text>
        </View>
        <View style={[styles.card, styles.completedCard]}>
          <Text style={styles.cardTitle}>Completed Tasks</Text>
          <Text style={styles.cardCount}>{completedCount}</Text>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleCompletion={() => console.log("Toggled completion for:", item.id)}
            onDelete={() => console.log("Deleted task:", item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: 'flex-start',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: Colors.primaryButtonColor,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileSubtitle: {
    fontSize: 16,
    color: Colors.icon,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.text,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  pendingCard: {
    backgroundColor: Colors.warningYellow,
  },
  completedCard: {
    backgroundColor: Colors.successGreen,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  cardCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Explore;
