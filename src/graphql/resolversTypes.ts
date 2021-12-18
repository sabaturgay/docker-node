import * as Client from '@prisma/client'

import { Context } from './context'

import { GraphQLResolveInfo } from 'graphql'

type Resolver<T extends {}, A extends {}, R extends any> = (
  parent: T,
  args: A,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<R>

export interface Resolvers {
  [key: string]: { [key: string]: Resolver<any, any, any> }
  Post?: Post
  Comment?: Comment
  User?: User
  Query?: Query
  Mutation?: Mutation
  AggregatePost?: AggregatePost
  PostGroupByOutputType?: PostGroupByOutputType
  AggregateComment?: AggregateComment
  CommentGroupByOutputType?: CommentGroupByOutputType
  AggregateUser?: AggregateUser
  UserGroupByOutputType?: UserGroupByOutputType
  AffectedRowsOutput?: AffectedRowsOutput
  PostCountOutputType?: PostCountOutputType
  PostCountAggregateOutputType?: PostCountAggregateOutputType
  PostMinAggregateOutputType?: PostMinAggregateOutputType
  PostMaxAggregateOutputType?: PostMaxAggregateOutputType
  CommentCountAggregateOutputType?: CommentCountAggregateOutputType
  CommentMinAggregateOutputType?: CommentMinAggregateOutputType
  CommentMaxAggregateOutputType?: CommentMaxAggregateOutputType
  UserCountOutputType?: UserCountOutputType
  UserCountAggregateOutputType?: UserCountAggregateOutputType
  UserMinAggregateOutputType?: UserMinAggregateOutputType
  UserMaxAggregateOutputType?: UserMaxAggregateOutputType
}

export interface Post {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Post, {}, string>
  slug?: Resolver<Client.Post, {}, string>
  title?: Resolver<Client.Post, {}, string>
  body?: Resolver<Client.Post, {}, string>
  comments?: Resolver<Client.Post, PostCommentsArgs, Client.Comment[] | null>
  user?: Resolver<Client.Post, {}, Client.User>
  userId?: Resolver<Client.Post, {}, string>
  _count?: Resolver<Client.Post, {}, Client.Prisma.PostCountOutputType>
}

export interface Comment {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Comment, {}, string>
  post?: Resolver<Client.Comment, {}, Client.Post>
  postId?: Resolver<Client.Comment, {}, string>
  comment?: Resolver<Client.Comment, {}, string>
}

export interface User {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.User, {}, string>
  uid?: Resolver<Client.User, {}, string>
  email?: Resolver<Client.User, {}, string>
  name?: Resolver<Client.User, {}, string>
  username?: Resolver<Client.User, {}, string>
  stripeId?: Resolver<Client.User, {}, string>
  phoneNumber?: Resolver<Client.User, {}, string | null>
  photoURL?: Resolver<Client.User, {}, string | null>
  posts?: Resolver<Client.User, UserPostsArgs, Client.Post[] | null>
  _count?: Resolver<Client.User, {}, Client.Prisma.UserCountOutputType>
}

export interface Query {
  [key: string]: Resolver<any, any, any>
  findFirstPost?: Resolver<{}, FindFirstPostArgs, Client.Post | null>
  findManyPost?: Resolver<{}, FindManyPostArgs, Client.Post[]>
  findManyPostCount?: Resolver<{}, FindManyPostArgs, number>
  aggregatePost?: Resolver<
    {},
    AggregatePostArgs,
    Client.Prisma.GetPostAggregateType<AggregatePostArgs>
  >
  groupByPost?: Resolver<
    {},
    GroupByPostArgs,
    Client.Prisma.PostGroupByOutputType[]
  >
  findUniquePost?: Resolver<{}, FindUniquePostArgs, Client.Post | null>
  findFirstComment?: Resolver<{}, FindFirstCommentArgs, Client.Comment | null>
  findManyComment?: Resolver<{}, FindManyCommentArgs, Client.Comment[]>
  findManyCommentCount?: Resolver<{}, FindManyCommentArgs, number>
  aggregateComment?: Resolver<
    {},
    AggregateCommentArgs,
    Client.Prisma.GetCommentAggregateType<AggregateCommentArgs>
  >
  groupByComment?: Resolver<
    {},
    GroupByCommentArgs,
    Client.Prisma.CommentGroupByOutputType[]
  >
  findUniqueComment?: Resolver<{}, FindUniqueCommentArgs, Client.Comment | null>
  findFirstUser?: Resolver<{}, FindFirstUserArgs, Client.User | null>
  findManyUser?: Resolver<{}, FindManyUserArgs, Client.User[]>
  findManyUserCount?: Resolver<{}, FindManyUserArgs, number>
  aggregateUser?: Resolver<
    {},
    AggregateUserArgs,
    Client.Prisma.GetUserAggregateType<AggregateUserArgs>
  >
  groupByUser?: Resolver<
    {},
    GroupByUserArgs,
    Client.Prisma.UserGroupByOutputType[]
  >
  findUniqueUser?: Resolver<{}, FindUniqueUserArgs, Client.User | null>
}

export interface Mutation {
  [key: string]: Resolver<any, any, any>
  createOnePost?: Resolver<{}, CreateOnePostArgs, Client.Post>
  upsertOnePost?: Resolver<{}, UpsertOnePostArgs, Client.Post>
  createManyPost?: Resolver<{}, CreateManyPostArgs, Client.Prisma.BatchPayload>
  deleteOnePost?: Resolver<{}, DeleteOnePostArgs, Client.Post | null>
  updateOnePost?: Resolver<{}, UpdateOnePostArgs, Client.Post | null>
  updateManyPost?: Resolver<{}, UpdateManyPostArgs, Client.Prisma.BatchPayload>
  deleteManyPost?: Resolver<{}, DeleteManyPostArgs, Client.Prisma.BatchPayload>
  createOneComment?: Resolver<{}, CreateOneCommentArgs, Client.Comment>
  upsertOneComment?: Resolver<{}, UpsertOneCommentArgs, Client.Comment>
  createManyComment?: Resolver<
    {},
    CreateManyCommentArgs,
    Client.Prisma.BatchPayload
  >
  deleteOneComment?: Resolver<{}, DeleteOneCommentArgs, Client.Comment | null>
  updateOneComment?: Resolver<{}, UpdateOneCommentArgs, Client.Comment | null>
  updateManyComment?: Resolver<
    {},
    UpdateManyCommentArgs,
    Client.Prisma.BatchPayload
  >
  deleteManyComment?: Resolver<
    {},
    DeleteManyCommentArgs,
    Client.Prisma.BatchPayload
  >
  createOneUser?: Resolver<{}, CreateOneUserArgs, Client.User>
  upsertOneUser?: Resolver<{}, UpsertOneUserArgs, Client.User>
  createManyUser?: Resolver<{}, CreateManyUserArgs, Client.Prisma.BatchPayload>
  deleteOneUser?: Resolver<{}, DeleteOneUserArgs, Client.User | null>
  updateOneUser?: Resolver<{}, UpdateOneUserArgs, Client.User | null>
  updateManyUser?: Resolver<{}, UpdateManyUserArgs, Client.Prisma.BatchPayload>
  deleteManyUser?: Resolver<{}, DeleteManyUserArgs, Client.Prisma.BatchPayload>
}

export interface AggregatePost {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregatePost,
    {},
    Client.Prisma.PostCountAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregatePost,
    {},
    Client.Prisma.PostMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregatePost,
    {},
    Client.Prisma.PostMaxAggregateOutputType | null
  >
}

export interface PostGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.PostGroupByOutputType, {}, string>
  slug?: Resolver<Client.Prisma.PostGroupByOutputType, {}, string>
  title?: Resolver<Client.Prisma.PostGroupByOutputType, {}, string>
  body?: Resolver<Client.Prisma.PostGroupByOutputType, {}, string>
  userId?: Resolver<Client.Prisma.PostGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.PostGroupByOutputType,
    {},
    Client.Prisma.PostCountAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.PostGroupByOutputType,
    {},
    Client.Prisma.PostMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.PostGroupByOutputType,
    {},
    Client.Prisma.PostMaxAggregateOutputType | null
  >
}

