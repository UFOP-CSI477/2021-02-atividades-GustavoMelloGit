import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/Admin';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import AuthContextProvider from './shared/contexts/AuthContext';
import GlobalStyle from './styles/global';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <LayoutComponent>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/admin'
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path='/auth' element={<AuthPage />} />
          </Routes>
        </LayoutComponent>
      </BrowserRouter>
      <GlobalStyle />
      <Toaster />
    </AuthContextProvider>
  );
}

export default App;
