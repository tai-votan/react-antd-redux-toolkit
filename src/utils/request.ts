import { extend } from "umi-request";
import { notification } from "antd";
// import { useAppSelector } from 'app/hooks';
// import { selectUser } from 'app/userSlice';

interface ResponseError<D = any> extends Error {
  name: string;
  data: D;
  response: Response;
}

const codeMessage: { [status: number]: string } = {
  200: "The server successfully returned the requested data. Validating response data...",
  201: "Create or modify data successfully",
  202: "A request has entered the background queue (asynchronous task)",
  204: "The data was deleted successfully",
  400: "The request was sent with an error. The server did not perform any operations to create or modify data",
  401: "The user does not have permission (token, username, password is incorrect)",
  403: "User is authorized, but access is forbidden",
  404: "The request sent is for a record that does not exist and the server is not operating",
  406: "Not Acceptable",
  410: "The requested resource is permanently deleted and will not be obtained again",
  422: "When creating an object, a validation error occurred",
  500: "The server has an error. Please check the server",
  502: "Gateway error",
  503: "The service is unavailable, the server is temporarily overloaded or maintained",
  504: "The gateway timed out",
};

const errorHandler = (error: ResponseError) => {
  const { response = {} as Response } = error;
  if (response && response.status) {
    const { status, statusText } = response;

    const errorText = codeMessage[status] || statusText;

    notification.error({
      message: `Yêu cầu lỗi ${status}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description:
        "Mạng của bạn không bình thường và không thể kết nối với máy chủ",
      message: "Mạng bất thường",
    });
  }
  return response;
};

const umiRequest = extend({
  errorHandler,
  credentials: "same-origin",
  prefix: process.env.REACT_APP_API_URL,
});

const request = async (url: string, options: any = {}) => {
  const newOptions = { ...options };
  const token = "";
  if (token) {
    newOptions.headers = {
      Authorization: `Bearer ${token}`,
      ...newOptions.headers,
    };
  }

  return umiRequest(url, newOptions);
};

export default request;