export interface AggregateComment {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateComment,
    {},
    Client.Prisma.CommentCountAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateComment,
    {},
    Client.Prisma.CommentMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateComment,
    {},
    Client.Prisma.CommentMaxAggregateOutputType | null
  >
}

export interface CommentGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.CommentGroupByOutputType, {}, string>
  postId?: Resolver<Client.Prisma.CommentGroupByOutputType, {}, string>
  comment?: Resolver<Client.Prisma.CommentGroupByOutputType, {}, string>
  _count?: Resolver<
    Client.Prisma.CommentGroupByOutputType,
    {},
    Client.Prisma.CommentCountAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.CommentGroupByOutputType,
    {},
    Client.Prisma.CommentMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.CommentGroupByOutputType,
    {},
    Client.Prisma.CommentMaxAggregateOutputType | null
  >
}

export interface AggregateUser {
  [key: string]: Resolver<any, any, any>
  _count?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.AggregateUser,
    {},
    Client.Prisma.UserMaxAggregateOutputType | null
  >
}

export interface UserGroupByOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  uid?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  email?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  name?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  username?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  stripeId?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string>
  phoneNumber?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string | null>
  photoURL?: Resolver<Client.Prisma.UserGroupByOutputType, {}, string | null>
  _count?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserCountAggregateOutputType | null
  >
  _min?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserMinAggregateOutputType | null
  >
  _max?: Resolver<
    Client.Prisma.UserGroupByOutputType,
    {},
    Client.Prisma.UserMaxAggregateOutputType | null
  >
}

export interface AffectedRowsOutput {
  [key: string]: Resolver<any, any, any>
  count?: Resolver<Client.Prisma.BatchPayload, {}, number>
}

export interface PostCountOutputType {
  [key: string]: Resolver<any, any, any>
  comments?: Resolver<Client.Prisma.PostCountOutputType, {}, number>
}

export interface PostCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.PostCountAggregateOutputType, {}, number>
  slug?: Resolver<Client.Prisma.PostCountAggregateOutputType, {}, number>
  title?: Resolver<Client.Prisma.PostCountAggregateOutputType, {}, number>
  body?: Resolver<Client.Prisma.PostCountAggregateOutputType, {}, number>
  userId?: Resolver<Client.Prisma.PostCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.PostCountAggregateOutputType, {}, number>
}

export interface PostMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.PostMinAggregateOutputType, {}, string | null>
  slug?: Resolver<Client.Prisma.PostMinAggregateOutputType, {}, string | null>
  title?: Resolver<Client.Prisma.PostMinAggregateOutputType, {}, string | null>
  body?: Resolver<Client.Prisma.PostMinAggregateOutputType, {}, string | null>
  userId?: Resolver<Client.Prisma.PostMinAggregateOutputType, {}, string | null>
}

