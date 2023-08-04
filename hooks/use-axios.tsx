// "use client"
import { useState, useEffect, useCallback } from "react";

//Hook này dùng cho method Gọi tự động
const useAxios = (configObj: any) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(0);

  // Để chạy lại useEffect bên dưới
  const refetch = useCallback(() => {
    setReload((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController(); //dùng đến khi cần dừng 1 request
    const token = localStorage.getItem("token");    
    //const token = 'abcxyz';
    const fetchData = async () => {
      try {
        const res = await axiosInstance({
          method: method.toLowerCase(),
          url: url,
          data: requestConfig ? requestConfig.data : null,
          params: requestConfig ? requestConfig.params : null,
          signal: controller.signal,
        //   headers: {
        //     //authorization: token ? `${token}` : "",
        //     'Authorization': `Bearer ${token}`,
        //   },
        });

        setResponse(res.data);
        setError(null);
      } catch (err: any) {
        setError(err.response);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    //Khi conponent unmount câu lệnh sau sẽ chạy
    //và ngăn memory leak
    return () => controller.abort();
    // eslint-disable-next-line
  }, [axiosInstance, method, url, reload]);

  return { response, isLoading, error, refetch };
};

export default useAxios;