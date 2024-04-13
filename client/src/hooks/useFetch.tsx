import { useEffect } from "react";

interface UseFetchProps<T> {
  url: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setData: React.Dispatch<React.SetStateAction<T>>;
  transformData?: (data: T) => T; // Optional transformation function
}

const useFetch = <T,>(props: UseFetchProps<T>) => {
  const { url, setLoading, setError, setData, transformData } = props;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const rawData = (await response.json()) as T;

        // Apply the transformation function if provided
        const data = transformData ? transformData(rawData) : rawData;

        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, setLoading, setData, setError, transformData]);
};

export default useFetch;
