import { useState, useCallback } from 'react';
import { Agent } from '../types/Auth';
import { EXAMPLE_AGENT } from '../config/auth';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([EXAMPLE_AGENT]);

  const addAgent = useCallback((agent: Omit<Agent, 'id' | 'createdAt'>) => {
    const newAgent: Agent = {
      ...agent,
      id: `AG${String(agents.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };
    setAgents(prev => [...prev, newAgent]);
    return newAgent;
  }, [agents]);

  const updateAgent = useCallback((id: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  }, []);

  const deleteAgent = useCallback((id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  }, []);

  const getAgentById = useCallback((id: string) => {
    return agents.find(agent => agent.id === id);
  }, [agents]);

  return {
    agents,
    addAgent,
    updateAgent,
    deleteAgent,
    getAgentById
  };
}