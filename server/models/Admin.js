import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  adminId: { type: String, trim: true, default: '' },
  department: { type: String, trim: true, default: 'Campus Administration' },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
}, { timestamps: true });

const MongooseAdmin = mongoose.model('Admin', adminSchema);

// In-memory fallback if Mongo is offline
const memoryAdmins = new Map();

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

const Admin = {
  async exists(filter = {}) {
    if (isMongoConnected()) {
      return MongooseAdmin.exists(filter);
    }
    const email = filter.email?.toLowerCase();
    for (const adm of memoryAdmins.values()) {
      if (email && adm.email === email) return { _id: adm._id };
    }
    return null;
  },

  async create(doc) {
    if (isMongoConnected()) {
      return MongooseAdmin.create(doc);
    }
    const normalizedEmail = String(doc.email || '').trim().toLowerCase();
    for (const existing of memoryAdmins.values()) {
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
      adminId: String(doc.adminId || doc.rollNo || '').trim(),
      department: doc.department || 'Campus Administration',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryAdmins.set(id, created);
    return { ...created };
  },

  findOne(filter = {}) {
    if (isMongoConnected()) {
      return MongooseAdmin.findOne(filter);
    }
    const email = filter.email?.toLowerCase();
    let match = null;
    for (const adm of memoryAdmins.values()) {
      if (email && adm.email === email) {
        match = adm;
        break;
      }
    }
    return makeQuery(match);
  },

  findById(id) {
    if (isMongoConnected()) {
      return MongooseAdmin.findById(id);
    }
    const match = memoryAdmins.get(String(id)) || null;
    return makeQuery(match);
  },
};

export default Admin;
