import * as SQLite from 'expo-sqlite';

// Open database synchronously
const db = SQLite.openDatabaseSync('task.db');

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
  `);
};

// Fetch all tasks
export const fetchTasks = async (callback: (tasks: any[]) => void) => {
    try {
        const result = await db.getAllAsync('SELECT * FROM tasks ORDER BY createdDate DESC;');
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
    const currentDate = new Date().toISOString();
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

export const updateTaskCompletion = async (
    id: string,
    completed: boolean,
    pending: boolean,
    updatedDate: string,
    callback: () => void
) => {
    try {
        const newPendingStatus = completed ? false : pending;
        const newCompletedStatus = pending ? false : completed;

        await db.runAsync(
            'UPDATE tasks SET completed = ?, pending = ?, updatedDate = ? WHERE id = ?;',
            [newCompletedStatus, newPendingStatus, updatedDate, id]
        );
        callback(); // Refresh the tasks
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

// Update task text
export const updateTaskText = async (
    id: string,
    newText: string,
    updatedDate: string,
    callback: () => void
) => {
    try {
        await db.runAsync(
            'UPDATE tasks SET text = ?, updatedDate = ? WHERE id = ?;',
            [newText, updatedDate, id]
        );
        callback(); // Refresh the tasks
    } catch (error) {
        console.error('Error updating task text:', error);
    }
};

// Archive a task
export const archiveTaskInDB = async (id: string, callback: () => void) => {
    try {
        // Fetch task to check if it is archived
        const result = db.getAllSync('SELECT archived FROM tasks WHERE id = ?;', [id]);
        const task = result?.[0] as { archived: boolean };  // Explicitly type the task object

        if (task && task.archived) {
            // If task is archived, unarchive it and set pending to true
            await db.runAsync(
                'UPDATE tasks SET archived = ?, pending = ? WHERE id = ?;',
                [false, true, id]
            );
        } else {
            // If task is not archived, archive it and set completed and pending to false
            await db.runAsync(
                'UPDATE tasks SET archived = ?, completed = ?, pending = ? WHERE id = ?;',
                [true, false, false, id]
            );
        }

        callback();
    } catch (error) {
        console.error('Error archiving task:', error);
    }
};


