import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from '@/types';
import { readTasksFromFile, writeTasksToFile } from '@/utils/fileSystemUtils';

type TaskContextType = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (taskText: string) => void;
    toggleTaskCompletion: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const loadedTasks = await readTasksFromFile();
                setTasks(loadedTasks);
            } catch (error) {
                console.error('Failed to load tasks:', error);
            }
        };

        loadTasks();
    }, []);

    const addTask = (taskText: string): void => {
        if (taskText.trim()) {
            const newTask: Task = {
                id: Date.now().toString(), text: taskText, completed: false,
                inProgress: false,
                archived: false
            };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            writeTasksToFile(updatedTasks);
        }
    };

    const toggleTaskCompletion = (taskId: string): void => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        writeTasksToFile(updatedTasks);
    };

    const deleteTask = (taskId: string): void => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        writeTasksToFile(updatedTasks);
    };

    return (
        <TaskContext.Provider
            value={{ tasks, setTasks, addTask, toggleTaskCompletion, deleteTask }}
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
