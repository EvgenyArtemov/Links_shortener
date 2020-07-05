import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import 'materialize-css';

function App() {
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
        <BrowserRouter>
          <div className="container">
            {routes}
          </div>
        </BrowserRouter>
    </AuthContext.Provider>
    
  );
}

export default App;
