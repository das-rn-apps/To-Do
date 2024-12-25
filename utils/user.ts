import * as SQLite from 'expo-sqlite';

// Open database synchronously
const db = SQLite.openDatabaseSync('tasks2.db');

// Initialize the database and create the table if it doesn't exist
export const initializeDatabase = () => {
    db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN,
      pending BOOLEAN,
      archived BOOLEAN,
      createdDate TEXT NOT NULL,
      updatedDate TEXT NOT NULL
    );
      CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,  -- Consider hashing the password
      createdDate TEXT NOT NULL
    );
  `);
};

// Fetch all tasks
export const fetchTasks = async (callback: (tasks: any[]) => void) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM tasks;');
        callback(result);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

// Add a new task
export const addTaskToDB = async (
    task: { id: string; text: string; completed: boolean; pending: boolean; archived: boolean },
    callback: () => void
) => {
    const currentDate = new Date().toISOString();  // Get the current date in ISO format
    try {
        await db.runAsync(
            'INSERT INTO tasks (id, text, completed, pending, archived, createdDate, updatedDate) VALUES (?, ?, ?, ?, ?, ?, ?);',
            [task.id, task.text, task.completed, task.pending, task.archived, currentDate, currentDate]
        );
        callback();
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

// Update task completion with updatedDate
export const updateTaskCompletion = async (id: string, completed: boolean, pending: boolean, updatedDate: string, callback: () => void) => {
    try {
        await db.runAsync('UPDATE tasks SET completed = ?, pending = ?, updatedDate = ? WHERE id = ?;', [completed, pending, updatedDate, id]);
        callback();
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

// Delete a task
export const deleteTaskFromDB = async (id: string, callback: () => void) => {
    try {
        await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
        callback();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};



export const addUserToDB = async (
    user: { id: string; name: string; email: string; password: string },
    callback: () => void
) => {
    const currentDate = new Date().toISOString();
    try {
        await db.runAsync(
            'INSERT INTO users (id, name, email, password, createdDate) VALUES (?, ?, ?, ?, ?);',
            [user.id, user.name, user.email, user.password, currentDate]
        );
        callback();
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

// Fetch user by ID
export const fetchUserById = async (id: string, callback: (user: any) => void) => {
    try {
        const result = await db.getAllSync('SELECT * FROM users WHERE id = ?;', [id]);
        callback(result);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

// Update user details
export const updateUserDetails = async (
    id: string,
    name: string,
    email: string,
    password: string,
    callback: () => void
) => {
    try {
        await db.runAsync(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?;',
            [name, email, password, id]
        );
        callback();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

// Delete a user
export const deleteUserFromDB = async (id: string, callback: () => void) => {
    try {
        await db.runAsync('DELETE FROM users WHERE id = ?;', [id]);
        callback();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};