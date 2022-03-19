import { useState } from "react";
import { useAlert } from "./useAlert";
import axios, { AxiosResponse } from "axios";
type ResponseProps = {
  loading: boolean;
  package: any | AxiosResponse<any>;
  error: boolean;
  errorPackage?: any;
  status?: number;
};

export const useComment = (url, comment) => {
  const { addAlert } = useAlert();
  //
  const [response, setResponse] = useState<ResponseProps>({
    loading: false,
    package: null,
    error: false,
    errorPackage: null
  });
  //

  const postComment = async () => {
    try {
      const response = await axios.get(
        `${process.env.STRAPI_URL}/api/v1/bullhorn/job_submission/update/mail?comment=${comment}${url}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
      //
      setResponse({
        ...response,
        loading: false,
        package: response,
        error: false
      });
      //
      addAlert({
        title: "Gelukt!",
        message: "Het bericht is verstuurd",
        type: "success"
      });
      window.scrollTo(0, 0);

      //
    } catch (error) {
      setResponse({
        ...response,
        error: true,
        errorPackage: error,
        loading: false
      });
      addAlert({
        title: "Error",
        message: "Something went wrong",
        type: "error"
      });
      window.scrollTo(0, 0);
    }
  };
  return { response, postComment };
};
