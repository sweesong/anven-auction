
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model auction_listings
 * 
 */
export type auction_listings = $Result.DefaultSelection<Prisma.$auction_listingsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Auction_listings
 * const auction_listings = await prisma.auction_listings.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Auction_listings
   * const auction_listings = await prisma.auction_listings.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.auction_listings`: Exposes CRUD operations for the **auction_listings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auction_listings
    * const auction_listings = await prisma.auction_listings.findMany()
    * ```
    */
  get auction_listings(): Prisma.auction_listingsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

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

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.18.0
   * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
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
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    auction_listings: 'auction_listings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "auction_listings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      auction_listings: {
        payload: Prisma.$auction_listingsPayload<ExtArgs>
        fields: Prisma.auction_listingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.auction_listingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.auction_listingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>
          }
          findFirst: {
            args: Prisma.auction_listingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.auction_listingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>
          }
          findMany: {
            args: Prisma.auction_listingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>[]
          }
          create: {
            args: Prisma.auction_listingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>
          }
          createMany: {
            args: Prisma.auction_listingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.auction_listingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>[]
          }
          delete: {
            args: Prisma.auction_listingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>
          }
          update: {
            args: Prisma.auction_listingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>
          }
          deleteMany: {
            args: Prisma.auction_listingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.auction_listingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.auction_listingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auction_listingsPayload>
          }
          aggregate: {
            args: Prisma.Auction_listingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuction_listings>
          }
          groupBy: {
            args: Prisma.auction_listingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Auction_listingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.auction_listingsCountArgs<ExtArgs>
            result: $Utils.Optional<Auction_listingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

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
   * Model auction_listings
   */

  export type AggregateAuction_listings = {
    _count: Auction_listingsCountAggregateOutputType | null
    _avg: Auction_listingsAvgAggregateOutputType | null
    _sum: Auction_listingsSumAggregateOutputType | null
    _min: Auction_listingsMinAggregateOutputType | null
    _max: Auction_listingsMaxAggregateOutputType | null
  }

  export type Auction_listingsAvgAggregateOutputType = {
    id: number | null
    reserve_price: number | null
    estimate_price: number | null
    size: number | null
  }

  export type Auction_listingsSumAggregateOutputType = {
    id: number | null
    reserve_price: number | null
    estimate_price: number | null
    size: number | null
  }

  export type Auction_listingsMinAggregateOutputType = {
    id: number | null
    title: string | null
    auction_date: Date | null
    city: string | null
    address: string | null
    reserve_price: number | null
    estimate_price: number | null
    size: number | null
    type: string | null
    tenure: string | null
    image_url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Auction_listingsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    auction_date: Date | null
    city: string | null
    address: string | null
    reserve_price: number | null
    estimate_price: number | null
    size: number | null
    type: string | null
    tenure: string | null
    image_url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type Auction_listingsCountAggregateOutputType = {
    id: number
    title: number
    auction_date: number
    city: number
    address: number
    reserve_price: number
    estimate_price: number
    size: number
    type: number
    tenure: number
    image_url: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type Auction_listingsAvgAggregateInputType = {
    id?: true
    reserve_price?: true
    estimate_price?: true
    size?: true
  }

  export type Auction_listingsSumAggregateInputType = {
    id?: true
    reserve_price?: true
    estimate_price?: true
    size?: true
  }

  export type Auction_listingsMinAggregateInputType = {
    id?: true
    title?: true
    auction_date?: true
    city?: true
    address?: true
    reserve_price?: true
    estimate_price?: true
    size?: true
    type?: true
    tenure?: true
    image_url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Auction_listingsMaxAggregateInputType = {
    id?: true
    title?: true
    auction_date?: true
    city?: true
    address?: true
    reserve_price?: true
    estimate_price?: true
    size?: true
    type?: true
    tenure?: true
    image_url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type Auction_listingsCountAggregateInputType = {
    id?: true
    title?: true
    auction_date?: true
    city?: true
    address?: true
    reserve_price?: true
    estimate_price?: true
    size?: true
    type?: true
    tenure?: true
    image_url?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type Auction_listingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auction_listings to aggregate.
     */
    where?: auction_listingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auction_listings to fetch.
     */
    orderBy?: auction_listingsOrderByWithRelationInput | auction_listingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: auction_listingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auction_listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auction_listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auction_listings
    **/
    _count?: true | Auction_listingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Auction_listingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Auction_listingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Auction_listingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Auction_listingsMaxAggregateInputType
  }

  export type GetAuction_listingsAggregateType<T extends Auction_listingsAggregateArgs> = {
        [P in keyof T & keyof AggregateAuction_listings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuction_listings[P]>
      : GetScalarType<T[P], AggregateAuction_listings[P]>
  }




  export type auction_listingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auction_listingsWhereInput
    orderBy?: auction_listingsOrderByWithAggregationInput | auction_listingsOrderByWithAggregationInput[]
    by: Auction_listingsScalarFieldEnum[] | Auction_listingsScalarFieldEnum
    having?: auction_listingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Auction_listingsCountAggregateInputType | true
    _avg?: Auction_listingsAvgAggregateInputType
    _sum?: Auction_listingsSumAggregateInputType
    _min?: Auction_listingsMinAggregateInputType
    _max?: Auction_listingsMaxAggregateInputType
  }

  export type Auction_listingsGroupByOutputType = {
    id: number
    title: string
    auction_date: Date
    city: string
    address: string
    reserve_price: number
    estimate_price: number | null
    size: number
    type: string
    tenure: string
    image_url: string | null
    createdAt: Date
    updatedAt: Date | null
    _count: Auction_listingsCountAggregateOutputType | null
    _avg: Auction_listingsAvgAggregateOutputType | null
    _sum: Auction_listingsSumAggregateOutputType | null
    _min: Auction_listingsMinAggregateOutputType | null
    _max: Auction_listingsMaxAggregateOutputType | null
  }

  type GetAuction_listingsGroupByPayload<T extends auction_listingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Auction_listingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Auction_listingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Auction_listingsGroupByOutputType[P]>
            : GetScalarType<T[P], Auction_listingsGroupByOutputType[P]>
        }
      >
    >


  export type auction_listingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    auction_date?: boolean
    city?: boolean
    address?: boolean
    reserve_price?: boolean
    estimate_price?: boolean
    size?: boolean
    type?: boolean
    tenure?: boolean
    image_url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["auction_listings"]>

  export type auction_listingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    auction_date?: boolean
    city?: boolean
    address?: boolean
    reserve_price?: boolean
    estimate_price?: boolean
    size?: boolean
    type?: boolean
    tenure?: boolean
    image_url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["auction_listings"]>

  export type auction_listingsSelectScalar = {
    id?: boolean
    title?: boolean
    auction_date?: boolean
    city?: boolean
    address?: boolean
    reserve_price?: boolean
    estimate_price?: boolean
    size?: boolean
    type?: boolean
    tenure?: boolean
    image_url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $auction_listingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "auction_listings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      auction_date: Date
      city: string
      address: string
      reserve_price: number
      estimate_price: number | null
      size: number
      type: string
      tenure: string
      image_url: string | null
      createdAt: Date
      updatedAt: Date | null
    }, ExtArgs["result"]["auction_listings"]>
    composites: {}
  }

  type auction_listingsGetPayload<S extends boolean | null | undefined | auction_listingsDefaultArgs> = $Result.GetResult<Prisma.$auction_listingsPayload, S>

  type auction_listingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<auction_listingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Auction_listingsCountAggregateInputType | true
    }

  export interface auction_listingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['auction_listings'], meta: { name: 'auction_listings' } }
    /**
     * Find zero or one Auction_listings that matches the filter.
     * @param {auction_listingsFindUniqueArgs} args - Arguments to find a Auction_listings
     * @example
     * // Get one Auction_listings
     * const auction_listings = await prisma.auction_listings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends auction_listingsFindUniqueArgs>(args: SelectSubset<T, auction_listingsFindUniqueArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Auction_listings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {auction_listingsFindUniqueOrThrowArgs} args - Arguments to find a Auction_listings
     * @example
     * // Get one Auction_listings
     * const auction_listings = await prisma.auction_listings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends auction_listingsFindUniqueOrThrowArgs>(args: SelectSubset<T, auction_listingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Auction_listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_listingsFindFirstArgs} args - Arguments to find a Auction_listings
     * @example
     * // Get one Auction_listings
     * const auction_listings = await prisma.auction_listings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends auction_listingsFindFirstArgs>(args?: SelectSubset<T, auction_listingsFindFirstArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Auction_listings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_listingsFindFirstOrThrowArgs} args - Arguments to find a Auction_listings
     * @example
     * // Get one Auction_listings
     * const auction_listings = await prisma.auction_listings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends auction_listingsFindFirstOrThrowArgs>(args?: SelectSubset<T, auction_listingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Auction_listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_listingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auction_listings
     * const auction_listings = await prisma.auction_listings.findMany()
     * 
     * // Get first 10 Auction_listings
     * const auction_listings = await prisma.auction_listings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auction_listingsWithIdOnly = await prisma.auction_listings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends auction_listingsFindManyArgs>(args?: SelectSubset<T, auction_listingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Auction_listings.
     * @param {auction_listingsCreateArgs} args - Arguments to create a Auction_listings.
     * @example
     * // Create one Auction_listings
     * const Auction_listings = await prisma.auction_listings.create({
     *   data: {
     *     // ... data to create a Auction_listings
     *   }
     * })
     * 
     */
    create<T extends auction_listingsCreateArgs>(args: SelectSubset<T, auction_listingsCreateArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Auction_listings.
     * @param {auction_listingsCreateManyArgs} args - Arguments to create many Auction_listings.
     * @example
     * // Create many Auction_listings
     * const auction_listings = await prisma.auction_listings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends auction_listingsCreateManyArgs>(args?: SelectSubset<T, auction_listingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Auction_listings and returns the data saved in the database.
     * @param {auction_listingsCreateManyAndReturnArgs} args - Arguments to create many Auction_listings.
     * @example
     * // Create many Auction_listings
     * const auction_listings = await prisma.auction_listings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Auction_listings and only return the `id`
     * const auction_listingsWithIdOnly = await prisma.auction_listings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends auction_listingsCreateManyAndReturnArgs>(args?: SelectSubset<T, auction_listingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Auction_listings.
     * @param {auction_listingsDeleteArgs} args - Arguments to delete one Auction_listings.
     * @example
     * // Delete one Auction_listings
     * const Auction_listings = await prisma.auction_listings.delete({
     *   where: {
     *     // ... filter to delete one Auction_listings
     *   }
     * })
     * 
     */
    delete<T extends auction_listingsDeleteArgs>(args: SelectSubset<T, auction_listingsDeleteArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Auction_listings.
     * @param {auction_listingsUpdateArgs} args - Arguments to update one Auction_listings.
     * @example
     * // Update one Auction_listings
     * const auction_listings = await prisma.auction_listings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends auction_listingsUpdateArgs>(args: SelectSubset<T, auction_listingsUpdateArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Auction_listings.
     * @param {auction_listingsDeleteManyArgs} args - Arguments to filter Auction_listings to delete.
     * @example
     * // Delete a few Auction_listings
     * const { count } = await prisma.auction_listings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends auction_listingsDeleteManyArgs>(args?: SelectSubset<T, auction_listingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auction_listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_listingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auction_listings
     * const auction_listings = await prisma.auction_listings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends auction_listingsUpdateManyArgs>(args: SelectSubset<T, auction_listingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Auction_listings.
     * @param {auction_listingsUpsertArgs} args - Arguments to update or create a Auction_listings.
     * @example
     * // Update or create a Auction_listings
     * const auction_listings = await prisma.auction_listings.upsert({
     *   create: {
     *     // ... data to create a Auction_listings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auction_listings we want to update
     *   }
     * })
     */
    upsert<T extends auction_listingsUpsertArgs>(args: SelectSubset<T, auction_listingsUpsertArgs<ExtArgs>>): Prisma__auction_listingsClient<$Result.GetResult<Prisma.$auction_listingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Auction_listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_listingsCountArgs} args - Arguments to filter Auction_listings to count.
     * @example
     * // Count the number of Auction_listings
     * const count = await prisma.auction_listings.count({
     *   where: {
     *     // ... the filter for the Auction_listings we want to count
     *   }
     * })
    **/
    count<T extends auction_listingsCountArgs>(
      args?: Subset<T, auction_listingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Auction_listingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auction_listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auction_listingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Auction_listingsAggregateArgs>(args: Subset<T, Auction_listingsAggregateArgs>): Prisma.PrismaPromise<GetAuction_listingsAggregateType<T>>

    /**
     * Group by Auction_listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_listingsGroupByArgs} args - Group by arguments.
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
      T extends auction_listingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: auction_listingsGroupByArgs['orderBy'] }
        : { orderBy?: auction_listingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, auction_listingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuction_listingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the auction_listings model
   */
  readonly fields: auction_listingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for auction_listings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__auction_listingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the auction_listings model
   */ 
  interface auction_listingsFieldRefs {
    readonly id: FieldRef<"auction_listings", 'Int'>
    readonly title: FieldRef<"auction_listings", 'String'>
    readonly auction_date: FieldRef<"auction_listings", 'DateTime'>
    readonly city: FieldRef<"auction_listings", 'String'>
    readonly address: FieldRef<"auction_listings", 'String'>
    readonly reserve_price: FieldRef<"auction_listings", 'Float'>
    readonly estimate_price: FieldRef<"auction_listings", 'Float'>
    readonly size: FieldRef<"auction_listings", 'Float'>
    readonly type: FieldRef<"auction_listings", 'String'>
    readonly tenure: FieldRef<"auction_listings", 'String'>
    readonly image_url: FieldRef<"auction_listings", 'String'>
    readonly createdAt: FieldRef<"auction_listings", 'DateTime'>
    readonly updatedAt: FieldRef<"auction_listings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * auction_listings findUnique
   */
  export type auction_listingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * Filter, which auction_listings to fetch.
     */
    where: auction_listingsWhereUniqueInput
  }

  /**
   * auction_listings findUniqueOrThrow
   */
  export type auction_listingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * Filter, which auction_listings to fetch.
     */
    where: auction_listingsWhereUniqueInput
  }

  /**
   * auction_listings findFirst
   */
  export type auction_listingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * Filter, which auction_listings to fetch.
     */
    where?: auction_listingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auction_listings to fetch.
     */
    orderBy?: auction_listingsOrderByWithRelationInput | auction_listingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auction_listings.
     */
    cursor?: auction_listingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auction_listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auction_listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auction_listings.
     */
    distinct?: Auction_listingsScalarFieldEnum | Auction_listingsScalarFieldEnum[]
  }

  /**
   * auction_listings findFirstOrThrow
   */
  export type auction_listingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * Filter, which auction_listings to fetch.
     */
    where?: auction_listingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auction_listings to fetch.
     */
    orderBy?: auction_listingsOrderByWithRelationInput | auction_listingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auction_listings.
     */
    cursor?: auction_listingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auction_listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auction_listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auction_listings.
     */
    distinct?: Auction_listingsScalarFieldEnum | Auction_listingsScalarFieldEnum[]
  }

  /**
   * auction_listings findMany
   */
  export type auction_listingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * Filter, which auction_listings to fetch.
     */
    where?: auction_listingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auction_listings to fetch.
     */
    orderBy?: auction_listingsOrderByWithRelationInput | auction_listingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auction_listings.
     */
    cursor?: auction_listingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auction_listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auction_listings.
     */
    skip?: number
    distinct?: Auction_listingsScalarFieldEnum | Auction_listingsScalarFieldEnum[]
  }

  /**
   * auction_listings create
   */
  export type auction_listingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * The data needed to create a auction_listings.
     */
    data: XOR<auction_listingsCreateInput, auction_listingsUncheckedCreateInput>
  }

  /**
   * auction_listings createMany
   */
  export type auction_listingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many auction_listings.
     */
    data: auction_listingsCreateManyInput | auction_listingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auction_listings createManyAndReturn
   */
  export type auction_listingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many auction_listings.
     */
    data: auction_listingsCreateManyInput | auction_listingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auction_listings update
   */
  export type auction_listingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * The data needed to update a auction_listings.
     */
    data: XOR<auction_listingsUpdateInput, auction_listingsUncheckedUpdateInput>
    /**
     * Choose, which auction_listings to update.
     */
    where: auction_listingsWhereUniqueInput
  }

  /**
   * auction_listings updateMany
   */
  export type auction_listingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update auction_listings.
     */
    data: XOR<auction_listingsUpdateManyMutationInput, auction_listingsUncheckedUpdateManyInput>
    /**
     * Filter which auction_listings to update
     */
    where?: auction_listingsWhereInput
  }

  /**
   * auction_listings upsert
   */
  export type auction_listingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * The filter to search for the auction_listings to update in case it exists.
     */
    where: auction_listingsWhereUniqueInput
    /**
     * In case the auction_listings found by the `where` argument doesn't exist, create a new auction_listings with this data.
     */
    create: XOR<auction_listingsCreateInput, auction_listingsUncheckedCreateInput>
    /**
     * In case the auction_listings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<auction_listingsUpdateInput, auction_listingsUncheckedUpdateInput>
  }

  /**
   * auction_listings delete
   */
  export type auction_listingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
    /**
     * Filter which auction_listings to delete.
     */
    where: auction_listingsWhereUniqueInput
  }

  /**
   * auction_listings deleteMany
   */
  export type auction_listingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auction_listings to delete
     */
    where?: auction_listingsWhereInput
  }

  /**
   * auction_listings without action
   */
  export type auction_listingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auction_listings
     */
    select?: auction_listingsSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Auction_listingsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    auction_date: 'auction_date',
    city: 'city',
    address: 'address',
    reserve_price: 'reserve_price',
    estimate_price: 'estimate_price',
    size: 'size',
    type: 'type',
    tenure: 'tenure',
    image_url: 'image_url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type Auction_listingsScalarFieldEnum = (typeof Auction_listingsScalarFieldEnum)[keyof typeof Auction_listingsScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type auction_listingsWhereInput = {
    AND?: auction_listingsWhereInput | auction_listingsWhereInput[]
    OR?: auction_listingsWhereInput[]
    NOT?: auction_listingsWhereInput | auction_listingsWhereInput[]
    id?: IntFilter<"auction_listings"> | number
    title?: StringFilter<"auction_listings"> | string
    auction_date?: DateTimeFilter<"auction_listings"> | Date | string
    city?: StringFilter<"auction_listings"> | string
    address?: StringFilter<"auction_listings"> | string
    reserve_price?: FloatFilter<"auction_listings"> | number
    estimate_price?: FloatNullableFilter<"auction_listings"> | number | null
    size?: FloatFilter<"auction_listings"> | number
    type?: StringFilter<"auction_listings"> | string
    tenure?: StringFilter<"auction_listings"> | string
    image_url?: StringNullableFilter<"auction_listings"> | string | null
    createdAt?: DateTimeFilter<"auction_listings"> | Date | string
    updatedAt?: DateTimeNullableFilter<"auction_listings"> | Date | string | null
  }

  export type auction_listingsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    auction_date?: SortOrder
    city?: SortOrder
    address?: SortOrder
    reserve_price?: SortOrder
    estimate_price?: SortOrderInput | SortOrder
    size?: SortOrder
    type?: SortOrder
    tenure?: SortOrder
    image_url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type auction_listingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: auction_listingsWhereInput | auction_listingsWhereInput[]
    OR?: auction_listingsWhereInput[]
    NOT?: auction_listingsWhereInput | auction_listingsWhereInput[]
    title?: StringFilter<"auction_listings"> | string
    auction_date?: DateTimeFilter<"auction_listings"> | Date | string
    city?: StringFilter<"auction_listings"> | string
    address?: StringFilter<"auction_listings"> | string
    reserve_price?: FloatFilter<"auction_listings"> | number
    estimate_price?: FloatNullableFilter<"auction_listings"> | number | null
    size?: FloatFilter<"auction_listings"> | number
    type?: StringFilter<"auction_listings"> | string
    tenure?: StringFilter<"auction_listings"> | string
    image_url?: StringNullableFilter<"auction_listings"> | string | null
    createdAt?: DateTimeFilter<"auction_listings"> | Date | string
    updatedAt?: DateTimeNullableFilter<"auction_listings"> | Date | string | null
  }, "id">

  export type auction_listingsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    auction_date?: SortOrder
    city?: SortOrder
    address?: SortOrder
    reserve_price?: SortOrder
    estimate_price?: SortOrderInput | SortOrder
    size?: SortOrder
    type?: SortOrder
    tenure?: SortOrder
    image_url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: auction_listingsCountOrderByAggregateInput
    _avg?: auction_listingsAvgOrderByAggregateInput
    _max?: auction_listingsMaxOrderByAggregateInput
    _min?: auction_listingsMinOrderByAggregateInput
    _sum?: auction_listingsSumOrderByAggregateInput
  }

  export type auction_listingsScalarWhereWithAggregatesInput = {
    AND?: auction_listingsScalarWhereWithAggregatesInput | auction_listingsScalarWhereWithAggregatesInput[]
    OR?: auction_listingsScalarWhereWithAggregatesInput[]
    NOT?: auction_listingsScalarWhereWithAggregatesInput | auction_listingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"auction_listings"> | number
    title?: StringWithAggregatesFilter<"auction_listings"> | string
    auction_date?: DateTimeWithAggregatesFilter<"auction_listings"> | Date | string
    city?: StringWithAggregatesFilter<"auction_listings"> | string
    address?: StringWithAggregatesFilter<"auction_listings"> | string
    reserve_price?: FloatWithAggregatesFilter<"auction_listings"> | number
    estimate_price?: FloatNullableWithAggregatesFilter<"auction_listings"> | number | null
    size?: FloatWithAggregatesFilter<"auction_listings"> | number
    type?: StringWithAggregatesFilter<"auction_listings"> | string
    tenure?: StringWithAggregatesFilter<"auction_listings"> | string
    image_url?: StringNullableWithAggregatesFilter<"auction_listings"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"auction_listings"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"auction_listings"> | Date | string | null
  }

  export type auction_listingsCreateInput = {
    title: string
    auction_date: Date | string
    city: string
    address: string
    reserve_price: number
    estimate_price?: number | null
    size: number
    type: string
    tenure: string
    image_url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type auction_listingsUncheckedCreateInput = {
    id?: number
    title: string
    auction_date: Date | string
    city: string
    address: string
    reserve_price: number
    estimate_price?: number | null
    size: number
    type: string
    tenure: string
    image_url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type auction_listingsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    auction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    reserve_price?: FloatFieldUpdateOperationsInput | number
    estimate_price?: NullableFloatFieldUpdateOperationsInput | number | null
    size?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    tenure?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auction_listingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    auction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    reserve_price?: FloatFieldUpdateOperationsInput | number
    estimate_price?: NullableFloatFieldUpdateOperationsInput | number | null
    size?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    tenure?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auction_listingsCreateManyInput = {
    id?: number
    title: string
    auction_date: Date | string
    city: string
    address: string
    reserve_price: number
    estimate_price?: number | null
    size: number
    type: string
    tenure: string
    image_url?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type auction_listingsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    auction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    reserve_price?: FloatFieldUpdateOperationsInput | number
    estimate_price?: NullableFloatFieldUpdateOperationsInput | number | null
    size?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    tenure?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auction_listingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    auction_date?: DateTimeFieldUpdateOperationsInput | Date | string
    city?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    reserve_price?: FloatFieldUpdateOperationsInput | number
    estimate_price?: NullableFloatFieldUpdateOperationsInput | number | null
    size?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    tenure?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type auction_listingsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    auction_date?: SortOrder
    city?: SortOrder
    address?: SortOrder
    reserve_price?: SortOrder
    estimate_price?: SortOrder
    size?: SortOrder
    type?: SortOrder
    tenure?: SortOrder
    image_url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type auction_listingsAvgOrderByAggregateInput = {
    id?: SortOrder
    reserve_price?: SortOrder
    estimate_price?: SortOrder
    size?: SortOrder
  }

  export type auction_listingsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    auction_date?: SortOrder
    city?: SortOrder
    address?: SortOrder
    reserve_price?: SortOrder
    estimate_price?: SortOrder
    size?: SortOrder
    type?: SortOrder
    tenure?: SortOrder
    image_url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type auction_listingsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    auction_date?: SortOrder
    city?: SortOrder
    address?: SortOrder
    reserve_price?: SortOrder
    estimate_price?: SortOrder
    size?: SortOrder
    type?: SortOrder
    tenure?: SortOrder
    image_url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type auction_listingsSumOrderByAggregateInput = {
    id?: SortOrder
    reserve_price?: SortOrder
    estimate_price?: SortOrder
    size?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use auction_listingsDefaultArgs instead
     */
    export type auction_listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = auction_listingsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}