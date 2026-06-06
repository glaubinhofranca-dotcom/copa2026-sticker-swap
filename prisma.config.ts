import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: `file:${dbPath}`,
  },
})
