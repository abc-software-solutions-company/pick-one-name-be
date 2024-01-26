import * as bcrypt from 'bcrypt';

export function hashPassword(plainTextPassword: string, salt = 10) {
  const result = bcrypt.hashSync(plainTextPassword, salt);

  return result;
}

export async function comparePassword(hash: string, plainTextPassword: string) {
  const isMatch = await bcrypt.compare(plainTextPassword, hash);

  return isMatch;
}

export async function checkValidPassword(hash: string, plainTextPassword: string) {
  const isValid = await comparePassword(hash, plainTextPassword);

  return isValid;
}
