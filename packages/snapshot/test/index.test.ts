import { Browser, ElementHandle, Page } from 'puppeteer';
import { querySnapshot } from '../src';

export const stubElementHandle = ({
  $eval: jest.fn(),
  screenshot: jest.fn(),
} as unknown) as ElementHandle;

export const stubPage = ({
  goto: jest.fn(),
  close: jest.fn(),
  $$: jest.fn().mockResolvedValue([]),
  $: jest.fn().mockResolvedValue(stubElementHandle),
  $eval: jest.fn(),
  setViewport: jest.fn(),
  emulateMediaType: jest.fn(),
  screenshot: jest.fn(),
} as unknown) as Page;

export const stubBrowser = ({
  newPage: jest.fn().mockResolvedValue(stubPage),
  close: jest.fn(),
} as unknown) as Browser;

jest.mock('puppeteer', () => ({
  launch() {
    return stubBrowser;
  },
}));

describe('A querySnapshot function', () => {
  it('calculate the right url', async () => {
    await querySnapshot({
      token: '123',
      queryId: 'qId',
      visualizationId: 'vId',
    });
    expect(
      stubPage.goto
    ).toHaveBeenCalledWith(
      `https://redash.io/embed/query/qId/visualization/vId?api_key=123`,
      { waitUntil: 'networkidle0' }
    );
  });
});
