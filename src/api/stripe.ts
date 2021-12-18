import Stripe from 'stripe'
import { params } from '@serverless'

export const stripe = new Stripe(
  params.STRIPE_API_KEY,
  { apiVersion: '2020-08-27' },
)
