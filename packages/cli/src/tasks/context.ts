import {Redash, RedashClient} from 'redash-js-client'

export type Context = {
  host: string;
  dashboard: Redash.Dashboard;
  client: RedashClient;
}
