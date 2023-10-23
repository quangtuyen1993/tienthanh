db:
	npx prisma generate --schema=./prisma/schema.prisma

seed:
	npx prisma db seed