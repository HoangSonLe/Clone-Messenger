import { createBrowserRouter } from "react-router-dom";

//Pages
import ContactList from "../components/ContactList/ContactList";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import ErrorPage from "../components/Layouts/ErrorPage/ErrorPage";
import MessageList from "../components/MessageList/MessageList";

//Config routes
const configRoutes = {
  // root
  home: "/",
  active: "/active",
  //nested routes
  defaultMessage : "/message",
  // message: "/message/:id",
  message: "/message/*",
};
//Routes
const publicRoutes = [
  //root
  {
    path: configRoutes.home,
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      //nested routes
      {
        index :true,
        // path: configRoutes.message,
        element: <MessageList />,
      },
      {
        path: configRoutes.message,
        element: <MessageList />,
      },
      {
        path: configRoutes.active,
        element: <ContactList />,
      },
    ],
  },
];
const routes = createBrowserRouter([...publicRoutes]);

export { configRoutes, routes };

