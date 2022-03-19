import { useDispatch, useSelector } from "react-redux";

interface AlertBasicProps {
  title: string;
  message: string;
  messages?: { title: string; message: string }[];
  type: string;
}

export interface AlertProps extends AlertBasicProps {
  id: string;
  title: string;
  message: string;
  messages?: { title: string; message: string }[];
  type: string;
}

export const useAlert = () => {
  //
  const alert = useSelector((state: any) => state.alert);
  //
  const dispatch = useDispatch();
  /**
   *
   * @param payload
   * @returns
   */
  const addAlert = (payload: AlertBasicProps) =>
    dispatch({
      type: "ADD_ALERT",
      payload
    });
  /**
   *
   * @param payload
   * @returns
   */
  const removeAlert = (payload: AlertProps) =>
    dispatch({
      type: "REMOVE_ALERT",
      payload
    });

  return { alert, addAlert, removeAlert };
};
