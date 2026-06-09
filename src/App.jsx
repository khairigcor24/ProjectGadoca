import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './routes/ProtectedRoute'

const AuthLayout = lazy(() => import('./layouts/AuthLayout'))
const MainLayout = lazy(() => import('./layouts/MainLayout'))
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DashboardInsights = lazy(() => import('./pages/DashboardInsights'))

const Product = lazy(() => import('./pages/Product'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

const Transactions = lazy(() => import('./pages/Transactions'))
const Analytics = lazy(() => import('./pages/Analytics'))
const UserProfile = lazy(() => import('./pages/UserProfile'))

function PageFallback() {
  return (
    <div className="page-fallback" role="status">
      Memuat halaman…
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route
                index
                element={<Navigate to="/dashboard/overview" replace />}
              />

              <Route path="dashboard" element={<DashboardLayout />}>
                <Route
                  index
                  element={<Navigate to="overview" replace />}
                />
                <Route path="overview" element={<Dashboard />} />
                <Route path="insights" element={<DashboardInsights />} />
              </Route>

              {/* Product */}
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<ProductDetail />} />

              {/* Other Pages */}
              <Route path="transactions" element={<Transactions />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="user-profile" element={<UserProfile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App