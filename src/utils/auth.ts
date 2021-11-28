import { Strategy as GitHubStrategy } from 'passport-github'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ObjectId } from 'mongodb'
import { auth } from 'firebase-admin'
import { firebaseDb } from '@context/firebase'
import passport from 'passport'
import { prisma } from '@context/prisma'
import { stripe } from '@context/stripe'
import { updateUserAttributes } from '@utils/firebase'
import { params } from '@serverless'
// import { stripe } from '../context/stripe'
// import { firebaseDb } from '../context/firebase'
// import { prisma } from '../context/prisma'
// import { verifyJWT } from './jwt'

export type StrategyConfig = {
  clientID: string
  clientSecret: string
  scope: string[]
}

type UserProfile = {}

type AuthState = {
  request: any
  token: string
  refreshToken: string
  profile: UserProfile
}

type AuthSuccessFunction = (input: {
  request: any
  token: string
  refreshToken: string
  profile: UserProfile
}) => Promise<void>

type AuthConfig = {
  onSuccess?: AuthSuccessFunction
  callbackURL: string
  strategies: {
    Github: StrategyConfig
  }
}

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

const opts = {
  jwtFromRequest: (req) => {
    const { headers: { authorization } } = req
    return (authorization ?? '').replace('Bearer ', '')
  },
  secretOrKey: params.JWT_PUBLIC,
  // issuer: params.JWT_ISSUER,
  // audience: params.JWT_AUDIENCE,
}

passport.use(new JwtStrategy(opts, ((jwt_payload, done) => {
  // User.findOne({id: jwt_payload.sub}, function(err, user) {
  //     if (err) {
  //         return done(err, false);
  //     }
  //     if (user) {
  //         return done(null, user);
  //     } else {
  //         return done(null, false);
  //         // or you could create a new account
  //     }
  // });
  done(null, jwt_payload)
})))

export const AUTH_CONFIG = {
  callbackURL: params.AUTH_CALLBACK_URL,
  strategies: {
    github: {
      clientID: params.GITHUB_ID,
      clientSecret: params.GITHUB_SECRET,
      scope: [
        'phone',
        'email',
        'openid',
        'profile',
      ],
    },
    google: {
      clientID: params.GOOGLE_ID,
      clientSecret: params.GOOGLE_SECRET,
      scope: [
        'phone',
        'email',
        'openid',
        'profile',
      ],
    },
  },
  onSuccess: async (authState: AuthState) => {
  },
}

export const StrategyMap = {
  github: GitHubStrategy,
  google: GoogleStrategy,
} as const

export const onUserCreated = async (user: auth.UserRecord) => {
  try {
    const createdUser = await createAccount(user)
    await updateUserAttributes(user.uid, {
      stripeId: createdUser.stripeId,
      dbId: createdUser.id,
    })
    return createdUser
  } catch (error) {
    console.log(error)
  }
}

const createAccount = async (user: auth.UserRecord) => {
  const {
    uid,
    email,
    displayName,
    phoneNumber,
    photoURL,
  } = user
  const id = new ObjectId().toHexString()
  const customer = await stripe.customers.create({
    metadata: {
      id, uid, photoURL,
    },
    email,
    name: displayName,
    phone: phoneNumber,
  })
  const createdUser = await prisma.user.create({
    data: {
      id,
      uid,
      email,
      name: displayName,
      username: displayName,
      stripeId: customer.id,
      phoneNumber,
      photoURL,
    },
  })
  const userRef = firebaseDb.collection('users').doc(createdUser.id)
  await userRef.set({
    uid: createdUser.uid,
    stripeId: createdUser.stripeId,
    email: createdUser.email,
    id: createdUser.id,
  }, { merge: true })
  return createdUser
}

export const onUserDeleted = async (user) => {
  // await stripe.customers.del(user.uid)
  const userRef = firebaseDb.collection('users').doc(user.customClaims.dbId)
  await userRef.delete()
}
// export const updateUsage = () => {
//   const userRef = db.doc(`users/${snap.data().userId}`);

//     const userDoc = await userRef.get();
//     const user = userDoc.data();

//     await (stripe as any).usageRecords.create(
//       user.itemId,
//       {
//         quantity: 1,
//         timestamp: (Date.parse(snap.createTime) / 1000) | 0,
//         action: 'increment'
//       },
//       {
//         idempotency_key: snap.id
//       }
//     );

//     return userRef.update({ currentUsage: user.currentUsage + 1 });
// }
