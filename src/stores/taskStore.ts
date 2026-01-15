import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { TaskStatus, type Task, type TaskInput, type FilterState } from '@models/task';
import { lv } from '@/i18n/lv';

const STORAGE_KEY = 'kanban-tasks';

export const statusOptions = [
  { value: 'all', label: lv.status.all },
  { value: TaskStatus.TODO, label: lv.status.todo },
  { value: TaskStatus.IN_PROGRESS, label: lv.status.inProgress },
  { value: TaskStatus.DONE, label: lv.status.done }
] as const;

export const taskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const filters = ref<FilterState>({
    searchText: '',
    status: 'all'
  });

  const loadTasks = (): void => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        tasks.value = parsed.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt)
        }));
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
    }
  };

  const saveTasks = (): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  };

  const filteredTasks = computed(() => {
    let result = tasks.value;

    // Filter by status
    if (filters.value.status !== 'all') {
      result = result.filter(task => task.status === filters.value.status);
    }

    // Filter by search text
    if (filters.value.searchText.trim()) {
      const searchLower = filters.value.searchText.toLowerCase().trim();
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    return result;
  });

  const tasksByStatus = computed(() => {
    return (status: TaskStatus) => 
      filteredTasks.value.filter(task => task.status === status);
  });

  const addTask = (taskInput: TaskInput): void => {
    const now = new Date();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskInput.title,
      description: taskInput.description,
      status: taskInput.status,
      createdAt: now,
      updatedAt: now
    };

    tasks.value.push(newTask);
    saveTasks();
  };

  const updateTask = (id: string, updates: Partial<TaskInput>): void => {
    const taskIndex = tasks.value.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        ...updates,
        updatedAt: new Date()
      };
      saveTasks();
    }
  };

  const moveTask = (id: string, newStatus: TaskStatus): void => {
    const taskIndex = tasks.value.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = {
        ...tasks.value[taskIndex],
        status: newStatus,
        updatedAt: new Date()
      };
      saveTasks();
    }
  };

  const deleteTask = (id: string): void => {
    tasks.value = tasks.value.filter(task => task.id !== id);
    saveTasks();
  };

  const setSearchText = (text: string): void => {
    filters.value.searchText = text;
  };

  const setStatusFilter = (status: TaskStatus | 'all'): void => {
    filters.value.status = status;
  };

  const clearFilters = (): void => {
    filters.value = {
      searchText: '',
      status: 'all'
    };
  };

  loadTasks();

  return {
    tasks,
    filters,
    filteredTasks,
    tasksByStatus,
    addTask,
    updateTask,
    moveTask,
    deleteTask,
    setSearchText,
    setStatusFilter,
    clearFilters
  };
});
