#!/bin/sh
npx prisma migrate dev --name init
# npx prisma db seed
exec npm run start