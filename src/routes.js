import React from "react";

const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));
const UserForm = React.lazy(() => import("./views/users/UserForm"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/create", exact: true, name: "Create", component: UserForm },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
];

export default routes;
