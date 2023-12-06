import "@/styles/globals.css";

//bootstrap css import
import "bootstrap/dist/css/bootstrap.min.css";
//tostify css import
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import Layout from "../../component/layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}
