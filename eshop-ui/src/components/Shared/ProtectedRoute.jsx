import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import LocalStorage from "../../API/LocalStorage";

export const ProtectedRoute = ({ children }) => {
  

  const currentUser = LocalStorage.getCurrentUser();
  console.log(currentUser)

  if (!currentUser ) {
    // user is not authenticated
    alert('Please log in')
    return <Navigate to="/" replace={true} />

  }
  return children;
};
