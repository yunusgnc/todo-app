import "@/styles/globals.css";

//bootstrap css import
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../component/layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
