import { firebaseAdmin } from '@context/firebase'

export const updateUserAttributes = async (uid: string, data: any) => {
  await firebaseAdmin
    .auth()
    .setCustomUserClaims(uid, data)
}

export const getUserRoles = (user: any) => user?.customClaims?.roles ?? []
