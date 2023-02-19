export const saveToLocalStorage = (key: string, object: any) => {
    localStorage.setItem(key, object);
}

export const getFromLocalStorage: <T>(key: string) => LocalStorageResult<T> = <T>(key: string) => {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
        const result = JSON.parse(jsonString) as T;
        return {
            success: true,
            data: result
        };
    }

    return {
        success: false,
        data: null
    } as LocalStorageResult<T>;
}

export const getRawFromLocalStorage: (key: string) => LocalStorageResult<string> = (key) => {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
        return {
            success: true,
            data: jsonString
        };
    }

    return {
        success: false,
        data: ""
    };
}

export type LocalStorageResult<T> = {
    success: boolean,
    data: T
};