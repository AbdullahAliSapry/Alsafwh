import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter.tsx";
import "./Main.css";
import "@mantine/carousel/styles.css";
import { Provider } from "react-redux";
import { Store } from "@store/Store.ts";
import "./translate/I18next.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={Store}>
      <AppRouter />
    </Provider>
  </>
);
