import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {UserProvider} from './context/UserContext'

ReactDOM.render(
    <UserProvider>
    <React.StrictMode>
        <App />
    </React.StrictMode>
    </UserProvider>,
    document.getElementById('root')
);


//   import React from 'react';
//   import ReactDOM from 'react-dom/client';
//   import { BrowserRouter } from "react-router-dom";
// //   import './index.css';
//   import App from './components/App';
  
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </React.StrictMode>
//   );