import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProductionPage from './pages/ProductionPage';
import StatisticsPage from './pages/StatisticsPage';
import RecipesPage from './pages/RecipesPage';
import InventoryPage from './pages/InventoryPage';
import OrdersPage from './pages/OrdersPage';
import PurchasesPage from './pages/PurchasesPage';
import ComplaintsPage from './pages/ComplaintsPage';
import AgentsPage from './pages/AgentsPage';
import CustomersPage from './pages/CustomersPage';

export default function App() {
  const { isAuthenticated, canAccessRoute, user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isAgent = user?.role === 'agent';

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/production" 
          element={canAccessRoute('/production') ? <ProductionPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/statistics" 
          element={canAccessRoute('/statistics') ? <StatisticsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/recipes" 
          element={canAccessRoute('/recipes') ? <RecipesPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/inventory" 
          element={canAccessRoute('/inventory') ? <InventoryPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/orders" 
          element={canAccessRoute('/orders') ? <OrdersPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/purchases" 
          element={canAccessRoute('/purchases') ? <PurchasesPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/complaints" 
          element={canAccessRoute('/complaints') ? <ComplaintsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/agents" 
          element={isAdmin ? <AgentsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/customers" 
          element={isAgent ? <CustomersPage /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}