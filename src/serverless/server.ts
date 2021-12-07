/* eslint-disable import/first */
require('dotenv').config()

import cors from 'cors'
import express from 'express'

export const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const apiRouter = express.Router()
const guestRouter = express.Router()

app.use('/api', apiRouter)
app.use('/guest', guestRouter)

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

export const api = apiRouter
export const guest = guestRouter
