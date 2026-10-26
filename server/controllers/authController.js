import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

const JWT_SECRET = process.env.JWT_SECRET || 'campussync-ephemeral-dev-jwt-secret';

function issueToken(account) {
  return jwt.sign({ sub: account._id.toString(), role: account.role || 'student' }, JWT_SECRET, { expiresIn: '1d' });
}
function publicUser(account) {
  return { 
    id: account._id, 
    name: account.name, 
    email: account.email, 
    rollNo: account.rollNo || account.adminId || '', 
    adminId: account.adminId || account.rollNo || '',
    role: account.role || 'student' 
  };
}

export async function signup(req, res) {
  try {
    const { name, email, password, rollNo = '', role = 'student' } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must contain at least 8 characters.' });
    }
    const normalizedEmail = email.trim().toLowerCase();

    // Check across both schemas to ensure email uniqueness
    const inStudent = await User.exists({ email: normalizedEmail });
    const inAdmin = await Admin.exists({ email: normalizedEmail });
    if (inStudent || inAdmin) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (role === 'admin') {
      const admin = await Admin.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        adminId: String(rollNo).trim(),
        department: 'Campus Administration',
        role: 'admin',
      });
      return res.status(201).json({ token: issueToken(admin), user: publicUser(admin) });
    } else {
      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        rollNo: String(rollNo).trim(),
        role: 'student',
      });
      return res.status(201).json({ token: issueToken(user), user: publicUser(user) });
    }
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'An account with this email already exists.' });
    console.error('Signup error:', error.message);
    return res.status(500).json({ message: 'Unable to create account: ' + error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role = 'student' } = req.body;
    if (!email?.trim() || !password) return res.status(400).json({ message: 'Email and password are required.' });
    const normalizedEmail = email.trim().toLowerCase();

    if (role === 'admin') {
      let admin = await Admin.findOne({ email: normalizedEmail }).select('+passwordHash');
      if (!admin) {
        // Fallback check in User collection in case previously created
        const u = await User.findOne({ email: normalizedEmail }).select('+passwordHash');
        if (u && u.role === 'admin') admin = u;
      }
      if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
        return res.status(401).json({ message: 'Invalid admin email or password.' });
      }
      return res.json({ token: issueToken(admin), user: publicUser(admin) });
    } else {
      const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
      if (user.role !== 'student') {
        return res.status(403).json({ message: 'This account is registered as admin. Choose the Admin login option.' });
      }
      return res.json({ token: issueToken(user), user: publicUser(user) });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Unable to sign in right now.' });
  }
}