export interface PostMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.PostMaxAggregateOutputType, {}, string | null>
  slug?: Resolver<Client.Prisma.PostMaxAggregateOutputType, {}, string | null>
  title?: Resolver<Client.Prisma.PostMaxAggregateOutputType, {}, string | null>
  body?: Resolver<Client.Prisma.PostMaxAggregateOutputType, {}, string | null>
  userId?: Resolver<Client.Prisma.PostMaxAggregateOutputType, {}, string | null>
}

export interface CommentCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.CommentCountAggregateOutputType, {}, number>
  postId?: Resolver<Client.Prisma.CommentCountAggregateOutputType, {}, number>
  comment?: Resolver<Client.Prisma.CommentCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.CommentCountAggregateOutputType, {}, number>
}

export interface CommentMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.CommentMinAggregateOutputType, {}, string | null>
  postId?: Resolver<
    Client.Prisma.CommentMinAggregateOutputType,
    {},
    string | null
  >
  comment?: Resolver<
    Client.Prisma.CommentMinAggregateOutputType,
    {},
    string | null
  >
}

export interface CommentMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.CommentMaxAggregateOutputType, {}, string | null>
  postId?: Resolver<
    Client.Prisma.CommentMaxAggregateOutputType,
    {},
    string | null
  >
  comment?: Resolver<
    Client.Prisma.CommentMaxAggregateOutputType,
    {},
    string | null
  >
}

export interface UserCountOutputType {
  [key: string]: Resolver<any, any, any>
  posts?: Resolver<Client.Prisma.UserCountOutputType, {}, number>
}

export interface UserCountAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  uid?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  email?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  name?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  username?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  stripeId?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  phoneNumber?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  photoURL?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
  _all?: Resolver<Client.Prisma.UserCountAggregateOutputType, {}, number>
}

export interface UserMinAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
  uid?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
  email?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
  name?: Resolver<Client.Prisma.UserMinAggregateOutputType, {}, string | null>
  username?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    string | null
  >
  stripeId?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    string | null
  >
  phoneNumber?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    string | null
  >
  photoURL?: Resolver<
    Client.Prisma.UserMinAggregateOutputType,
    {},
    string | null
  >
}

export interface UserMaxAggregateOutputType {
  [key: string]: Resolver<any, any, any>
  id?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
  uid?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
  email?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
  name?: Resolver<Client.Prisma.UserMaxAggregateOutputType, {}, string | null>
  username?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    string | null
  >
  stripeId?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    string | null
  >
  phoneNumber?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    string | null
  >
  photoURL?: Resolver<
    Client.Prisma.UserMaxAggregateOutputType,
    {},
    string | null
  >
}

export interface PostCommentsArgs {
  where?: CommentWhereInput | null
  orderBy?: CommentOrderByWithRelationInput[] | null
  cursor?: CommentWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: CommentScalarFieldEnum[] | null
}

export interface UserPostsArgs {
  where?: PostWhereInput | null
  orderBy?: PostOrderByWithRelationInput[] | null
  cursor?: PostWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: PostScalarFieldEnum[] | null
}

export interface FindFirstPostArgs {
  where?: PostWhereInput | null
  orderBy?: PostOrderByWithRelationInput[] | null
  cursor?: PostWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: PostScalarFieldEnum[] | null
}

export interface FindManyPostArgs {
  where?: PostWhereInput
  orderBy?: PostOrderByWithRelationInput[]
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  distinct?: PostScalarFieldEnum[]
}

export interface AggregatePostArgs {
  where?: PostWhereInput
  orderBy?: PostOrderByWithRelationInput[]
  cursor?: PostWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.PostCountAggregateInputType
  _min?: Client.Prisma.PostMinAggregateInputType
  _max?: Client.Prisma.PostMaxAggregateInputType
}

