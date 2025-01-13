import { Task, TaskFilter } from "@/types";

const filterTasks = (tasks: Task[], filters: TaskFilter): Task[] => {
    return tasks.filter(task => {
        const isStatusMatch = filters.status ? task.status === filters.status : true;
        const isPriorityMatch = filters.priority ? task.priority === filters.priority : true;
        const isStartDateMatch = filters.startDate ? task.createdDate >= filters.startDate : true;
        const isEndDateMatch = filters.endDate ? task.createdDate <= filters.endDate : true;
        const isTitleOrDescriptionMatch = filters.text
            ? task.title.toLowerCase().includes(filters.text.toLowerCase()) || task.description?.toLowerCase().includes(filters.text.toLowerCase())
            : true;

        const isDateMatch = filters.date ? task.createdDate === filters.date : true;

        return isStatusMatch && isPriorityMatch && isStartDateMatch && isEndDateMatch && isTitleOrDescriptionMatch && isDateMatch;
    });
};


export default filterTasks;
