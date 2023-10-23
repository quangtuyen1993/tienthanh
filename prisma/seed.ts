import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

async function seedRoles() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin'
    }
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User'
    }
  });
  console.log('upsert roles', { adminRole, userRole });
}

async function main() {
  await prisma.$connect();
  await seedRoles();

  var adminUser = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'admin',
      password: await bcrypt.hash('123@456', 10)
    }
  });
  console.log('upsert adminUser', adminUser);

  var user = await prisma.user.findFirst({
    where: { email: 'admin@gmail.com' }
  });

  var adminRole = await prisma.role.findFirst({
    where: { name: 'Admin' }
  });

  var userRole = await prisma.role.findFirst({
    where: { name: 'User' }
  });

  await prisma.userRole.upsert({
    where: {
      user_role_identifier: {
        userId: user!.id,
        roleId: adminRole!.id
      }
    },
    create: {
      userId: user!.id,
      roleId: adminRole!.id
    },
    update: {}
  });

  await prisma.userRole.upsert({
    where: {
      user_role_identifier: {
        userId: user!.id,
        roleId: userRole!.id
      }
    },
    create: {
      userId: user!.id,
      roleId: userRole!.id
    },
    update: {}
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
