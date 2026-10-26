import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'campussync-ephemeral-dev-jwt-secret';

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'Authentication required.' });
    const payload = jwt.verify(token, JWT_SECRET);

    let user = null;
    if (payload.role === 'admin') {
      user = await Admin.findById(payload.sub);
      if (!user) user = await User.findById(payload.sub);
    } else {
      user = await User.findById(payload.sub);
      if (!user) user = await Admin.findById(payload.sub);
    }

    if (!user) return res.status(401).json({ message: 'Account no longer exists.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Session expired. Please sign in again.' });
  }
}
export function requireRole(role) {
  return (req, res, next) => req.user?.role === role ? next() : res.status(403).json({ message: 'You do not have permission to access this resource.' });
}
