import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from '@/types';
import {
    initializeDatabase,
    fetchTasks,
    addTaskToDB,
    updateTaskCompletion,
    deleteTaskFromDB,
    updateTaskText,
    archiveTaskInDB
} from '@/utils/database';

type TaskContextType = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (taskText: string) => void;
    toggleTaskCompletion: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
    archiveTask: (taskId: string) => void;
    editTask: (taskId: string, text: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Initialize database and load tasks
    useEffect(() => {
        const loadTasks = async () => {
            try {
                initializeDatabase(); // Ensure DB table exists
                fetchTasks((loadedTasks) => setTasks(loadedTasks)); // Load tasks from DB
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        };

        loadTasks();
    }, []);

    const addTask = async (taskText: string): Promise<void> => {
        if (taskText.trim()) {
            const currentDate = new Date().toISOString(); // Get current date in ISO format
            const newTask: Task = {
                id: Date.now().toString(),
                text: taskText,
                completed: false,
                pending: true,
                archived: false,
                createdDate: currentDate, // Set createdDate
                updatedDate: currentDate, // Set updatedDate as well
            };
            try {
                await addTaskToDB(newTask, () => {
                    fetchTasks((updatedTasks) => setTasks(updatedTasks)); // Refresh tasks
                });
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    };

    const toggleTaskCompletion = async (taskId: string): Promise<void> => {
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
            const currentDate = new Date().toISOString();
            try {
                await updateTaskCompletion(taskId, !task.completed, !task.pending, currentDate, () => {
                    fetchTasks((updatedTasks) => setTasks(updatedTasks));
                });
            } catch (error) {
                console.error('Failed to toggle task completion:', error);
            }
        }
    };

    const deleteTask = async (taskId: string): Promise<void> => {
        try {
            await deleteTaskFromDB(taskId, () => {
                fetchTasks((updatedTasks) => setTasks(updatedTasks)); // Refresh tasks
            });
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };
    const archiveTask = async (taskId: string): Promise<void> => {
        try {
            await archiveTaskInDB(taskId, () => {
                fetchTasks((updatedTasks) => setTasks(updatedTasks)); // Refresh tasks
            });
        } catch (error) {
            console.error('Failed to archive task:', error);
        }
    };

    // Edit Task
    const editTask = async (taskId: string, newText: string): Promise<void> => {
        const task = tasks.find((t) => t.id === taskId);
        if (task && newText.trim()) {
            const currentDate = new Date().toISOString();
            try {
                await updateTaskText(taskId, newText, currentDate, () => {
                    fetchTasks((updatedTasks) => setTasks(updatedTasks)); // Refresh tasks
                });
            } catch (error) {
                console.error('Failed to edit task:', error);
            }
        }
    };

    return (
        <TaskContext.Provider
            value={{ tasks, setTasks, addTask, toggleTaskCompletion, deleteTask, archiveTask, editTask }}
        >
            {children}
        </TaskContext.Provider>
    );

};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
