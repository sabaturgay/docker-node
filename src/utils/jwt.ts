import jwt from 'jsonwebtoken'
import { params } from '@serverless'

export const verifyJWT = (token: string) => jwt.verify(
  token,
  params.JWT_PUBLIC,
  { algorithms: ['RS256', 'none'] },
)

export const signJWT = (data: any) => jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data,
  },
  params.JWT_SECRET,
  { algorithms: ['RS256', 'none'] },
)
