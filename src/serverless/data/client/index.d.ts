
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model DataItem
 * 
 */
export type DataItem = {
  id: string
  body: Prisma.JsonValue
  tags: string[]
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DataItems
 * const dataItems = await prisma.dataItem.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DataItems
   * const dataItems = await prisma.dataItem.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void



  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


      /**
   * `prisma.dataItem`: Exposes CRUD operations for the **DataItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataItems
    * const dataItems = await prisma.dataItem.findMany()
    * ```
    */
  get dataItem(): Prisma.DataItemDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.5.0
   * Query Engine version: 78a5df6def6943431f4c022e1428dbc3e833cf8e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    DataItem: 'DataItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model DataItem
   */


  export type AggregateDataItem = {
    _count: DataItemCountAggregateOutputType | null
    _min: DataItemMinAggregateOutputType | null
    _max: DataItemMaxAggregateOutputType | null
  }

  export type DataItemMinAggregateOutputType = {
    id: string | null
  }

  export type DataItemMaxAggregateOutputType = {
    id: string | null
  }

  export type DataItemCountAggregateOutputType = {
    id: number
    body: number
    tags: number
    _all: number
  }


  export type DataItemMinAggregateInputType = {
    id?: true
  }

  export type DataItemMaxAggregateInputType = {
    id?: true
  }

  export type DataItemCountAggregateInputType = {
    id?: true
    body?: true
    tags?: true
    _all?: true
  }

  export type DataItemAggregateArgs = {
    /**
     * Filter which DataItem to aggregate.
     * 
    **/
    where?: DataItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataItems to fetch.
     * 
    **/
    orderBy?: Enumerable<DataItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DataItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataItems
    **/
    _count?: true | DataItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataItemMaxAggregateInputType
  }

  export type GetDataItemAggregateType<T extends DataItemAggregateArgs> = {
        [P in keyof T & keyof AggregateDataItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataItem[P]>
      : GetScalarType<T[P], AggregateDataItem[P]>
  }




  export type DataItemGroupByArgs = {
    where?: DataItemWhereInput
    orderBy?: Enumerable<DataItemOrderByWithAggregationInput>
    by: Array<DataItemScalarFieldEnum>
    having?: DataItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataItemCountAggregateInputType | true
    _min?: DataItemMinAggregateInputType
    _max?: DataItemMaxAggregateInputType
  }


  export type DataItemGroupByOutputType = {
    id: string
    body: JsonValue
    tags: string[]
    _count: DataItemCountAggregateOutputType | null
    _min: DataItemMinAggregateOutputType | null
    _max: DataItemMaxAggregateOutputType | null
  }

  type GetDataItemGroupByPayload<T extends DataItemGroupByArgs> = Promise<
    Array<
      PickArray<DataItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataItemGroupByOutputType[P]>
            : GetScalarType<T[P], DataItemGroupByOutputType[P]>
        }
      >
    >


  export type DataItemSelect = {
    id?: boolean
    body?: boolean
    tags?: boolean
  }

  export type DataItemGetPayload<
    S extends boolean | null | undefined | DataItemArgs,
    U = keyof S
      > = S extends true
        ? DataItem
    : S extends undefined
    ? never
    : S extends DataItemArgs | DataItemFindManyArgs
    ?'include' extends U
    ? DataItem 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof DataItem ?DataItem [P]
  : 
     never
  } 
    : DataItem
  : DataItem


  type DataItemCountArgs = Merge<
    Omit<DataItemFindManyArgs, 'select' | 'include'> & {
      select?: DataItemCountAggregateInputType | true
    }
  >

  export interface DataItemDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DataItem that matches the filter.
     * @param {DataItemFindUniqueArgs} args - Arguments to find a DataItem
     * @example
     * // Get one DataItem
     * const dataItem = await prisma.dataItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DataItemFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DataItemFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DataItem'> extends True ? CheckSelect<T, Prisma__DataItemClient<DataItem>, Prisma__DataItemClient<DataItemGetPayload<T>>> : CheckSelect<T, Prisma__DataItemClient<DataItem | null >, Prisma__DataItemClient<DataItemGetPayload<T> | null >>

    /**
     * Find the first DataItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataItemFindFirstArgs} args - Arguments to find a DataItem
     * @example
     * // Get one DataItem
     * const dataItem = await prisma.dataItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DataItemFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DataItemFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DataItem'> extends True ? CheckSelect<T, Prisma__DataItemClient<DataItem>, Prisma__DataItemClient<DataItemGetPayload<T>>> : CheckSelect<T, Prisma__DataItemClient<DataItem | null >, Prisma__DataItemClient<DataItemGetPayload<T> | null >>

    /**
     * Find zero or more DataItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataItemFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataItems
     * const dataItems = await prisma.dataItem.findMany()
     * 
     * // Get first 10 DataItems
     * const dataItems = await prisma.dataItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dataItemWithIdOnly = await prisma.dataItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DataItemFindManyArgs>(
      args?: SelectSubset<T, DataItemFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DataItem>>, PrismaPromise<Array<DataItemGetPayload<T>>>>

    /**
     * Create a DataItem.
     * @param {DataItemCreateArgs} args - Arguments to create a DataItem.
     * @example
     * // Create one DataItem
     * const DataItem = await prisma.dataItem.create({
     *   data: {
     *     // ... data to create a DataItem
     *   }
     * })
     * 
    **/
    create<T extends DataItemCreateArgs>(
      args: SelectSubset<T, DataItemCreateArgs>
    ): CheckSelect<T, Prisma__DataItemClient<DataItem>, Prisma__DataItemClient<DataItemGetPayload<T>>>

    /**
     * Create many DataItems.
     *     @param {DataItemCreateManyArgs} args - Arguments to create many DataItems.
     *     @example
     *     // Create many DataItems
     *     const dataItem = await prisma.dataItem.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DataItemCreateManyArgs>(
      args?: SelectSubset<T, DataItemCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DataItem.
     * @param {DataItemDeleteArgs} args - Arguments to delete one DataItem.
     * @example
     * // Delete one DataItem
     * const DataItem = await prisma.dataItem.delete({
     *   where: {
     *     // ... filter to delete one DataItem
     *   }
     * })
     * 
    **/
    delete<T extends DataItemDeleteArgs>(
      args: SelectSubset<T, DataItemDeleteArgs>
    ): CheckSelect<T, Prisma__DataItemClient<DataItem>, Prisma__DataItemClient<DataItemGetPayload<T>>>

    /**
     * Update one DataItem.
     * @param {DataItemUpdateArgs} args - Arguments to update one DataItem.
     * @example
     * // Update one DataItem
     * const dataItem = await prisma.dataItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DataItemUpdateArgs>(
      args: SelectSubset<T, DataItemUpdateArgs>
    ): CheckSelect<T, Prisma__DataItemClient<DataItem>, Prisma__DataItemClient<DataItemGetPayload<T>>>

    /**
     * Delete zero or more DataItems.
     * @param {DataItemDeleteManyArgs} args - Arguments to filter DataItems to delete.
     * @example
     * // Delete a few DataItems
     * const { count } = await prisma.dataItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DataItemDeleteManyArgs>(
      args?: SelectSubset<T, DataItemDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataItems
     * const dataItem = await prisma.dataItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DataItemUpdateManyArgs>(
      args: SelectSubset<T, DataItemUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DataItem.
     * @param {DataItemUpsertArgs} args - Arguments to update or create a DataItem.
     * @example
     * // Update or create a DataItem
     * const dataItem = await prisma.dataItem.upsert({
     *   create: {
     *     // ... data to create a DataItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataItem we want to update
     *   }
     * })
    **/
    upsert<T extends DataItemUpsertArgs>(
      args: SelectSubset<T, DataItemUpsertArgs>
    ): CheckSelect<T, Prisma__DataItemClient<DataItem>, Prisma__DataItemClient<DataItemGetPayload<T>>>

    /**
     * Count the number of DataItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataItemCountArgs} args - Arguments to filter DataItems to count.
     * @example
     * // Count the number of DataItems
     * const count = await prisma.dataItem.count({
     *   where: {
     *     // ... the filter for the DataItems we want to count
     *   }
     * })
    **/
    count<T extends DataItemCountArgs>(
      args?: Subset<T, DataItemCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataItemAggregateArgs>(args: Subset<T, DataItemAggregateArgs>): PrismaPromise<GetDataItemAggregateType<T>>

    /**
     * Group by DataItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DataItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataItemGroupByArgs['orderBy'] }
        : { orderBy?: DataItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DataItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataItemGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DataItemClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * DataItem findUnique
   */
  export type DataItemFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
    /**
     * Throw an Error if a DataItem can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which DataItem to fetch.
     * 
    **/
    where: DataItemWhereUniqueInput
  }


  /**
   * DataItem findFirst
   */
  export type DataItemFindFirstArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
    /**
     * Throw an Error if a DataItem can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which DataItem to fetch.
     * 
    **/
    where?: DataItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataItems to fetch.
     * 
    **/
    orderBy?: Enumerable<DataItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataItems.
     * 
    **/
    cursor?: DataItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataItems.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataItems.
     * 
    **/
    distinct?: Enumerable<DataItemScalarFieldEnum>
  }


  /**
   * DataItem findMany
   */
  export type DataItemFindManyArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
    /**
     * Filter, which DataItems to fetch.
     * 
    **/
    where?: DataItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataItems to fetch.
     * 
    **/
    orderBy?: Enumerable<DataItemOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataItems.
     * 
    **/
    cursor?: DataItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataItems from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataItems.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DataItemScalarFieldEnum>
  }


  /**
   * DataItem create
   */
  export type DataItemCreateArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
    /**
     * The data needed to create a DataItem.
     * 
    **/
    data: XOR<DataItemCreateInput, DataItemUncheckedCreateInput>
  }


  /**
   * DataItem createMany
   */
  export type DataItemCreateManyArgs = {
    data: Enumerable<DataItemCreateManyInput>
  }


  /**
   * DataItem update
   */
  export type DataItemUpdateArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
    /**
     * The data needed to update a DataItem.
     * 
    **/
    data: XOR<DataItemUpdateInput, DataItemUncheckedUpdateInput>
    /**
     * Choose, which DataItem to update.
     * 
    **/
    where: DataItemWhereUniqueInput
  }


  /**
   * DataItem updateMany
   */
  export type DataItemUpdateManyArgs = {
    data: XOR<DataItemUpdateManyMutationInput, DataItemUncheckedUpdateManyInput>
    where?: DataItemWhereInput
  }


  /**
   * DataItem upsert
   */
  export type DataItemUpsertArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
    /**
     * The filter to search for the DataItem to update in case it exists.
     * 
    **/
    where: DataItemWhereUniqueInput
    /**
     * In case the DataItem found by the `where` argument doesn't exist, create a new DataItem with this data.
     * 
    **/
    create: XOR<DataItemCreateInput, DataItemUncheckedCreateInput>
    /**
     * In case the DataItem was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DataItemUpdateInput, DataItemUncheckedUpdateInput>
  }


  /**
   * DataItem delete
   */
  export type DataItemDeleteArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
    /**
     * Filter which DataItem to delete.
     * 
    **/
    where: DataItemWhereUniqueInput
  }


  /**
   * DataItem deleteMany
   */
  export type DataItemDeleteManyArgs = {
    where?: DataItemWhereInput
  }


  /**
   * DataItem without action
   */
  export type DataItemArgs = {
    /**
     * Select specific fields to fetch from the DataItem
     * 
    **/
    select?: DataItemSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const DataItemScalarFieldEnum: {
    id: 'id',
    body: 'body',
    tags: 'tags'
  };

  export type DataItemScalarFieldEnum = (typeof DataItemScalarFieldEnum)[keyof typeof DataItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type DataItemWhereInput = {
    AND?: Enumerable<DataItemWhereInput>
    OR?: Enumerable<DataItemWhereInput>
    NOT?: Enumerable<DataItemWhereInput>
    id?: StringFilter | string
    body?: JsonFilter
    tags?: StringNullableListFilter
  }

  export type DataItemOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    tags?: SortOrder
  }

  export type DataItemWhereUniqueInput = {
    id?: string
  }

  export type DataItemOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    tags?: SortOrder
    _count?: DataItemCountOrderByAggregateInput
    _max?: DataItemMaxOrderByAggregateInput
    _min?: DataItemMinOrderByAggregateInput
  }

  export type DataItemScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DataItemScalarWhereWithAggregatesInput>
    OR?: Enumerable<DataItemScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DataItemScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    body?: JsonWithAggregatesFilter
    tags?: StringNullableListFilter
  }

  export type DataItemCreateInput = {
    id?: string
    body: InputJsonValue
    tags?: DataItemCreatetagsInput | Enumerable<string>
  }

  export type DataItemUncheckedCreateInput = {
    id?: string
    body: InputJsonValue
    tags?: DataItemCreatetagsInput | Enumerable<string>
  }

  export type DataItemUpdateInput = {
    body?: InputJsonValue | InputJsonValue
    tags?: DataItemUpdatetagsInput | Enumerable<string>
  }

  export type DataItemUncheckedUpdateInput = {
    body?: InputJsonValue | InputJsonValue
    tags?: DataItemUpdatetagsInput | Enumerable<string>
  }

  export type DataItemCreateManyInput = {
    id?: string
    body: InputJsonValue
    tags?: DataItemCreateManytagsInput | Enumerable<string>
  }

  export type DataItemUpdateManyMutationInput = {
    body?: InputJsonValue | InputJsonValue
    tags?: DataItemUpdatetagsInput | Enumerable<string>
  }

  export type DataItemUncheckedUpdateManyInput = {
    body?: InputJsonValue | InputJsonValue
    tags?: DataItemUpdatetagsInput | Enumerable<string>
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type DataItemCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    tags?: SortOrder
  }

  export type DataItemMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DataItemMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type DataItemCreatetagsInput = {
    set: Enumerable<string>
  }

  export type DataItemUpdatetagsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type DataItemCreateManytagsInput = {
    set: Enumerable<string>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue
    not?: InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}