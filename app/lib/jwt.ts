import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

interface SignOptions {
  expiresIn?: string | number;
}

interface TokenPayload {
  id: string,
  email: string,
  name: string,
  claims: Claim[]
}

interface Claim {
  type: string,
  value: string
}

const DEFAULT_SIGNIN_OPTIONS: SignOptions = {
  expiresIn: '1h'
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGNIN_OPTIONS
) {
  const secretKey = process.env.NEXTAUTH_SECRET as string;
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

export function verifyToken(token: string) {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET as string;
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (error) {
    console.error('verifyToken', error);
  }
}

export function checkAccessToken(request: NextRequest) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1]
  if (accessToken && verifyToken(accessToken)) {
    return undefined;
  }
  return new Response('unauthorized', { status: 401 });
}

// kiểm tra token có chứa role hay không
export function checkHasRole(request: NextRequest, role: string) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1]
  if (accessToken) {
    var payload: TokenPayload = verifyToken(accessToken) as TokenPayload
    if (payload) {
      if (payload.claims.filter(x => x.type == 'role' && x.value == role))  {
        return undefined
      }
    }
  }
  return new Response('unauthorized', { status: 401 });
}
