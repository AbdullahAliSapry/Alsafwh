import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "./LoginUser.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/Store";
import { LoginWithGoogle } from "@store/api/AuthApi";
import { toast } from "react-toastify";

const { iconsStyle } = styles;

export default function LoginGoogle() {
  const dispatch = useDispatch<AppDispatch>();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        dispatch(LoginWithGoogle(response.access_token));
      } catch (error) {
        toast.error("Error during login:");
        return;
      }
    },
    onError: () => {
      toast.error("Error Failed:");
      return;
    },
  });

  return (
    <div className={iconsStyle}>
      <div>
        <FcGoogle
          onClick={() => {
            login();
          }}
        />
      </div>
    </div>
  );
}
