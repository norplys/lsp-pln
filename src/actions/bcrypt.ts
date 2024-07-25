import bcrypt from 'bcryptjs';

export function hashPassword (password: string) {
    return bcrypt.hash(password, 10);
}

export function comparePassword (password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}