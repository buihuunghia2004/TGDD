import AdminManagePage from "~/pages/AdminManagePage";
import CategoryPage from "~/pages/CategoryPage";
import LoginPage from "~/pages/LoginPage";

const publicRoutes = [
  { path: '/login', component:LoginPage },
];

const privateRoutes = [
  { path: '/admin-manage', component:AdminManagePage },
  { path: '/categories', component:CategoryPage },
];

export { publicRoutes, privateRoutes };
