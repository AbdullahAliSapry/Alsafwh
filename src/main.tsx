import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter.tsx";
import "./Main.css";
import "@mantine/carousel/styles.css";
import { Provider } from "react-redux";
import { Store } from "@store/Store.ts";
import "./translate/I18next.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_SEVER_OUthId}>
        <AppRouter />
      </GoogleOAuthProvider>
    </Provider>
  </>
);
