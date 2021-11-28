require('dotenv').config()

export const params: Record<string, any> = {}

Object.keys(process.env).map((key) => {
  params[key] = process.env[key]
})
