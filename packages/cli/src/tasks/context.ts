import {Redash, RedashClient} from 'redash-js-client'

export type Context = {
  host: string;
  path: string;
  dashboard: Redash.Dashboard;
  client: RedashClient;
}
