import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { cartItemProps } from "../interfaces/CartItem.interface";
import { useAlert } from "./useAlert";
import { useCart } from "./useCart";

const usePostJob = (baseUrl: string, cart: cartItemProps[]) => {
  const { addAlert } = useAlert();
  const { emptyCart } = useCart();
  //
  const [candidate, candidatePackage] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    skill: "",
    function: "",
    cv: null,
    selectedFile: "",
    social: "",
    comment: ""
  });
  //
  const [postResponse, setPostResponse] = useState<{
    response: AxiosResponse<any>;
    error: boolean;
    errorMessage: string;
    loading: boolean;
  }>({
    response: null,
    error: false,
    errorMessage: "",
    loading: false
  });
  //
  const [checks, setChecks] = useState({
    validated: candidate.name.length > 0 && candidate.email.length > 0,
    sendEmail: false,
    privacy: false
  });
  //
  const [progress, setProgress] = useState(0);
  const render = useRef(0);
  //
  const setName = (e: string) => {
    candidatePackage({ ...candidate, name: e });
  };
  //
  const setFirstName = (e: string) => {
    candidatePackage({ ...candidate, firstName: e });
  };
  //
  const setLastName = (e: string) => {
    candidatePackage({ ...candidate, lastName: e });
  };
  //
  const setEmail = (e: string) => {
    candidatePackage({ ...candidate, email: e });
  };
  //
  const setPhoneNumber = (e: string) => {
    candidatePackage({ ...candidate, phoneNumber: e });
  };
  //
  const setSkill = (e: string) => {
    candidatePackage({ ...candidate, skill: e });
  };
  //
  const setFunction = (e: string) => {
    candidatePackage({ ...candidate, function: e });
  };

  //
  const setSocial = (e: string) => {
    candidatePackage({ ...candidate, social: e });
  };
  //
  const setComment = (e: string) => {
    candidatePackage({ ...candidate, comment: e });
  };
  //
  const setCV = (pdf: any) => {
    //
    if (pdf.target.files[0]) {
      const reader = new FileReader();
      // const newImage = new Blob([pdf.target.files[0]], {
      //   type: pdf.target.files[0].type
      // });
      //
      const formData = new FormData();
      formData.append("file", pdf.target.files[0], pdf.target.files[0].name);
      //
      reader.readAsDataURL(pdf.target.files[0]);
      //
      reader.onloadend = function (e) {
        const result: string | any = reader.result;
        //
        candidatePackage({
          ...candidate,
          cv: formData,
          selectedFile: pdf.target.files[0].name
        });
      };
    }
  };
  //
  const sendEmail = (e: boolean) => {
    setChecks({ ...checks, sendEmail: e });
  };
  //
  const setPrivacy = (e: boolean) => {
    setChecks({ ...checks, privacy: e });
  };
  //
  const postJob = async () => {
    setPostResponse({ ...postResponse, loading: true });
    render.current = render.current + 1;
    //
    axios
      .post(
        `${process.env.STRAPI_URL}/api/v1/${baseUrl}?first_name=${
          candidate.firstName
        }&last_name=${candidate.lastName}&email=${
          candidate.email
        }&phone_number=${candidate.phoneNumber}&skill=${
          candidate.skill
        }&function=${candidate.function}&jobs=${cart.map(
          (item, index) => item.id
        )}&social=${candidate.social}&send_candidate_email=${
          checks.sendEmail
        }&comment=${candidate.comment}`,
        candidate.cv,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let precentage = Math.floor((loaded * 100) / total);
            console.log("options upload");
            console.log(precentage);
            if (precentage < 100) {
              console.log(precentage);
              // setProgress(precentage);
            }
          }
        }
      )
      .then((response) => {
        //
        setProgress(0);
        setPostResponse({
          ...postResponse,
          response: response,
          loading: false
        });
        //
        addAlert({
          title: "Success!",
          message: "Je bericht is verstuurd",
          type: "success"
        });
        //
        if (response.status === 200) {
          emptyCart();
          if (render.current > 0) render.current = 0;
        }
      })
      .catch((error) => {
        setProgress(0);
        setPostResponse({
          ...postResponse,
          error: true,
          errorMessage: error,
          loading: false
        });

        if (render.current < 2) {
          // postJob();
        } else {
          addAlert({
            title: "Error",
            message: `Er ging iets mis met het versturen van het bericht. Probeer het a.u.b. opnieuw.`,
            messages: error.response?.data?.errors,
            type: "error"
          });
        }
        console.log("error", error.response);
      });
  };

  return {
    candidate,
    setName,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    setFunction,
    setSkill,
    setCV,
    setSocial,
    postJob,
    postResponse,
    setPostResponse,
    checks,
    sendEmail,
    setPrivacy,
    setComment,
    progress
  };
};

export default usePostJob;
