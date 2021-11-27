import { Expo } from 'expo-server-sdk'

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
export const expo = new Expo()
// export const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
