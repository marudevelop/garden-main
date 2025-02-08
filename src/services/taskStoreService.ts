export interface Task {
    id: number;
    content: string;
    date: string;
    amount: number;
}

/*
* LocalStorage Tasks 배열에 대한 함수
* */

// LocalStorage 키 값
const STORAGE_KEY = 'tasks';

// LocalStorage에 빈 배열 초기화 (완전 첫 사용자인 경우)
const initializeTasks = (): void => {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
};

// LocalStorage에서 Task 데이터를 가져오는 함수
export const getTasks = (): Task[] => {
    initializeTasks(); // 초기화 확인
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

// LocalStorage에 Task 데이터를 저장하는 함수
export const saveTasks = (task: Task[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
}

/*
* 개별 Task에 대한 함수
* */

// 새로운 Task 추가
export const addTask = (task: Task): void => {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
};

// 특정 Task 삭제
export const deleteTask = (taskId: number): void => {
    const tasks = getTasks().filter((task) => task.id !== taskId);
    saveTasks(tasks);
};

// 모든 Task 초기화
export const clearTasks = (): void => {
    localStorage.removeItem(STORAGE_KEY);
    initializeTasks();
};