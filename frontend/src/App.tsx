import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Logged from "./pages/logged";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/:client",
    element: <Logged />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App
