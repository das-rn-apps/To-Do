export interface Task {
    id: string;
    text: string;
    pending: boolean;
    archived: boolean; // Use boolean instead of `any`
    completed: boolean;
    createdDate: string;  // ISO string for the created date
    updatedDate: string;  // ISO string for the updated date
}
