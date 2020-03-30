/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {mySchema} from './src/database/schema';
import Blog from './src/database/models/Blog';
import Post from './src/database/models/Post';
import Comment from './src/database/models/Comment';

import {createNavigation} from './src/router';

const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: mySchema,
});

const database = new Database({
  adapter,
  modelClasses: [Blog, Post, Comment],
  actionsEnabled: true,
});

const timeToLaunch = new Date().getTime();

const Navigation = createNavigation({database, timeToLaunch});

AppRegistry.registerComponent(appName, () => Navigation);
