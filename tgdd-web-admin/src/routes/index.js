import { AdminManager } from "~/pages";
import LoginPage from "~/pages/LoginPage";

const publicRoutes = [
  { path: '/login', component:LoginPage },
];

const privateRoutes = [
  { path: '/admin-manage', component:AdminManager },
];

export { publicRoutes, privateRoutes };
