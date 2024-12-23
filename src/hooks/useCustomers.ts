import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from './useAuth';
import { Customer } from '../types/Order';

export function useCustomers() {
  const { user } = useAuth();
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);

  const addCustomer = useCallback((customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString()
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  }, [setCustomers]);

  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  }, [setCustomers]);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  }, [setCustomers]);

  const assignToAgent = useCallback((customerId: string, agentId: string | null) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId ? { ...customer, agentId } : customer
    ));
  }, [setCustomers]);

  // Filter customers based on user role
  const filteredCustomers = customers.filter(customer => {
    if (user?.role === 'agent') {
      return customer.agentId === user.id;
    }
    return true; // Admin and production see all customers
  });

  return {
    customers: filteredCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    assignToAgent
  };
}