export interface GroupByPostArgs {
  where?: PostWhereInput
  orderBy?: PostOrderByWithAggregationInput[]
  by: PostScalarFieldEnum[]
  having?: PostScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniquePostArgs {
  where: PostWhereUniqueInput | null
}

export interface FindFirstCommentArgs {
  where?: CommentWhereInput | null
  orderBy?: CommentOrderByWithRelationInput[] | null
  cursor?: CommentWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: CommentScalarFieldEnum[] | null
}

export interface FindManyCommentArgs {
  where?: CommentWhereInput
  orderBy?: CommentOrderByWithRelationInput[]
  cursor?: CommentWhereUniqueInput
  take?: number
  skip?: number
  distinct?: CommentScalarFieldEnum[]
}

export interface AggregateCommentArgs {
  where?: CommentWhereInput
  orderBy?: CommentOrderByWithRelationInput[]
  cursor?: CommentWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.CommentCountAggregateInputType
  _min?: Client.Prisma.CommentMinAggregateInputType
  _max?: Client.Prisma.CommentMaxAggregateInputType
}

export interface GroupByCommentArgs {
  where?: CommentWhereInput
  orderBy?: CommentOrderByWithAggregationInput[]
  by: CommentScalarFieldEnum[]
  having?: CommentScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueCommentArgs {
  where: CommentWhereUniqueInput | null
}

export interface FindFirstUserArgs {
  where?: UserWhereInput | null
  orderBy?: UserOrderByWithRelationInput[] | null
  cursor?: UserWhereUniqueInput | null
  take?: number | null
  skip?: number | null
  distinct?: UserScalarFieldEnum[] | null
}

export interface FindManyUserArgs {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: UserScalarFieldEnum[]
}

export interface AggregateUserArgs {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  _count?: Client.Prisma.UserCountAggregateInputType
  _min?: Client.Prisma.UserMinAggregateInputType
  _max?: Client.Prisma.UserMaxAggregateInputType
}

export interface GroupByUserArgs {
  where?: UserWhereInput
  orderBy?: UserOrderByWithAggregationInput[]
  by: UserScalarFieldEnum[]
  having?: UserScalarWhereWithAggregatesInput
  take?: number
  skip?: number
}

export interface FindUniqueUserArgs {
  where: UserWhereUniqueInput | null
}

export interface CreateOnePostArgs {
  data: PostCreateInput
}

export interface UpsertOnePostArgs {
  where: PostWhereUniqueInput
  create: PostCreateInput
  update: PostUpdateInput
}

export interface CreateManyPostArgs {
  data: PostCreateManyInput[]
}

export interface DeleteOnePostArgs {
  where: PostWhereUniqueInput | null
}

export interface UpdateOnePostArgs {
  data: PostUpdateInput | null
  where: PostWhereUniqueInput | null
}

export interface UpdateManyPostArgs {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}

export interface DeleteManyPostArgs {
  where?: PostWhereInput
}

export interface CreateOneCommentArgs {
  data: CommentCreateInput
}

export interface UpsertOneCommentArgs {
  where: CommentWhereUniqueInput
  create: CommentCreateInput
  update: CommentUpdateInput
}

export interface CreateManyCommentArgs {
  data: CommentCreateManyInput[]
}

export interface DeleteOneCommentArgs {
  where: CommentWhereUniqueInput | null
}

export interface UpdateOneCommentArgs {
  data: CommentUpdateInput | null
  where: CommentWhereUniqueInput | null
}

export interface UpdateManyCommentArgs {
  data: CommentUpdateManyMutationInput
  where?: CommentWhereInput
}

export interface DeleteManyCommentArgs {
  where?: CommentWhereInput
}

export interface CreateOneUserArgs {
  data: UserCreateInput
}

export interface UpsertOneUserArgs {
  where: UserWhereUniqueInput
  create: UserCreateInput
  update: UserUpdateInput
}

export interface CreateManyUserArgs {
  data: UserCreateManyInput[]
}

export interface DeleteOneUserArgs {
  where: UserWhereUniqueInput | null
}

export interface UpdateOneUserArgs {
  data: UserUpdateInput | null
  where: UserWhereUniqueInput | null
}

export interface UpdateManyUserArgs {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}

export interface DeleteManyUserArgs {
  where?: UserWhereInput
}

export interface PostWhereInput {
  AND?: PostWhereInput[]
  OR?: PostWhereInput[]
  NOT?: PostWhereInput[]
  id?: StringFilter
  slug?: StringFilter
  title?: StringFilter
  body?: StringFilter
  comments?: CommentListRelationFilter
  user?: UserWhereInput
  userId?: StringFilter
}

export interface PostOrderByWithRelationInput {
  id?: SortOrder
  slug?: SortOrder
  title?: SortOrder
  body?: SortOrder
  comments?: CommentOrderByRelationAggregateInput
  user?: UserOrderByWithRelationInput
  userId?: SortOrder
}

export interface PostWhereUniqueInput {
  id?: string
  slug?: string
}

export interface PostOrderByWithAggregationInput {
  id?: SortOrder
  slug?: SortOrder
  title?: SortOrder
  body?: SortOrder
  userId?: SortOrder
  _count?: PostCountOrderByAggregateInput
  _max?: PostMaxOrderByAggregateInput
  _min?: PostMinOrderByAggregateInput
}

export interface PostScalarWhereWithAggregatesInput {
  AND?: PostScalarWhereWithAggregatesInput[]
  OR?: PostScalarWhereWithAggregatesInput[]
  NOT?: PostScalarWhereWithAggregatesInput[]
  id?: StringWithAggregatesFilter
  slug?: StringWithAggregatesFilter
  title?: StringWithAggregatesFilter
  body?: StringWithAggregatesFilter
  userId?: StringWithAggregatesFilter
}

export interface CommentWhereInput {
  AND?: CommentWhereInput[]
  OR?: CommentWhereInput[]
  NOT?: CommentWhereInput[]
  id?: StringFilter
  post?: PostWhereInput
  postId?: StringFilter
  comment?: StringFilter
}

export interface CommentOrderByWithRelationInput {
  id?: SortOrder
  post?: PostOrderByWithRelationInput
  postId?: SortOrder
  comment?: SortOrder
}

export interface CommentWhereUniqueInput {
  id?: string
}

export interface CommentOrderByWithAggregationInput {
  id?: SortOrder
  postId?: SortOrder
  comment?: SortOrder
  _count?: CommentCountOrderByAggregateInput
  _max?: CommentMaxOrderByAggregateInput
  _min?: CommentMinOrderByAggregateInput
}

export interface CommentScalarWhereWithAggregatesInput {
  AND?: CommentScalarWhereWithAggregatesInput[]
  OR?: CommentScalarWhereWithAggregatesInput[]
  NOT?: CommentScalarWhereWithAggregatesInput[]
  id?: StringWithAggregatesFilter
  postId?: StringWithAggregatesFilter
  comment?: StringWithAggregatesFilter
}

export interface UserWhereInput {
  AND?: UserWhereInput[]
  OR?: UserWhereInput[]
  NOT?: UserWhereInput[]
  id?: StringFilter
  uid?: StringFilter
  email?: StringFilter
  name?: StringFilter
  username?: StringFilter
  stripeId?: StringFilter
  phoneNumber?: StringNullableFilter | null
  photoURL?: StringNullableFilter | null
  posts?: PostListRelationFilter
}

export interface UserOrderByWithRelationInput {
  id?: SortOrder
  uid?: SortOrder
  email?: SortOrder
  name?: SortOrder
  username?: SortOrder
  stripeId?: SortOrder
  phoneNumber?: SortOrder
  photoURL?: SortOrder
  posts?: PostOrderByRelationAggregateInput
}

export interface UserWhereUniqueInput {
  id?: string
  uid?: string
  email?: string
}

export interface UserOrderByWithAggregationInput {
  id?: SortOrder
  uid?: SortOrder
  email?: SortOrder
  name?: SortOrder
  username?: SortOrder
  stripeId?: SortOrder
  phoneNumber?: SortOrder
  photoURL?: SortOrder
  _count?: UserCountOrderByAggregateInput
  _max?: UserMaxOrderByAggregateInput
  _min?: UserMinOrderByAggregateInput
}

export interface UserScalarWhereWithAggregatesInput {
  AND?: UserScalarWhereWithAggregatesInput[]
  OR?: UserScalarWhereWithAggregatesInput[]
  NOT?: UserScalarWhereWithAggregatesInput[]
  id?: StringWithAggregatesFilter
  uid?: StringWithAggregatesFilter
  email?: StringWithAggregatesFilter
  name?: StringWithAggregatesFilter
  username?: StringWithAggregatesFilter
  stripeId?: StringWithAggregatesFilter
  phoneNumber?: StringNullableWithAggregatesFilter | null
  photoURL?: StringNullableWithAggregatesFilter | null
}

export interface PostCreateInput {
  id?: string
  slug: string
  title: string
  body: string
  comments?: CommentCreateNestedManyWithoutPostInput
  user: UserCreateNestedOneWithoutPostsInput
}

export interface PostUncheckedCreateInput {
  id?: string
  slug: string
  title: string
  body: string
  userId: string
  comments?: CommentUncheckedCreateNestedManyWithoutPostInput
}

export interface PostUpdateInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
  comments?: CommentUpdateManyWithoutPostInput
  user?: UserUpdateOneRequiredWithoutPostsInput
}

export interface PostUncheckedUpdateInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
  userId?: StringFieldUpdateOperationsInput
  comments?: CommentUncheckedUpdateManyWithoutPostInput
}

