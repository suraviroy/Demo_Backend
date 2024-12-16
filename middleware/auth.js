// const jwt = require("jsonwebtoken");
// const auth = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ message: "unauthorized" });
//         }
//         const decode = jwt.verify(token, "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe");
//         req.user = decode;
//         console.log(decode);
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "unauthorized" });
//     }
// };
// module.exports = auth;

import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config()

if (!process.env.ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY is not defined in the environment variables');
}

// Use a consistent encryption key in production and store it securely
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); 
const IV_LENGTH = 16; // AES block size

// Encrypt the password
export const encryptPassword = (password) => {
  const iv = crypto.randomBytes(IV_LENGTH); // Generate a new IV for every encryption
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`; // Store IV with encrypted data
};

// Decrypt the password
export const decryptPassword = (encryptedPassword) => {
  const [iv, encrypted] = encryptedPassword.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
