import Stripe from 'stripe';
import { params } from '@serverless'

const API_KEY = params.STRIPE_API_KEY

export const stripe = new Stripe(API_KEY, {
  apiVersion: '2020-08-27',
});