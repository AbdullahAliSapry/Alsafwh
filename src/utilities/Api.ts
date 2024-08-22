import axios from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";
const cookies = new Cookies();
export const Api = axios.create({
  baseURL: import.meta.env.VITE_SEVER_LINK,
  withCredentials: true,
});

Api.interceptors.request.use((config) => {
  const authModel = cookies.get("authModel");

  if (authModel?.token) {
    config.headers.Authorization = `Bearer ${authModel.token}`;
  }
  return config;
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = cookies.get("RefreashToken");
        const { data } = await axios.get(
          `${import.meta.env.VITE_SEVER_LINK}Auth/refreshToken`,
          {
            headers: {
              Cookie: `refreshToken=${encodeURIComponent(refreshToken)}`,
            },
            withCredentials: true,
          }
        );
        const authModel = cookies.get("authModel") || {};
        authModel.token = data.token;
        authModel.refreshTokenExpiresOn = data.refreshTokenExpiresOn;

        cookies.set("authModel", authModel, {
          path: "/",
          expires: new Date(authModel.refreshTokenExpiresOn),
        });
        cookies.set("refreshToken", data.refreshToken, {
          path: "/",
          expires: new Date(data.refreshTokenExpiresOn),
        });
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return Api(originalRequest);
      } catch (refreshError) {
        cookies.remove("authModel");
        cookies.remove("refreshToken");
        window.location.href = "/login";
        toast.warn("انتهت صلاحيه الجلسه من فضلك سجل الدخول من الاول");
        console.error("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
