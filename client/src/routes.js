import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetatils from "./pages/ProductDetatils"

import { ADMIN_URL, SHOP_URL, LOGIN_URL, REGISTRATION_URL, PRODUCT_URL } from "./utils/urls";


export const authRoutes = {
    [ADMIN_URL]: Admin,
}

export const publicRoutes = {
    [SHOP_URL]: Shop,
    [LOGIN_URL]: Login,
    [REGISTRATION_URL]: Register,
    [PRODUCT_URL]: ProductDetatils,
}
