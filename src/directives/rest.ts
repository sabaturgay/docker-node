// import fetch from 'node-fetch'
import get from 'lodash.get'
import gql from 'graphql-tag'
import fs from 'fs'
import path from 'path'
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'

function restDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {

    // Executes once for each object field definition in the schema
    [MapperKind.FIELD]: (fieldConfig) => {
      const restDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (restDirective) {
        fieldConfig.resolve = async (_, args) => {
          let { url, body } = restDirective
          const {
            method,
            extractFromResponse,
            auth,
            headers,
          } = restDirective

          if (args) {
            Object.keys(args).forEach((arg) => {
              url = url.replace(`$${arg}`, args[arg])
            })
            Object.keys(args).forEach((arg) => {
              body = body.replace(`$${arg}`, args[arg])
            })
          }
          return fetch(url, {
            headers: [
              ['authorization', `Bearer ${process.env[auth]}`],
              ...headers,
            ],
            method,
            ...(
              method === 'POST'
                ? { body: eval(`(${body})`) }
                : {}
            ),
          })
            .then((response) => {
              if (!response.ok) {
                throw new RestError(response.statusText, response.status)
              }
              return response.json()
            })
            .then((data) => {
              if (extractFromResponse) {
                return get(data, extractFromResponse)
              }
              fs.writeFileSync(path.join(__dirname,
                'example.json'), JSON.stringify(data))

              return data
            })
        }
        return fieldConfig
      }
    },
  })
}

export const rest = {
  transformer: restDirectiveTransformer,
  directiveName: 'rest',
  definition: gql`
    directive @rest(
    url: String!,
    method: String = "GET",
    extractFromResponse: String,
    auth: String,
    body: String = "{}",
    headers: JSON,
  ) on FIELD_DEFINITION
  `,
}

class RestError extends Error {
  constructor(message = 'Error occured', code = 400) {
    super(message)
    this.code = code
  }
}
