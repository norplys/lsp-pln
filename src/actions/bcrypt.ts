import bycrpt from 'bcryptjs';

export function hashPassword (password: string) {
    return bycrpt.hash(password, 10);
}

export function comparePassword (password: string, hashedPassword: string) {
    return bycrpt.compare(password, hashedPassword);
}