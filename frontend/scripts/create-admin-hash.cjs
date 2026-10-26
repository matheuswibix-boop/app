'use strict';
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const { Writable } = require('node:stream');

// Passwords never appear in arguments, terminal output or tracked files.
async function main() {
  if (!process.stdin.isTTY) throw new Error('Execute em um terminal interativo. Não informe a senha nos argumentos.');
  const output = new Writable({ write(_chunk, _encoding, done) { done(); } });
  const rl = readline.createInterface({ input: process.stdin, output, terminal: true });
  const question = (prompt) => new Promise(resolve => { process.stdout.write(prompt); rl.question('', value => { process.stdout.write('\n'); resolve(value); }); });
  try {
    const password = await question('Senha de administrador (mínimo 16 caracteres, entrada oculta): ');
    if (password.length < 16 || password.length > 256) throw new Error('Use de 16 a 256 caracteres.');
    const confirmation = await question('Confirme a senha (entrada oculta): ');
    if (password !== confirmation) throw new Error('As senhas não coincidem.');
    const salt = crypto.randomBytes(16);
    const hash = 'scrypt$' + salt.toString('hex') + '$' + crypto.scryptSync(password, salt, 64).toString('hex');
    const destination = path.resolve(__dirname, '../.env.admin.local');
    fs.writeFileSync(destination, 'ADMIN_PASSWORD_HASH=' + hash + '\n', { mode: 0o600 });
    process.stdout.write('Hash salvo em .env.admin.local (arquivo privado, ignorado pelo Git). Use somente o hash na variável ADMIN_PASSWORD_HASH da Vercel.\n');
  } finally { rl.close(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
