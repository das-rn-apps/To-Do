export interface Task {
    id: string;                         // Unique identifier for the task
    title: string;                      // Title of the task
    description?: string;               // Optional description for the task
    status: TaskStatus; // Status of the task
    priority: Priority;                   // Priority of the task (1 to 5)
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
    titleContains?: string;
    date?: string;
}