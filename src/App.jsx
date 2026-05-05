import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import Transactions from './pages/Transactions'
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
