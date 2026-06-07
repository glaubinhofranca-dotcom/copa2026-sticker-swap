import path from 'node:path'
import { defineConfig } from 'prisma/config'

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL ?? `file:${dbPath}`,
  },
})
