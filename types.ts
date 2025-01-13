export interface Task {
    id: string;                         // Unique identifier for the task
    title: string;                      // Title of the task
    description?: string;               // Optional description for the task
    status: TaskStatus;                 // Status of the task
    priority: Priority;                 // Priority of the task (1 to 5)
    subtask_of?: string;                // Optional ID of the parent task (for subtasks)
    createdDate: string;                // ISO string for the created date
    updatedDate: string;                // ISO string for the updated date
}

export enum TaskStatus {
    Pending = 'pending',
    Completed = 'completed',
    Archived = 'archived',
}
export enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
    Urgent = 'urgent',
}

export interface TaskFilter {
    status?: TaskStatus;
    priority?: Priority;
    startDate?: string;
    endDate?: string;
    text?: string;
    date?: string;
}
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
export interface User {
    id: string;                       // Unique identifier for the user
    name: string;                     // Full name of the user
    email: string;                    // Email address of the user
    phone_number?: string;             // Optional phone number
    profile_picture?: string;          // Optional URL or path to the profile picture
    bio?: string;                     // Optional bio or description
    gender?: Gender;                  // Gender of the user
    location?: string;                // Location of the user
    account_created_at: string;         // ISO string for account creation date
    last_login?: string;               // ISO string for last login date
    session_activity?: string;         // Optional session activity metadata (e.g., JSON string)
}
