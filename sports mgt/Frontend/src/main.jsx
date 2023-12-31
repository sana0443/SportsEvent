// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import {store,persistor} from './Redux/Store';
// import App from './App';
// import './index.css';
// import { PersistGate } from 'redux-persist/integration/react';

// // Assuming you have a configured Redux store

// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//     <App />
//     </PersistGate>
//   </Provider>
// );




import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/Store';
import App from './App';
import './index.css';

// Render the App component with Redux Provider and PersistGate
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

