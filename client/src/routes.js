import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails"
import Cart from "./pages/Cart"

import { ADMIN_URL, SHOP_URL, LOGIN_URL, REGISTRATION_URL, BOOK_URL, CART_URL, ORDERS_URL } from "./utils/urls";
import Orders from "./pages/Orders";


export const authRoutes = {
    [ADMIN_URL]: Admin,
    [CART_URL]: Cart,
    [ORDERS_URL]: Orders
}

export const publicRoutes = {
    [SHOP_URL]: Shop,
    [LOGIN_URL]: Login,
    [REGISTRATION_URL]: Register,
    [BOOK_URL]: BookDetails,
}
