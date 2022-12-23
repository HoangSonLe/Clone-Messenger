import { createBrowserRouter } from "react-router-dom";

//Pages
import ContactList from "../components/ContactList/ContactList";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import ErrorPage from "../components/Layouts/ErrorPage/ErrorPage";
import MessageList from "../components/ConversationList/ConversationList";
import TestPage from "../components/Layouts/TestPage/TestPage";

//Config routes
const configRoutes = {
    // root
    home: "/",
    active: "/active",
    //nested routes
    defaultMessage: "/message",
    // message: "/message/:id",
    message: "/message/:id",
    test: "/test",
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
                index: true,
                element: <MessageList />,
            },
            {
                path: configRoutes.defaultMessage,
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
    {
        path: configRoutes.test,
        element: <TestPage />,
    },
];
const routes = createBrowserRouter([...publicRoutes]);

export { configRoutes, routes };
