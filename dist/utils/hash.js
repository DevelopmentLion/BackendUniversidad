// Utilidad de hashing compatible con Cloudflare Workers usando Web Crypto API
// Reemplaza bcryptjs para el runtime de Cloudflare
export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
export async function comparePassword(password, hash) {
    const passwordHash = await hashPassword(password);
    return passwordHash === hash;
}
