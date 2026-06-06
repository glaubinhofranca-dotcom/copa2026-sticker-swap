import path from 'node:path'
import { defineConfig } from 'prisma/config'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    adapter: () => {
      const client = createClient({ url: `file:${dbPath}` })
      return new PrismaLibSQL(client)
    },
  },
})
