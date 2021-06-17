import {Redash, RedashClient} from 'redash-js-client'

export type ClientContext = {
  client: RedashClient;
}

export type HostContext = {
  host: string;
}

export type TokenContext = {
  token: string;
}

export type ResultContext = {
  result: any[] | Record<string, any>;
}

export type DashboardContext = {
  dashboard: Redash.Dashboard;
}

/*
  listr contexts
 */

export type DashboardSnapshotContext = HostContext & ClientContext & DashboardContext & TokenContext
export type QueryOneContext = HostContext & ClientContext & ResultContext & TokenContext
export type QueryManyContext = HostContext & ClientContext & ResultContext & TokenContext
export type QueryJobContext = HostContext & ClientContext & ResultContext & TokenContext
export type QueryUpdateContext = HostContext & ClientContext & ResultContext & TokenContext
export type QuerySnapshotContext = HostContext & TokenContext
