const db = require('./db');
const jwt = require('jsonwebtoken');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { hotel_name } = req.body;
  const authHeader = req.headers.authorization;

  if (!hotel_name) {
    return res.status(400).json({ message: 'Hotel name is required' });
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. Please login first.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_swizztrip');
    
    // Insert booking
    const newBooking = await db.query(
      'INSERT INTO bookings (user_id, hotel_name) VALUES ($1, $2) RETURNING *',
      [decoded.id, hotel_name]
    );

    res.status(201).json({ message: 'Booking confirmed successfully', booking: newBooking.rows[0] });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token. Please login again.' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
