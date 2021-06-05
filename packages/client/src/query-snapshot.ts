import * as puppeteer from 'puppeteer'
import {GetSnapshotParameters, RedashClientConfig} from './types'

export async function querySnapshot(clientConfig: RedashClientConfig, config: GetSnapshotParameters) {
    const url = `${clientConfig.host}/embed/query/${config.queryId}/visualization/${config.visualizationId}?api_key=${clientConfig.token}`

    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.setViewport({width: config.width ?? 800, height: config.width ?? 600})
    await page.goto(url, {waitUntil: 'networkidle0'})

    await page.emulateMediaType('print');

    const element = await page.$('visualization-embed div')

    const data = await (element ?? page).screenshot({type: 'png', path: config.path})

    await page.close()

    return data
}
