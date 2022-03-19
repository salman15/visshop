import React, { useEffect, useState } from "react";

const useGet = (url, options?: { default: true }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState({ hasError: false, message: null });

  const get = async (innerUrl?: string) => {
    setLoading(true);
    try {
      let data = await fetch(`${process.env.STRAPI_URL}/${innerUrl || url}`);
      if (data) {
        const fetched = await data.json();
        setResponse(fetched);
      }
    } catch (e) {
      setError({ hasError: true, message: e });
    }
    setLoading(false);
  };

  return { response, get, loading, error };
};

export default useGet;
