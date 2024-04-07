import { AxiosInstance } from 'axios';
import { useState } from 'react';
import { HttpHookRequestOptions } from './httpHookRequestOptions';
import { HttpHookResponse } from './httpHookResponse';




export const useHTTP = <T>(axiosInstance: AxiosInstance): HttpHookResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (url: string, options: HttpHookRequestOptions) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance({
        url,
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: options.body,
      });
      const responseData: T = response as T;
      setData(responseData);
    } catch (error: any) {
      setError(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const get = async (url: string) => {
    await fetchData(url, { method: 'GET' });
  };

  const post = async (url: string, body: Record<string, string | number | object | boolean>) => {
    await fetchData(url, { method: 'POST', body });
  };

  const put = async (url: string, body: Record<string, string | number | object | boolean>) => {
    await fetchData(url, { method: 'PUT', body });
  };

  const remove = async (url: string) => {
    await fetchData(url, { method: 'DELETE' });
  };

  return { data, error, loading, get, post, put, remove }
};