export interface PostCreateManyInput {
  id?: string
  slug: string
  title: string
  body: string
  userId: string
}

export interface PostUpdateManyMutationInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
}

export interface PostUncheckedUpdateManyInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
  userId?: StringFieldUpdateOperationsInput
}

export interface CommentCreateInput {
  id?: string
  comment: string
  post: PostCreateNestedOneWithoutCommentsInput
}

export interface CommentUncheckedCreateInput {
  id?: string
  postId: string
  comment: string
}

export interface CommentUpdateInput {
  comment?: StringFieldUpdateOperationsInput
  post?: PostUpdateOneRequiredWithoutCommentsInput
}

export interface CommentUncheckedUpdateInput {
  postId?: StringFieldUpdateOperationsInput
  comment?: StringFieldUpdateOperationsInput
}

export interface CommentCreateManyInput {
  id?: string
  postId: string
  comment: string
}

export interface CommentUpdateManyMutationInput {
  comment?: StringFieldUpdateOperationsInput
}

export interface CommentUncheckedUpdateManyInput {
  postId?: StringFieldUpdateOperationsInput
  comment?: StringFieldUpdateOperationsInput
}

export interface UserCreateInput {
  id?: string
  uid: string
  email: string
  name: string
  username: string
  stripeId: string
  phoneNumber?: string | null
  photoURL?: string | null
  posts?: PostCreateNestedManyWithoutUserInput
}

export interface UserUncheckedCreateInput {
  id?: string
  uid: string
  email: string
  name: string
  username: string
  stripeId: string
  phoneNumber?: string | null
  photoURL?: string | null
  posts?: PostUncheckedCreateNestedManyWithoutUserInput
}

export interface UserUpdateInput {
  uid?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  username?: StringFieldUpdateOperationsInput
  stripeId?: StringFieldUpdateOperationsInput
  phoneNumber?: NullableStringFieldUpdateOperationsInput | null
  photoURL?: NullableStringFieldUpdateOperationsInput | null
  posts?: PostUpdateManyWithoutUserInput
}

export interface UserUncheckedUpdateInput {
  uid?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  username?: StringFieldUpdateOperationsInput
  stripeId?: StringFieldUpdateOperationsInput
  phoneNumber?: NullableStringFieldUpdateOperationsInput | null
  photoURL?: NullableStringFieldUpdateOperationsInput | null
  posts?: PostUncheckedUpdateManyWithoutUserInput
}

export interface UserCreateManyInput {
  id?: string
  uid: string
  email: string
  name: string
  username: string
  stripeId: string
  phoneNumber?: string | null
  photoURL?: string | null
}

