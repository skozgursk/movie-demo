export interface HttpHookResponse<T> {
    error: string | null;
    loading: boolean;
    data: T | null;
    get: (url: string) => Promise<void>;
    post: (url: string, body: Record<string, string | number | object | boolean>) => Promise<void>;
    put: (url: string, body: Record<string, string | number | object | boolean>) => Promise<void>;
    remove: (url: string) => Promise<void>;
}