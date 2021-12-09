require('dotenv').config()

export const params: Record<string, any> = {}

Object.keys(process.env).map((key) => {
  try {
    params[key] = JSON.parse(process.env[key])
  } catch (error) {
    params[key] = process.env[key]
  }
})