export interface UserUpdateManyMutationInput {
  uid?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  username?: StringFieldUpdateOperationsInput
  stripeId?: StringFieldUpdateOperationsInput
  phoneNumber?: NullableStringFieldUpdateOperationsInput | null
  photoURL?: NullableStringFieldUpdateOperationsInput | null
}

export interface UserUncheckedUpdateManyInput {
  uid?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  username?: StringFieldUpdateOperationsInput
  stripeId?: StringFieldUpdateOperationsInput
  phoneNumber?: NullableStringFieldUpdateOperationsInput | null
  photoURL?: NullableStringFieldUpdateOperationsInput | null
}

export interface StringFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: NestedStringFilter
}

export interface CommentListRelationFilter {
  every?: CommentWhereInput
  some?: CommentWhereInput
  none?: CommentWhereInput
}

export interface UserRelationFilter {
  is?: UserWhereInput
  isNot?: UserWhereInput
}

export interface CommentOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface PostCountOrderByAggregateInput {
  id?: SortOrder
  slug?: SortOrder
  title?: SortOrder
  body?: SortOrder
  userId?: SortOrder
}

export interface PostMaxOrderByAggregateInput {
  id?: SortOrder
  slug?: SortOrder
  title?: SortOrder
  body?: SortOrder
  userId?: SortOrder
}

export interface PostMinOrderByAggregateInput {
  id?: SortOrder
  slug?: SortOrder
  title?: SortOrder
  body?: SortOrder
  userId?: SortOrder
}

export interface StringWithAggregatesFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: NestedStringWithAggregatesFilter
  _count?: NestedIntFilter
  _min?: NestedStringFilter
  _max?: NestedStringFilter
}

export interface PostRelationFilter {
  is?: PostWhereInput
  isNot?: PostWhereInput
}

export interface CommentCountOrderByAggregateInput {
  id?: SortOrder
  postId?: SortOrder
  comment?: SortOrder
}

export interface CommentMaxOrderByAggregateInput {
  id?: SortOrder
  postId?: SortOrder
  comment?: SortOrder
}

export interface CommentMinOrderByAggregateInput {
  id?: SortOrder
  postId?: SortOrder
  comment?: SortOrder
}

export interface StringNullableFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: NestedStringNullableFilter | null
}

export interface PostListRelationFilter {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export interface PostOrderByRelationAggregateInput {
  _count?: SortOrder
}

export interface UserCountOrderByAggregateInput {
  id?: SortOrder
  uid?: SortOrder
  email?: SortOrder
  name?: SortOrder
  username?: SortOrder
  stripeId?: SortOrder
  phoneNumber?: SortOrder
  photoURL?: SortOrder
}

export interface UserMaxOrderByAggregateInput {
  id?: SortOrder
  uid?: SortOrder
  email?: SortOrder
  name?: SortOrder
  username?: SortOrder
  stripeId?: SortOrder
  phoneNumber?: SortOrder
  photoURL?: SortOrder
}

export interface UserMinOrderByAggregateInput {
  id?: SortOrder
  uid?: SortOrder
  email?: SortOrder
  name?: SortOrder
  username?: SortOrder
  stripeId?: SortOrder
  phoneNumber?: SortOrder
  photoURL?: SortOrder
}

export interface StringNullableWithAggregatesFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: NestedStringNullableWithAggregatesFilter | null
  _count?: NestedIntNullableFilter
  _min?: NestedStringNullableFilter
  _max?: NestedStringNullableFilter
}

export interface CommentCreateNestedManyWithoutPostInput {
  create?: CommentCreateWithoutPostInput[]
  connectOrCreate?: CommentCreateOrConnectWithoutPostInput[]
  createMany?: CommentCreateManyPostInputEnvelope
  connect?: CommentWhereUniqueInput[]
}

