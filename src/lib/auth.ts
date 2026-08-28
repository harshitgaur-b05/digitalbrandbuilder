import { NextRequest } from 'next/server';
import { decryptSession } from './auth-utils';

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin-session')?.value;
  if (!token) {
    throw new Error('Unauthorized');
  }

  const session = decryptSession(token);
  if (!session || new Date(session.expiresAt) < new Date()) {
    throw new Error('Unauthorized');
  }

  return session;
}
