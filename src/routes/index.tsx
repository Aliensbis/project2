import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import ProductionPage from '../pages/ProductionPage';
import StatisticsPage from '../pages/StatisticsPage';
import RecipesPage from '../pages/RecipesPage';
import InventoryPage from '../pages/InventoryPage';
import OrdersPage from '../pages/OrdersPage';

const routeComponents = {
  '/': HomePage,
  '/production': ProductionPage,
  '/statistics': StatisticsPage,
  '/recipes': RecipesPage,
  '/inventory': InventoryPage,
  '/orders': OrdersPage
};

export default function AppRoutes() {
  const { user } = useAuth();
  const allowedRoutes = user?.allowedRoutes || [];

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {allowedRoutes.map(route => {
          const Component = routeComponents[route as keyof typeof routeComponents];
          return Component ? (
            <Route key={route} path={route} element={<Component />} />
          ) : null;
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}