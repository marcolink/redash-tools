import {Redash, RedashClient} from 'redash-js-client'

export type ClientContext = {
  client: RedashClient;
}

export type HostContext = {
  host: string;
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

export type DashboardSnapshotContext = HostContext & ClientContext & DashboardContext
export type QueryOneContext = HostContext & ClientContext & ResultContext
export type QueryManyContext = HostContext & ClientContext & ResultContext
export type QueryJobContext = HostContext & ClientContext & ResultContext
export type QueryUpdateContext = HostContext & ClientContext & ResultContext
export type QuerySnapshotContext = HostContext & ClientContext
