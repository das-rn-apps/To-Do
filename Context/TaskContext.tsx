// TaskContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from '@/utils/types';
import { readTasksFromFile } from '@/utils/fileSystemUtils';

type TaskContextType = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from the file system on app load
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const loadedTasks = await readTasksFromFile();
                setTasks(loadedTasks);
            } catch (error) {
                console.error("Failed to load tasks:", error);
            }
        };

        loadTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }
        }>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
