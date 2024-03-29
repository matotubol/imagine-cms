import {resolve} from 'path';
import {Module} from '@nestjs/common';
import GraphQLJSON from 'graphql-type-json';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {RankModule} from './rank/rank.module';
import {BadgeModule} from './badge/badge.module';
import {ConfigModule} from './config/config.module';
import {CommonModule} from './common/common.module';
import {ArticleModule} from './article/article.module';
import {SessionModule} from './session/session.module';
import {DatabaseModule} from './database/database.module';
import {databaseEntities} from './database/database.const';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {
  IMAGINE_DATABASE_HOST,
  IMAGINE_DATABASE_NAME,
  IMAGINE_DATABASE_PASS,
  IMAGINE_DATABASE_USER,
  IMAGINE_GRAPHQL_PLAYGROUND,
} from './imagine.constant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: IMAGINE_DATABASE_HOST,
      username: IMAGINE_DATABASE_USER,
      password: IMAGINE_DATABASE_PASS,
      database: IMAGINE_DATABASE_NAME,
      entities: [...databaseEntities],
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: IMAGINE_GRAPHQL_PLAYGROUND,
      autoSchemaFile: resolve(__dirname, './schema.gql'),
      fieldResolverEnhancers: ['guards'],
      installSubscriptionHandlers: true,
      resolvers: {JSON: GraphQLJSON},
    }),
    BadgeModule,
    CommonModule,
    DatabaseModule,
    SessionModule,
    UserModule,
    RankModule,
    ArticleModule,
    ConfigModule,
  ],
})
export class ImagineModule {}
