import express from 'express'
import dotenv from 'dotenv'

import { routes } from './routes'

const app = express()

dotenv.config()

app.use(express.json())
app.use(routes)

export { app }
