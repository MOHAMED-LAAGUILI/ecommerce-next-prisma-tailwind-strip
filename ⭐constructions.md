# setup prisma
npm i ts-node prisma --save-dev
npx prisma init --datasource-provider sqlite

-- after creating the tables schema run 
npx prisma migrate dev --name init

-- for client provider
https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

# setup ui library
shadcn

npx shadcn@latest init

# charts
npm i chart.js react-chartjs-2 

# Zod fro data validation
npm i zod 