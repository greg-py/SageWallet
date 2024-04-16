import { useEffect } from "react";

interface UseFetchProps<T, U> {
  url: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setData: React.Dispatch<React.SetStateAction<T>>;
  transformData?: (data: T, auxiliaryData?: U) => T; // Optional transformation function
  auxiliaryData?: U;
}

const useFetch = <T, U>(props: UseFetchProps<T, U>) => {
  const { url, setLoading, setError, setData, transformData, auxiliaryData } =
    props;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const rawData = (await response.json()) as T;

        let transformedData: T;
        if (transformData && auxiliaryData) {
          transformedData = transformData(rawData, auxiliaryData);
        } else if (transformData) {
          transformedData = transformData(rawData);
        } else {
          transformedData = rawData;
        }

        setData(transformedData);
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
  }, [url, setLoading, setData, setError, transformData, auxiliaryData]);
};

export default useFetch;
