// userInfoStoreService.ts
export interface UserInfo {
    consumptionHabit: string;
    usingPurpose: string;
    gender: string;
    age: number;
    goalBudget: number;
    categories: {
        수입: number;
        식비: number;
        의류: number;
        여가: number;
        교통: number;
        기타: number;
    };
}

// LocalStorage 키 값
const STORAGE_KEY = 'userInfo';

// LocalStorage에서 UserInfo를 가져오는 함수
export const getUserInfo = (): UserInfo | null => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
};

// LocalStorage에서 UserInfo 초기화
export const clearUserInfo = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};
