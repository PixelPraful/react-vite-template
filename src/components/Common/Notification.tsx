import React, { useEffect } from "react";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../redux/actions/appActions";

const Notification: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  // Get the messages and types from the Redux store
  const { errorMessage, successMessage } = useSelector(
    (state: RootState) => state.app
  );

  // Effect to handle notifications when the messages change
  useEffect(() => {
    if (errorMessage) {
      api.error({
        message: "Error",
        description: errorMessage,
        onClose: () => dispatch(setErrorMessage("")), // Clear the error on close
        showProgress: true,
        pauseOnHover: false,
      });
    }

    if (successMessage) {
      api.success({
        message: "Success",
        description: successMessage,
        onClose: () => dispatch(setSuccessMessage("")), // Clear the success message on close
        showProgress: true,
        pauseOnHover: false,
      });
    }
  }, [errorMessage, successMessage, api, dispatch]);

  return <>{contextHolder}</>;
};

export default Notification;
