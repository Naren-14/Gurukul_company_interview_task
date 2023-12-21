import React from "react";
import { useState, useEffect } from "react";
import { Offline } from "react-detect-offline";
// local
import RouterPage from "./routes/router";
import NavPage from "./views/layout/nav";
import ButtonComponent from "./components/button.component";

function App() {
  const [offline, setOffline] = useState<boolean>(false);

  const offlineHandler = () => setOffline(true);

  return (
    <div className="App">
      <Offline>
        {!offline && (
          <div className="container__offline">
            <div className="container__offline__contentBox">
              <img src="/assets/icons/noInternet.svg" alt="no-internet" />
              <h1>Please Check Your Internet Connection</h1>
            </div>
            <ButtonComponent
              text="To Continue Offline Click Here"
              classNames="offline-btn"
              cb={offlineHandler}
            />
          </div>
        )}
      </Offline>
      <NavPage />
      <RouterPage />
    </div>
  );
}

export default App;
