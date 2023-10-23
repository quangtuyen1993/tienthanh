import prisma from '@/lib/db/prisma';
import { NextRequest } from 'next/server';
import * as bcrypt from 'bcrypt';
import { signJwtAccessToken } from '@/lib/jwt';

interface SignInRequest {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body: SignInRequest = await request.json();

  var user = await prisma.user.findFirst({
    where: {
      email: body.username
    },
    include: {
      UserClaims: true,
      UserRoles: {
        include: {
          role: true
        }
      }
    }
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;

    var tokenPayload: any = {
      id: user.id,
      email: user.email,
      name: user.name,     
      claims: [] 
    };

    user.UserRoles.forEach((ur) => {
      if (ur && ur.role) {
        tokenPayload.claims.push({
          type: 'role',
          value: ur.role.name
        })
      }
    });

    user.UserClaims.forEach((uc) => {
      if (uc) {
        tokenPayload.claims.push({
          type: uc.claimType,
          value: uc.value
        })
      }
    });

    const accessToken = signJwtAccessToken(tokenPayload);

    const result = {
      ...userWithoutPass,
      accessToken
    };
    return new Response(JSON.stringify(result));
  } else {
    return new Response(
      JSON.stringify({
        message: 'Unathenticated'
      }),
      {
        status: 401
      }
    );
  }
}
