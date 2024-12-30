import React, { createContext, useState, useContext, useEffect } from 'react';
import { Priority, Task, TaskStatus } from '@/types';
import {
    initializeDatabase,
    fetchTasks,
    addTaskToDB,
    deleteTaskFromDB,
    updateTaskDetailsInDB,
} from '@/utils/database';

type TaskContextType = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
    editTask: (taskId: string, title: string, description: string, priority: Priority, status: TaskStatus) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                initializeDatabase();
                fetchTasks((loadedTasks) => setTasks(loadedTasks));

            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        };
        loadTasks();
    }, []);

    // Add Task
    const addTask = async (task: Task): Promise<void> => {
        if (task.title.trim()) {
            try {
                await addTaskToDB(task, () => {
                    fetchTasks((updatedTasks) => setTasks(updatedTasks));
                });
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    };


    // Delete Task
    const deleteTask = async (taskId: string): Promise<void> => {
        try {
            await deleteTaskFromDB(taskId, () => {
                fetchTasks((updatedTasks) => setTasks(updatedTasks));
            });
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    // Edit Task
    const editTask = async (
        taskId: string,
        title: string,
        description: string,
        priority: Priority,
        status: TaskStatus
    ): Promise<void> => {
        const task = tasks.find((t) => t.id === taskId);
        if (task && title.trim()) {
            const updatedDate = new Date().toISOString();
            try {
                await updateTaskDetailsInDB(taskId, title, description, priority, status, updatedDate, () => {
                    fetchTasks((updatedTasks) => setTasks(updatedTasks));
                });
            } catch (error) {
                console.error('Failed to edit task:', error);
            }
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                addTask,
                deleteTask,
                editTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// Custom Hook
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
