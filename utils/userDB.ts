import { Gender, Priority, TaskStatus, User } from '@/types';
import * as SQLite from 'expo-sqlite';

const userDB = SQLite.openDatabaseSync('user1.db');

export const initializeUserDatabase = () => {
    userDB.execAsync(`
        CREATE TABLE IF NOT EXISTS user (
            id TEXT PRIMARY KEY,                -- Unique identifier for the user
            name TEXT NOT NULL,                 -- Full name
            email TEXT NOT NULL UNIQUE,         -- Email address
            phone_number TEXT UNIQUE,           -- Phone number
            profile_picture TEXT,               -- URL or path to profile picture
            bio TEXT,                           -- User bio or description
            gender TEXT CHECK(gender IN ('male', 'female', 'other')), -- Gender
            location TEXT,                      -- Location or address
            account_created_at TEXT NOT NULL,   -- Account creation date
            last_login TEXT,                    -- Last login timestamp
            session_activity TEXT               -- Session activity metadata (e.g., JSON)
        );
    `);
};


export const addUserToDB = async (user: User, callback: () => void) => {
    try {
        await userDB.runAsync(
            `INSERT INTO user 
                (id, name, email, phone_number, profile_picture, bio, gender, location, account_created_at, last_login, session_activity)
             VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                user.id,
                user.name,
                user.email,
                user.phone_number || null,
                user.profile_picture || null,
                user.bio || null,
                user.gender || null,
                user.location || null,
                user.account_created_at,
                user.last_login || null,
                user.session_activity || null,
            ]
        );
        const result: User[] = await userDB.getAllAsync('SELECT * FROM user ORDER BY account_created_at DESC;');
        callback();
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

// Fetch all users
export const fetchUser = async (callback: (users: User) => void) => {
    try {
        const result: User[] = await userDB.getAllAsync('SELECT * FROM user ORDER BY account_created_at DESC;');
        callback(result[0]);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Update user information
export const updateUserInDB = async (
    user: User,
    callback: () => void
) => {
    try {
        const updatedFields: Partial<{
            name: string;
            email: string;
            phone_number: string;
            profile_picture: string;
            bio: string;
            gender: Gender;
            location: string;
            last_login: string;
            session_activity: string;
        }> = {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            profile_picture: user.profile_picture,
            bio: user.bio,
            gender: user.gender,
            location: user.location,
            last_login: new Date().toISOString(),
            session_activity: 'User updated their profile', // Example session activity
        };

        const fields = Object.entries(updatedFields)
            .map(([key, value]) => `${key} = ?`)
            .join(', ');

        const values = Object.values(updatedFields);
        values.push(user.id);

        await userDB.runAsync(
            `UPDATE user SET ${fields} WHERE id = ?;`,
            values
        );
        callback();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};


// Delete a user
export const deleteUserFromDB = async (id: string, callback: () => void) => {
    try {
        await userDB.runAsync('DELETE FROM user WHERE id = ?;', [id]);
        callback();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};