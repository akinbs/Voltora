import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import WishlistPage from '../pages/WishlistPage'
import CheckoutPage from '../pages/CheckoutPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import ProfilePage from '../pages/ProfilePage'
import OrdersPage from '../pages/OrdersPage'
import SettingsPage from '../pages/SettingsPage'
import NotFoundPage from '../pages/NotFoundPage'
import FlashSalePage from '../pages/FlashSalePage'
import NewArrivalsPage from '../pages/NewArrivalsPage'
import BestSellersPage from '../pages/BestSellersPage'
import DealsPage from '../pages/DealsPage'
import SupportPage from '../pages/SupportPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,               element: <HomePage />            },
      { path: 'products',          element: <ProductsPage />        },
      { path: 'products/:id',      element: <ProductDetailPage />   },
      { path: 'flash-sale',        element: <FlashSalePage />       },
      { path: 'new-arrivals',      element: <NewArrivalsPage />     },
      { path: 'best-sellers',      element: <BestSellersPage />     },
      { path: 'deals',             element: <DealsPage />           },
      { path: 'support',           element: <SupportPage />         },
      { path: 'cart',              element: <CartPage />            },
      { path: 'wishlist',          element: <WishlistPage />        },
      { path: 'checkout',          element: <CheckoutPage />        },
      { path: 'login',             element: <LoginPage />           },
      { path: 'register',          element: <RegisterPage />        },
      { path: 'forgot-password',   element: <ForgotPasswordPage />  },
      { path: 'profile',           element: <ProfilePage />         },
      { path: 'orders',            element: <OrdersPage />          },
      { path: 'settings',          element: <SettingsPage />        },
      { path: '*',                 element: <NotFoundPage />        },
    ],
  },
])
