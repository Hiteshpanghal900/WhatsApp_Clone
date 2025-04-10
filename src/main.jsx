import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import AuthWrapper from './components/AuthContext.jsx';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AuthWrapper>
)
