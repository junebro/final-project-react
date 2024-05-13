import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./Router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Provider를 react-redux에서 import
import store from './store'; // createStore로 생성한 스토어를 import

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}> {/* Provider로 전체 앱을 감싸고 store prop에 스토어를 전달 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);