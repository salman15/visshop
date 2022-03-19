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

type inviteProps = {
  date: string;
  startTime: string;
  endTime: string;
};

export const useSendInvite = (date: inviteProps[], url: string) => {
  const { addAlert } = useAlert();
  //
  const [response, setResponse] = useState<ResponseProps>({
    loading: false,
    package: null,
    error: false,
    errorPackage: null
  });
  //

  const postInvite = async () => {
    setResponse({
      ...response,
      loading: true
    });
    try {
      const response = await axios.post(
        `${process.env.STRAPI_URL}/api/v1/job/invite/candidate?${url}`,
        { dates: date },
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
      window.scrollTo(0, 0);

      //
      addAlert({
        title: "Gelukt!",
        message: "Het uitnodiging is verstuurd",
        type: "success"
      });
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
      console.error("error", error);
      window.scrollTo(0, 0);
    }
  };
  return { data: response.package, postInvite, loading: response.loading };
};
