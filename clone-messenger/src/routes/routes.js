//Pages
import React from "react";
import { Navigate } from "react-router-dom";
import ContactList from "../components/ContactList/ContactList";
import MessageList from "../components/ConversationList/ConversationList";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import ErrorPage from "../components/Layouts/ErrorPage/ErrorPage";
import TestPage from "../components/Layouts/TestPage/TestPage";
import LoginPage from "../components/Login/LoginPage";

//Config routes
const configRoutes = {
    // root
    home: "/",
    login: "/login",
    active: "/active",
    defaultMessage: "/message",
    message: "/message",
    test: "/test",
};
//Routes
const routes = (isLoggedIn) => [
    //root
    {
        path: configRoutes.home,
        element: isLoggedIn ? <DefaultLayout /> : <Navigate to={configRoutes.login} />,
        errorElement: <ErrorPage />,
        children: [
            //nested routes
            {
                index: true,
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
    {
        path: configRoutes.login,
        element: <LoginPage />,
    },
];
export { configRoutes, routes };
