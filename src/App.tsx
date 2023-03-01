import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.less";
import { Login } from "./Components/User/Login/Login";
import { Register } from "./Components/User/Register/Register";
import { Landing } from "./pages/Landing/Landing";
import { NotFound } from "./pages/NotFound/NotFound";
import { WriteJournal } from "./pages/WriteJournal/WriteJournal";
import { PrivateRoute } from "./Shared/Components/PrivateRoute/PrivateRoute";
import { AuthContext } from "./Shared/Context/AuthContext";
import { getFromLocalStorage } from "./Shared/Misc/LocalStorage";
import { User } from "./Shared/Models/User";

const App: React.FC = () => {
  let [user, setUser] = useState<User>({
    id: "",
    authenticated: false,
    username: "",
  });

  useEffect(() => {
    if (user.authenticated) {
      return;
    }

    const storageUserResult = getFromLocalStorage<User>("USER");

    if (storageUserResult.success) {
      const storageUser = storageUserResult.data;
      setUser({
        authenticated: storageUser.authenticated,
        id: storageUser.id,
        username: storageUser.username,
      });
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/journal/:journalId",
      element: (
        <PrivateRoute>
          <WriteJournal />
        </PrivateRoute>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/journal",
      element: (
        <PrivateRoute>
          <WriteJournal />
        </PrivateRoute>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <NotFound />,
    },
    {
      path: "/403",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Landing />,
      errorElement: <NotFound />,
    },
  ]);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};
export default App;
