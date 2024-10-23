import mysql from 'mysql2/promise'; 
import bcrypt from 'bcryptjs';

// DB connection details
const dbConfig = {
    host: '127.0.0.1',      // Your database host
    user: 'root',   // Your database username
    password: 'neema2626', // Your database password
    database: 'ecommercedb', // Your database name
};

export async function POST(req) {
    try {
        const { firstName, lastName, email, password } = await req.json();

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const connection = await mysql.createConnection(dbConfig);

        // Insert user details into the users table
        const [result] = await connection.execute(
            'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword]
        );

        // Close the connection
        await connection.end();
        console.log('Database connection closed.');

        // Respond with success message
        return new Response(JSON.stringify({ message: 'User registered successfully!' }), { status: 200 });
    } catch (dbError) {
        console.error('Database operation failed:', dbError);
        return new Response(JSON.stringify({ error: 'User registration failed during database operation.' }), { status: 500 });
    }
}
