import * as puppeteer from 'puppeteer';

export type GetSnapshotParameters = {
  token: string;
  queryId: string;
  visualizationId: string;
  host?: string;
  path?: string;
  width?: number;
  height?: number;
};
export async function querySnapshot(config: GetSnapshotParameters) {
  config = { host: 'https://redash.io', ...config };

  const url = `${config.host}/embed/query/${config.queryId}/visualization/${config.visualizationId}?api_key=${config.token}`;

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({
    width: config.width ?? 800,
    height: config.width ?? 600,
  });
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.emulateMediaType('print');

  const element = await page.$('visualization-embed div');

  const data = await (element ?? page).screenshot({
    type: 'png',
    path: config.path,
  });

  await page.close();

  return data;
}
