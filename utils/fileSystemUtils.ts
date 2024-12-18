import * as FileSystem from 'expo-file-system';
import { Task } from './types';

const fileUri = FileSystem.documentDirectory + 'todos.json';

export const readTasksFromFile = async (): Promise<Task[]> => {
    try {
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        return fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
        console.log('Error reading tasks from file:', error);
        return [];
    }
};

export const writeTasksToFile = async (tasks: Task[]): Promise<void> => {
    try {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(tasks), {
            encoding: FileSystem.EncodingType.UTF8,
        });
    } catch (error) {
        console.log('Error writing tasks to file:', error);
    }
};
