import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import { initializeUserDatabase, fetchUser, addUserToDB, updateUserInDB, } from '@/utils/userDB';

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    addUser: (newUser: User) => Promise<void>;
    updateUser: (user: User) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                initializeUserDatabase();
                await fetchUser((loadedUser) => {
                    if (loadedUser) {
                        setUser(loadedUser);
                    }
                });
            } catch (error) {
                console.error('Failed to load user:', error);
            }
        };

        loadUser();
    }, []);

    // Add User
    const addUser = async (newUser: User): Promise<void> => {
        try {
            await addUserToDB(newUser, () => { setUser(newUser) });
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    // Update User
    const updateUser = async (user: User): Promise<void> => {
        if (user) {
            try {
                await updateUserInDB(user, () => {
                    setUser(user);
                });
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        } else {
            console.error('No user available to update.');
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                addUser,
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
