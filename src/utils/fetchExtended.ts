'use server';

import { redirect } from 'next/navigation';
import returnFetch, { ReturnFetch } from 'return-fetch';
import returnFetchJson from 'return-fetch-json';

const returnFetchThrowingErrorByStatusCode: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status === 500) {
          const msg = JSON.parse(await response.text()).message;
          throw new Error(msg.message);
        }
        if (response.status === 401) {
          const msg = JSON.parse(await response.text()).message;
          if (msg.message === '학번 또는 비밀번호가 올바르지 않습니다.') {
            throw new Error('학번 또는 비밀번호가 올바르지 않습니다.');
          }
          redirect('/expire');
        }
        if (response.status >= 400) {
          const msg = JSON.parse(await response.text());
          throw new Error(msg.message);
        }
        return response;
      },
    },
  });

const returnFetchRetry: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response, requestArgs, fetch) => {
        if (response.status > 500) {
          return fetch(...requestArgs);
        }
        if (response.status === 401) {
          redirect('/expire');
        }
        if (response.status >= 400) {
          return fetch(...requestArgs);
        }
        return response;
      },
    },
  });

const fetchExtended = returnFetchJson({
  jsonParser: JSON.parse,
  fetch: returnFetchThrowingErrorByStatusCode({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
});
const retryFetchExtended = returnFetchJson({
  jsonParser: JSON.parse,
  fetch: returnFetchThrowingErrorByStatusCode({
    fetch: returnFetchRetry({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
  }),
});
export { fetchExtended, retryFetchExtended };
