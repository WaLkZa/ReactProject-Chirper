import { Navigate } from 'react-router-dom';
import authService from './utils/services/authService';


const ProtectedRoute = ({ children }) => {
  if (!authService.isAuth()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;