export interface UserCreateNestedOneWithoutPostsInput {
  create?: UserUncheckedCreateWithoutPostsInput
  connectOrCreate?: UserCreateOrConnectWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export interface CommentUncheckedCreateNestedManyWithoutPostInput {
  create?: CommentCreateWithoutPostInput[]
  connectOrCreate?: CommentCreateOrConnectWithoutPostInput[]
  createMany?: CommentCreateManyPostInputEnvelope
  connect?: CommentWhereUniqueInput[]
}

export interface StringFieldUpdateOperationsInput {
  set?: string
}

export interface CommentUpdateManyWithoutPostInput {
  create?: CommentCreateWithoutPostInput[]
  connectOrCreate?: CommentCreateOrConnectWithoutPostInput[]
  upsert?: CommentUpsertWithWhereUniqueWithoutPostInput[]
  createMany?: CommentCreateManyPostInputEnvelope
  set?: CommentWhereUniqueInput[]
  disconnect?: CommentWhereUniqueInput[]
  delete?: CommentWhereUniqueInput[]
  connect?: CommentWhereUniqueInput[]
  update?: CommentUpdateWithWhereUniqueWithoutPostInput[]
  updateMany?: CommentUpdateManyWithWhereWithoutPostInput[]
  deleteMany?: CommentScalarWhereInput[]
}

export interface UserUpdateOneRequiredWithoutPostsInput {
  create?: UserUncheckedCreateWithoutPostsInput
  connectOrCreate?: UserCreateOrConnectWithoutPostsInput
  upsert?: UserUpsertWithoutPostsInput
  connect?: UserWhereUniqueInput
  update?: UserUncheckedUpdateWithoutPostsInput
}

export interface CommentUncheckedUpdateManyWithoutPostInput {
  create?: CommentCreateWithoutPostInput[]
  connectOrCreate?: CommentCreateOrConnectWithoutPostInput[]
  upsert?: CommentUpsertWithWhereUniqueWithoutPostInput[]
  createMany?: CommentCreateManyPostInputEnvelope
  set?: CommentWhereUniqueInput[]
  disconnect?: CommentWhereUniqueInput[]
  delete?: CommentWhereUniqueInput[]
  connect?: CommentWhereUniqueInput[]
  update?: CommentUpdateWithWhereUniqueWithoutPostInput[]
  updateMany?: CommentUpdateManyWithWhereWithoutPostInput[]
  deleteMany?: CommentScalarWhereInput[]
}

export interface PostCreateNestedOneWithoutCommentsInput {
  create?: PostUncheckedCreateWithoutCommentsInput
  connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
  connect?: PostWhereUniqueInput
}

export interface PostUpdateOneRequiredWithoutCommentsInput {
  create?: PostUncheckedCreateWithoutCommentsInput
  connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
  upsert?: PostUpsertWithoutCommentsInput
  connect?: PostWhereUniqueInput
  update?: PostUncheckedUpdateWithoutCommentsInput
}

export interface PostCreateNestedManyWithoutUserInput {
  create?: PostCreateWithoutUserInput[]
  connectOrCreate?: PostCreateOrConnectWithoutUserInput[]
  createMany?: PostCreateManyUserInputEnvelope
  connect?: PostWhereUniqueInput[]
}

export interface PostUncheckedCreateNestedManyWithoutUserInput {
  create?: PostCreateWithoutUserInput[]
  connectOrCreate?: PostCreateOrConnectWithoutUserInput[]
  createMany?: PostCreateManyUserInputEnvelope
  connect?: PostWhereUniqueInput[]
}

export interface NullableStringFieldUpdateOperationsInput {
  set?: string | null
}

export interface PostUpdateManyWithoutUserInput {
  create?: PostCreateWithoutUserInput[]
  connectOrCreate?: PostCreateOrConnectWithoutUserInput[]
  upsert?: PostUpsertWithWhereUniqueWithoutUserInput[]
  createMany?: PostCreateManyUserInputEnvelope
  set?: PostWhereUniqueInput[]
  disconnect?: PostWhereUniqueInput[]
  delete?: PostWhereUniqueInput[]
  connect?: PostWhereUniqueInput[]
  update?: PostUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: PostUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: PostScalarWhereInput[]
}

export interface PostUncheckedUpdateManyWithoutUserInput {
  create?: PostCreateWithoutUserInput[]
  connectOrCreate?: PostCreateOrConnectWithoutUserInput[]
  upsert?: PostUpsertWithWhereUniqueWithoutUserInput[]
  createMany?: PostCreateManyUserInputEnvelope
  set?: PostWhereUniqueInput[]
  disconnect?: PostWhereUniqueInput[]
  delete?: PostWhereUniqueInput[]
  connect?: PostWhereUniqueInput[]
  update?: PostUpdateWithWhereUniqueWithoutUserInput[]
  updateMany?: PostUpdateManyWithWhereWithoutUserInput[]
  deleteMany?: PostScalarWhereInput[]
}

export interface NestedStringFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringFilter
}

export interface NestedStringWithAggregatesFilter {
  equals?: string
  in?: string[]
  notIn?: string[]
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringWithAggregatesFilter
  _count?: NestedIntFilter
  _min?: NestedStringFilter
  _max?: NestedStringFilter
}

export interface NestedIntFilter {
  equals?: number
  in?: number[]
  notIn?: number[]
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntFilter
}

export interface NestedStringNullableFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringNullableFilter | null
}

export interface NestedStringNullableWithAggregatesFilter {
  equals?: string | null
  in?: string[] | null
  notIn?: string[] | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: NestedStringNullableWithAggregatesFilter | null
  _count?: NestedIntNullableFilter
  _min?: NestedStringNullableFilter
  _max?: NestedStringNullableFilter
}

export interface NestedIntNullableFilter {
  equals?: number | null
  in?: number[] | null
  notIn?: number[] | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: NestedIntNullableFilter | null
}

export interface CommentCreateWithoutPostInput {
  id?: string
  comment: string
}

export interface CommentUncheckedCreateWithoutPostInput {
  id?: string
  comment: string
}

export interface CommentCreateOrConnectWithoutPostInput {
  where: CommentWhereUniqueInput
  create: CommentUncheckedCreateWithoutPostInput
}

export interface CommentCreateManyPostInputEnvelope {
  data: CommentCreateManyPostInput[]
}

export interface UserCreateWithoutPostsInput {
  id?: string
  uid: string
  email: string
  name: string
  username: string
  stripeId: string
  phoneNumber?: string | null
  photoURL?: string | null
}

export interface UserUncheckedCreateWithoutPostsInput {
  id?: string
  uid: string
  email: string
  name: string
  username: string
  stripeId: string
  phoneNumber?: string | null
  photoURL?: string | null
}

export interface UserCreateOrConnectWithoutPostsInput {
  where: UserWhereUniqueInput
  create: UserUncheckedCreateWithoutPostsInput
}

export interface CommentUpsertWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput
  update: CommentUncheckedUpdateWithoutPostInput
  create: CommentUncheckedCreateWithoutPostInput
}

