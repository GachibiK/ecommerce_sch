// lib/db.js

import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',      // Your database host
  user: 'root',   // Your database username
  password: 'neema2626', // Your database password
  database: 'ecommercedb', // Your database name
};

let connection;

export const connectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
  }
  return connection;
};