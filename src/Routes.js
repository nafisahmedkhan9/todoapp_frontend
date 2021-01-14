import React from 'react';
import $ from 'jquery';
import * as actions from "./Store/actions"

window.jQuery = $;
window.$ = $;
global.jQuery = $;

//No Auth Components
const Task = React.lazy(() => import("./Pages/Task/index"))
const Bucket = React.lazy(() => import("./Pages/Bucket"))

// Auth Components
const Login = React.lazy(() => import("./Pages/Auth/Login"))
const Signup = React.lazy(() => import("./Pages/Auth/Signup"))

export const routes = [
    { path: actions.CONS.TASK_LINK, exact: true, name: "task", component: Task },
    { path: actions.CONS.BUCKET_LINK, exact: true, name: "bucket", component: Bucket },
]

export const authRoutes = [
    { path: actions.CONS.LOGIN_LINK, exact: true, name: "auth", component: Login },
    { path: actions.CONS.SIGNUP_LINK, exact: true, name: "auth", component: Signup }
]