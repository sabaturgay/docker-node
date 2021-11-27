import jwt from 'jsonwebtoken'

export const verifyJWT = (token: string) => jwt.verify(
  token,
  process.env.JWT_PUBLIC,
  { algorithms: ['RS256', 'none'] },
)

export const signJWT = (data: any) => jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data,
  },
  process.env.JWT_SECRET,
  { algorithms: ['RS256', 'none'] },
)
