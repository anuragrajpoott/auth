import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Loader from "./components/loaders/Loader";
import { getCurrentUser } from "./features/auth/authApi";
import { clearUser, setUser } from "./features/auth/authSlice";
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await getCurrentUser();
        dispatch(setUser(user.data));
      } catch {
        dispatch(clearUser());
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isInitializing) {
    return <Loader fullScreen message="Loading..." />;
  }

  return <AppRoutes />;
}

export default App;
