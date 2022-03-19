import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAlert } from "./useAlert";

type ResponseProps = {
  loading: boolean;
  package: any | AxiosResponse<any>;
  error: boolean;
  errorPackage?: any;
} & AxiosResponse<any>;

const useContact = () => {
  const { addAlert } = useAlert();
  /**
   *
   */
  const [contact, setContact] = useState({
    name: "",
    email: "",
    content: "",
    phone: "",
    company: ""
  });
  const [privacy, setPrivacy] = useState(false);
  //
  const [response, setResponse] = useState<ResponseProps>({
    loading: false,
    package: null,
    error: false,
    errorPackage: null
  });
  /**
   *
   */
  const postContact = async () => {
    setResponse({ ...response, loading: true, error: false });
    try {
      const response = await axios.post(
        `${process.env.STRAPI_URL}/api/v1/contact`,
        contact,
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
      addAlert({
        title: "Gelukt!",
        message: "Het bericht is verstuurd",
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
    }
  };

  return { contact, setContact, response, postContact, privacy, setPrivacy };
};

export default useContact;
