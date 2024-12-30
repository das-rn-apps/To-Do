import { Task, TaskFilter } from "@/types";

const filterTasks = (tasks: Task[], filters: TaskFilter): Task[] => {
    return tasks.filter(task => {
        const isStatusMatch = filters.status ? task.status === filters.status : true;
        const isPriorityMatch = filters.priority ? task.priority === filters.priority : true;
        const isStartDateMatch = filters.startDate ? task.createdDate >= filters.startDate : true;
        const isEndDateMatch = filters.endDate ? task.createdDate <= filters.endDate : true;
        const isTitleMatch = filters.titleContains ? task.title.toLowerCase().includes(filters.titleContains.toLowerCase()) : true;
        const isDateMatch = filters.date ? task.createdDate === filters.date : true;

        return isStatusMatch && isPriorityMatch && isStartDateMatch && isEndDateMatch && isTitleMatch && isDateMatch;
    });
};


export default filterTasks;
