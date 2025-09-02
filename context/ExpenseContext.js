import React, { createContext, useContext, useState, useEffect } from 'react';
import DatabaseService from '../services/DatabaseService';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      setLoading(true);
      await DatabaseService.init();
      await loadExpenses();
    } catch (error) {
      console.error('Failed to initialize database:', error);
      setError('Failed to initialize database');
    } finally {
      setLoading(false);
    }
  };

  const loadExpenses = async () => {
    try {
      const expensesData = await DatabaseService.getAllExpenses();
      setExpenses(expensesData);
    } catch (error) {
      console.error('Failed to load expenses:', error);
      setError('Failed to load expenses');
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const id = await DatabaseService.addExpense(expenseData);
      const newExpense = { ...expenseData, id };
      setExpenses(prev => [newExpense, ...prev]);
      return newExpense;
    } catch (error) {
      console.error('Failed to add expense:', error);
      throw new Error('Failed to add expense');
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      await DatabaseService.updateExpense(id, expenseData);
      setExpenses(prev => 
        prev.map(expense => 
          expense.id === id ? { ...expenseData, id } : expense
        )
      );
    } catch (error) {
      console.error('Failed to update expense:', error);
      throw new Error('Failed to update expense');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await DatabaseService.deleteExpense(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Failed to delete expense:', error);
      throw new Error('Failed to delete expense');
    }
  };

  const getExpensesByCategory = async () => {
    try {
      return await DatabaseService.getExpensesByCategory();
    } catch (error) {
      console.error('Failed to get expenses by category:', error);
      return [];
    }
  };

  const getMonthlyExpenses = async () => {
    try {
      return await DatabaseService.getMonthlyExpenses();
    } catch (error) {
      console.error('Failed to get monthly expenses:', error);
      return [];
    }
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByDateRange = (startDate, endDate) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
    });
  };

  const value = {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getMonthlyExpenses,
    getTotalExpenses,
    getExpensesByDateRange,
    refreshExpenses: loadExpenses
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};