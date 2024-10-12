import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

//best practice :- create separate component and use it as a wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // effect run once the component get render
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;

  /**
   * when check is needed
   *
   * useEffect -> only executed after component has only being render -> children also has user.jsx which is accessing user but for some second in starting we don't have that value
   * that's why its failing
   */
}

export default ProtectedRoute;
