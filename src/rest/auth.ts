import { buildQueryString } from '../utils/qs'
import { guest, params } from '@serverless'
import passport from 'passport'

import {
  AUTH_CONFIG,
  StrategyConfig,
  StrategyMap,
} from '../utils/auth'

Object.keys(StrategyMap).forEach((strategyName) => {
  const strategyConfig: StrategyConfig = AUTH_CONFIG.strategies[strategyName]
  passport.use(
    new StrategyMap[strategyName](
      {
        ...strategyConfig,
        callbackURL: `${params.PUBLIC_URL_PREFIX}/auth-${strategyName}-callback`,
        passReqToCallback: true,
      },
      async (request, token, refreshToken, params, profile, done) => {
        const result = {
          token,
          refreshToken,
          profile,
          tokenType: params.token_type,
          idToken: params.id_token,
          expiresIn: params.expires_in,
        }
        await AUTH_CONFIG.onSuccess?.({
          request,
          ...result,
        })
        return done(null, result)
      },
    ),
  )
  guest.get(`/auth-${strategyName}`, (req, res) => {
    const authenticate = passport.authenticate(
      strategyName,
      {
        scope: strategyConfig.scope,
        state: req.query.state,
      },
    )
    return authenticate(req, res)
  })
  guest.get(`/auth-${strategyName}-callback`, (req, res) => {
    const { state } = req.query
    const authenticate = passport.authenticate(
      strategyName,
      {},
      (error, result) => {
        if (error) {
          res.status(400)
          res.send(error)
        } else {
          res.redirect(
            `${AUTH_CONFIG.callbackURL}?${buildQueryString({
              data: result,
              state,
            })}`,
          )
        }
      },
    )
    return authenticate(req, res)
  })
})
