import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
  }

  async init() {
    try {
      this.db = await SQLite.openDatabaseAsync('expenses.db');
      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  async createTables() {
    const createExpensesTable = `
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await this.db.execAsync(createExpensesTable);
  }

  async addExpense(expense) {
    const { title, amount, category, date, description } = expense;
    const result = await this.db.runAsync(
      'INSERT INTO expenses (title, amount, category, date, description) VALUES (?, ?, ?, ?, ?)',
      [title, amount, category, date, description || '']
    );
    return result.lastInsertRowId;
  }

  async getAllExpenses() {
    const result = await this.db.getAllAsync('SELECT * FROM expenses ORDER BY created_at DESC');
    return result;
  }

  async getExpenseById(id) {
    const result = await this.db.getFirstAsync('SELECT * FROM expenses WHERE id = ?', [id]);
    return result;
  }

  async updateExpense(id, expense) {
    const { title, amount, category, date, description } = expense;
    await this.db.runAsync(
      'UPDATE expenses SET title = ?, amount = ?, category = ?, date = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, amount, category, date, description || '', id]
    );
  }

  async deleteExpense(id) {
    await this.db.runAsync('DELETE FROM expenses WHERE id = ?', [id]);
  }

  async getExpensesByCategory() {
    const result = await this.db.getAllAsync(
      'SELECT category, SUM(amount) as total, COUNT(*) as count FROM expenses GROUP BY category ORDER BY total DESC'
    );
    return result;
  }

  async getMonthlyExpenses() {
    const result = await this.db.getAllAsync(
      `SELECT 
        strftime('%Y-%m', date) as month,
        SUM(amount) as total,
        COUNT(*) as count
      FROM expenses 
      GROUP BY strftime('%Y-%m', date) 
      ORDER BY month DESC
      LIMIT 12`
    );
    return result;
  }
}

export default new DatabaseService();