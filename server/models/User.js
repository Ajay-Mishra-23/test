import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  rollNo: { type: String, trim: true, default: '' },
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
}, { timestamps: true });

const MongooseUser = mongoose.model('User', userSchema);

// MOCKED — in-memory fallback when MongoDB is not connected (data lost on container sleep)
const memoryUsers = new Map();

function seedDefaultUsers() {
  const adminId = '000000000000000000000001';
  const studentId = '000000000000000000000002';
  memoryUsers.set(adminId, {
    _id: adminId,
    name: 'Campus Administrator',
    email: 'admin@college.edu',
    passwordHash: bcrypt.hashSync('admin1234', 10),
    rollNo: 'ADMIN-01',
    role: 'admin',
  });
  memoryUsers.set(studentId, {
    _id: studentId,
    name: 'Kabir Verma',
    email: 'student@college.edu',
    passwordHash: bcrypt.hashSync('student1234', 10),
    rollNo: '23CS1089',
    role: 'student',
  });
}
seedDefaultUsers();

function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}

function makeQuery(record) {
  const format = (includePassword) => {
    if (!record) return null;
    if (includePassword) return { ...record };
    const { passwordHash: _pw, ...publicFields } = record;
    return publicFields;
  };
  const basePromise = Promise.resolve(format(false));
  basePromise.select = (fields = '') => {
    const includePassword = String(fields).includes('+passwordHash');
    return Promise.resolve(format(includePassword));
  };
  return basePromise;
}

const User = {
  async exists(filter = {}) {
    if (isMongoConnected()) {
      return MongooseUser.exists(filter);
    }
    const email = filter.email?.toLowerCase();
    for (const user of memoryUsers.values()) {
      if (email && user.email === email) return { _id: user._id };
    }
    return null;
  },

  async create(doc) {
    if (isMongoConnected()) {
      return MongooseUser.create(doc);
    }
    const normalizedEmail = String(doc.email || '').trim().toLowerCase();
    for (const existing of memoryUsers.values()) {
      if (existing.email === normalizedEmail) {
        const dupErr = new Error('Duplicate email');
        dupErr.code = 11000;
        throw dupErr;
      }
    }
    const id = crypto.randomBytes(12).toString('hex');
    const created = {
      _id: id,
      name: String(doc.name || '').trim(),
      email: normalizedEmail,
      passwordHash: doc.passwordHash,
      rollNo: String(doc.rollNo || '').trim(),
      role: doc.role || 'student',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryUsers.set(id, created);
    return { ...created };
  },

  findOne(filter = {}) {
    if (isMongoConnected()) {
      return MongooseUser.findOne(filter);
    }
    const email = filter.email?.toLowerCase();
    let match = null;
    for (const user of memoryUsers.values()) {
      if (email && user.email === email) {
        match = user;
        break;
      }
    }
    return makeQuery(match);
  },

  findById(id) {
    if (isMongoConnected()) {
      return MongooseUser.findById(id);
    }
    const match = memoryUsers.get(String(id)) || null;
    return makeQuery(match);
  },
};

export default User;
