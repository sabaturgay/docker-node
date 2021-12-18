import { stripe } from '@api/stripe'
import { prisma } from '@api/prisma'
import {
  api,
  guest,
  params,
} from '@serverless'
import { updateUserAttributes } from '@cloud'
// import * as R from 'colay/ramda';

guest.get('/userCreated', async (req, res) => {
  const {
    body: {
      userAttributes,
      userName,
    },
  } = req
  if (userAttributes.email) {
    try {
      console.log('===EMAIL SENT===')
    } catch (error) {
      console.log(error)
    }
    try {
      await createAccount(event)
    } catch (error) {
      console.log(error)
    }
    // callback(null, event);
  } else {
    // Nothing to do, the user's email ID is unknown
    // callback(null, event);
  }
})

api.post('/updateUsage', async (req, res) => {
  const {
    body: {
      username,
      itemId,
    },
  } = req
  await (stripe as any).usageRecords.create(
    itemId,
    {
      quantity: 1,
      timestamp: (Date.now() / 1000) | 0,
      action: 'increment',
    },
    { idempotency_key: '', // R.uuid()
    },
  )

  res.send('ok')
})

api.get('/create-checkout-session', async (req, res) => {
  const {
    query: {
      customerId,
      priceId,
    },
  } = req
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        // TODO: replace this with the `price` of the product you want to sell
        price: priceId,
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'subscription',
    // automatic_tax: {enabled: true},
    success_url: `${params.CLIENT_CALLBACK_URL}/payment?status=success`,
    cancel_url: `${params.CLIENT_CALLBACK_URL}/payment?status=failed`,
  })
  res.redirect(303, session.url)
})

guest.post(
  '/stripe-webhook',
  async (req, res) => {
    let event
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'] || [],
        params.STRIPE_WEBHOOK_SECRET,
      )
    } catch (err) {
      console.log('⚠️  Webhook signature verification failed.')
      res.sendStatus(400)
      return
    }

    // Extract the data from the event.
    const { data } = event
    console.log('webhook!', data)
    const eventType = event.type
    switch (eventType) {
      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed':
        console.log('Failed Payment')
        break

      case 'checkout.session.async_payment_succeeded':
      case 'checkout.session.completed':
        console.log('Successful Payment')
        break
      default:
        break
    }
    res.redirect(303, `${params.CLIENT_CALLBACK_URL}?data=${encodeURI(JSON.stringify({ name: 'ts' }))}`)
  },
)

const createAccount = async (event) => {
  const {
    request: {
      userAttributes: {
        uid,
        email,
        username,
        name,
        phone,
      },
    },

  } = event
  const customer = await stripe.customers.create({
    metadata: { uid },
    email,
    name,
    phone,
  })
  const stripeId = customer.id
  await updateUserAttributes({
    username,
    attributes: { stripeId },
  })

  return prisma.user.create({
    data: {
      uid,
      id,
      email,
      name,
      username,
      stripeId,
    },
  })
}
