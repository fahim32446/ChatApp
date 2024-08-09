import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HTTPResponse } from '../type';
import { baseURL } from '../request';

type FetchMethod = 'GET' | 'POST';

interface UseFetchResult<T> {
  data: HTTPResponse<T> | null;
  loading: boolean;
  error: string | null;
  doPost: (postData: any) => void;
}

const useFetch = <T,>(
  url: string | null,
  method: FetchMethod = 'GET'
): UseFetchResult<T> => {
  const [data, setData] = useState<HTTPResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (postData?: any) => {
    setLoading(true);
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      };

      if (postData) {
        options.body = JSON.stringify(postData);
      }

      const res = await fetch(`${baseURL}/${url!}`, options);
      const result = await res.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setData(result);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url && method === 'GET') {
      fetchData();
    }
  }, [url, method]);

  const doPost = (postData: any) => {
    if (method === 'POST') {
      fetchData(postData);
    }
  };

  return { data, loading, error, doPost };
};

export default useFetch;
