import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import C_App from './C_App';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import secureLocalStorage from 'react-secure-storage';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

let RootComponent = () => {

  let [status, setStatus] = useState(
    secureLocalStorage.getItem("coordinator_loginstatus") === "true"
  );

  useEffect(() => {
    let intervalId = setInterval(() => {
      let newStatus = secureLocalStorage.getItem("coordinator_loginstatus") === "true";
      setStatus(newStatus);  // Update the state whenever the status changes
    }, 1000); // You can change this interval timing as per your need

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  let componentToRender;

  switch (status) {
    case true:
      componentToRender = <C_App />;
      break;
    default:
      componentToRender = <App />;
      break;
  }
  const queryClient = new QueryClient()
  return (
    <>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          {componentToRender}
        </QueryClientProvider>
      </React.StrictMode>
    </>
  );

};

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

reportWebVitals();
