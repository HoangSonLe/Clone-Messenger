import { createBrowserRouter } from "react-router-dom";

//Pages
import ContactList from "../components/ContactList/ContactList";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import ErrorPage from "../components/Layouts/ErrorPage/ErrorPage";
import MenuContentDefaultLayout from "../components/Layouts/MenuContentDefaultLayout/MenuContentDefaultLayout";
import MessageList from "../components/MessageList/MessageList";

//Config routes
const configRoutes = {
  // root
  home: "/",
  active: "/active",
  //nested routes
  message: "/message/:id",
};
const Layout = MenuContentDefaultLayout;
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
        path: configRoutes.message,
        element: (
          <Layout>
            <MessageList />
          </Layout>
        ),
      },
      {
        path: configRoutes.active,
        element: (
          <Layout>
            <ContactList />
          </Layout>
        ),
      },
    ],
  },
];
const routes = createBrowserRouter([...publicRoutes]);

export { configRoutes, routes };