export interface CommentUpdateWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput
  data: CommentUncheckedUpdateWithoutPostInput
}

export interface CommentUpdateManyWithWhereWithoutPostInput {
  where: CommentScalarWhereInput
  data: CommentUncheckedUpdateManyWithoutCommentsInput
}

export interface CommentScalarWhereInput {
  AND?: CommentScalarWhereInput[]
  OR?: CommentScalarWhereInput[]
  NOT?: CommentScalarWhereInput[]
  id?: StringFilter
  postId?: StringFilter
  comment?: StringFilter
}

export interface UserUpsertWithoutPostsInput {
  update: UserUncheckedUpdateWithoutPostsInput
  create: UserUncheckedCreateWithoutPostsInput
}

export interface UserUpdateWithoutPostsInput {
  uid?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  username?: StringFieldUpdateOperationsInput
  stripeId?: StringFieldUpdateOperationsInput
  phoneNumber?: NullableStringFieldUpdateOperationsInput | null
  photoURL?: NullableStringFieldUpdateOperationsInput | null
}

export interface UserUncheckedUpdateWithoutPostsInput {
  uid?: StringFieldUpdateOperationsInput
  email?: StringFieldUpdateOperationsInput
  name?: StringFieldUpdateOperationsInput
  username?: StringFieldUpdateOperationsInput
  stripeId?: StringFieldUpdateOperationsInput
  phoneNumber?: NullableStringFieldUpdateOperationsInput | null
  photoURL?: NullableStringFieldUpdateOperationsInput | null
}

export interface PostCreateWithoutCommentsInput {
  id?: string
  slug: string
  title: string
  body: string
  user: UserCreateNestedOneWithoutPostsInput
}

export interface PostUncheckedCreateWithoutCommentsInput {
  id?: string
  slug: string
  title: string
  body: string
  userId: string
}

export interface PostCreateOrConnectWithoutCommentsInput {
  where: PostWhereUniqueInput
  create: PostUncheckedCreateWithoutCommentsInput
}

export interface PostUpsertWithoutCommentsInput {
  update: PostUncheckedUpdateWithoutCommentsInput
  create: PostUncheckedCreateWithoutCommentsInput
}

export interface PostUpdateWithoutCommentsInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
  user?: UserUpdateOneRequiredWithoutPostsInput
}

export interface PostUncheckedUpdateWithoutCommentsInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
  userId?: StringFieldUpdateOperationsInput
}

export interface PostCreateWithoutUserInput {
  id?: string
  slug: string
  title: string
  body: string
  comments?: CommentCreateNestedManyWithoutPostInput
}

export interface PostUncheckedCreateWithoutUserInput {
  id?: string
  slug: string
  title: string
  body: string
  comments?: CommentUncheckedCreateNestedManyWithoutPostInput
}

export interface PostCreateOrConnectWithoutUserInput {
  where: PostWhereUniqueInput
  create: PostUncheckedCreateWithoutUserInput
}

export interface PostCreateManyUserInputEnvelope {
  data: PostCreateManyUserInput[]
}

export interface PostUpsertWithWhereUniqueWithoutUserInput {
  where: PostWhereUniqueInput
  update: PostUncheckedUpdateWithoutUserInput
  create: PostUncheckedCreateWithoutUserInput
}

export interface PostUpdateWithWhereUniqueWithoutUserInput {
  where: PostWhereUniqueInput
  data: PostUncheckedUpdateWithoutUserInput
}

export interface PostUpdateManyWithWhereWithoutUserInput {
  where: PostScalarWhereInput
  data: PostUncheckedUpdateManyWithoutPostsInput
}

export interface PostScalarWhereInput {
  AND?: PostScalarWhereInput[]
  OR?: PostScalarWhereInput[]
  NOT?: PostScalarWhereInput[]
  id?: StringFilter
  slug?: StringFilter
  title?: StringFilter
  body?: StringFilter
  userId?: StringFilter
}

export interface CommentCreateManyPostInput {
  id?: string
  comment: string
}

export interface CommentUpdateWithoutPostInput {
  comment?: StringFieldUpdateOperationsInput
}

export interface CommentUncheckedUpdateWithoutPostInput {
  comment?: StringFieldUpdateOperationsInput
}

export interface CommentUncheckedUpdateManyWithoutCommentsInput {
  comment?: StringFieldUpdateOperationsInput
}

export interface PostCreateManyUserInput {
  id?: string
  slug: string
  title: string
  body: string
}

export interface PostUpdateWithoutUserInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
  comments?: CommentUpdateManyWithoutPostInput
}

export interface PostUncheckedUpdateWithoutUserInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
  comments?: CommentUncheckedUpdateManyWithoutPostInput
}

export interface PostUncheckedUpdateManyWithoutPostsInput {
  slug?: StringFieldUpdateOperationsInput
  title?: StringFieldUpdateOperationsInput
  body?: StringFieldUpdateOperationsInput
}

export enum PostScalarFieldEnum {
  id = 'id',
  slug = 'slug',
  title = 'title',
  body = 'body',
  userId = 'userId',
}
export enum CommentScalarFieldEnum {
  id = 'id',
  postId = 'postId',
  comment = 'comment',
}
export enum UserScalarFieldEnum {
  id = 'id',
  uid = 'uid',
  email = 'email',
  name = 'name',
  username = 'username',
  stripeId = 'stripeId',
  phoneNumber = 'phoneNumber',
  photoURL = 'photoURL',
}
export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive',
}
