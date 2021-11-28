import * as admin from 'firebase-admin'

export const firebaseAdmin = admin.initializeApp()
export const firebaseDb = firebaseAdmin.firestore()
