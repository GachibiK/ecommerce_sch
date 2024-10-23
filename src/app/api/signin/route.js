import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const dbConfig = {
    host: 'localhost',      // Your database host
    user: 'root',   // Your database username
    password: 'neema2626', // Your database password
    database: 'ecommercedb', // Your database name
};

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Find user by email
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 401 });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 401 });
        }

        // Authentication successful, return user data
        return new Response(JSON.stringify({ userid: user.userid, username: user.username }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Sign-in failed.' }), { status: 500 });
    }
}
