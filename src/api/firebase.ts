import * as admin from 'firebase-admin'
import { params } from '@serverless'

const serviceAccount = params.FIREBASE_ADMIN_CONFIG

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: params.FIREBASE_CLIENT_CONFIG.databaseURL,
})

export const firebaseDb = firebaseAdmin.firestore()
