import { Priority, TaskStatus } from '@/types';
import * as SQLite from 'expo-sqlite';

// Open database synchronously
const db = SQLite.openDatabaseSync('das1.db');

// Initialize the database and create the table if it doesn't exist
export const initializeDatabase = () => {
    db.execAsync(`
        CREATE TABLE IF NOT EXISTS task (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT CHECK(status IN ('pending', 'completed', 'archived')) DEFAULT 'pending',
            priority TEXT CHECK(priority IN ('low', 'medium', 'high','urgent')) DEFAULT 'medium',
            subtask_of TEXT,
            createdDate TEXT NOT NULL,
            updatedDate TEXT NOT NULL,
            FOREIGN KEY(subtask_of) REFERENCES task(id)
        );
    `);
};

// Fetch all tasks
export const fetchTasks = async (callback: (tasks: any[]) => void) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM task ORDER BY createdDate DESC;');
        callback(result);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Add a new task
export const addTaskToDB = async (
    task: {
        id: string;
        title: string;
        description?: string;
        status: TaskStatus;
        priority: Priority;
        subtask_of?: string;
    },
    callback: () => void
) => {
    const currentDate = new Date().toISOString();
    try {
        await db.runAsync(
            `INSERT INTO task 
                (id, title, description, status, priority, subtask_of, createdDate, updatedDate) 
             VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                task.id,
                task.title,
                task.description || null,
                task.status,
                task.priority,
                task.subtask_of || null,
                currentDate,
                currentDate,
            ]
        );
        callback();

    } catch (error) {
        console.error('Error adding task:', error);
    }
};


// Delete a task
export const deleteTaskFromDB = async (id: string, callback: () => void) => {
    try {
        await db.runAsync('DELETE FROM task WHERE id = ?;', [id]);
        callback();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

// Update task title and description
export const updateTaskDetailsInDB = async (
    id: string,
    newTitle: string,
    newDescription: string,
    priority: Priority,
    status: TaskStatus,
    updatedDate: string,
    callback: () => void
) => {
    try {
        await db.runAsync(
            'UPDATE task SET title = ?, description = ?, updatedDate = ?,priority=?,status=? WHERE id = ?;',
            [newTitle, newDescription, updatedDate, priority, status, id]
        );
        callback();
    } catch (error) {
        console.error('Error updating task details:', error);
    }
};

