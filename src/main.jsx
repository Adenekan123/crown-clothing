import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";

import { stripePrpmise } from "./utils/stripe/stripe.utils";
import App from "./App";
import { store,persistor } from "./store/store";


import "./index.scss";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePrpmise}>
            <App />
          </Elements>
            
      </BrowserRouter>
      </PersistGate>
    </Provider>
    
  </React.StrictMode>
);
