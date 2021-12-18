import User from './User/typeDefs'
import Comment from './Comment/typeDefs'
import Post from './Post/typeDefs'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { sdlInputs } from '@paljs/plugins'

export default mergeTypeDefs([sdlInputs(), Post, Comment, User])
