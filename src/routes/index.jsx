import { createBrowserRouter } from "react-router-dom";
import Chat from "../components/Chat";
import Login from "../components/Login";
import Main from "../layouts/Chat/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <Main />,
    children: [
      {
        path: "/chat/:chatId",
        element: <Chat />,
      },
    ],
  },
]);

export default router;
