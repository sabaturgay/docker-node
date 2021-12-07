import * as admin from 'firebase-admin'
import { params } from '@serverless'

const serviceAccount = JSON.parse(params.FIREBASE_ADMIN_CONFIG)

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://native-starter-5fade-default-rtdb.europe-west1.firebasedatabase.app',
})

export const firebaseDb = firebaseAdmin.firestore()
