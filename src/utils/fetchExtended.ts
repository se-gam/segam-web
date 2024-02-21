'use server';

import { cookies } from 'next/headers';
import returnFetch, { ReturnFetch } from 'return-fetch';
import returnFetchJson from 'return-fetch-json';

const returnFetchThrowingErrorByStatusCode: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status === 500) throw Error('서버 오류');
        if (response.status >= 400) {
          throw await response.text().then(Error);
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
        if (response.status !== 401) return response;
        if (cookies().has('accessToken')) cookies().delete('accessToken');
        if (cookies().has('refreshToken')) cookies().delete('refreshToken');
        if (!response.url.includes('/login')) return response;

        const responseToRefreshCookie = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/refresh`,
          {
            method: 'POST',

            body: JSON.stringify({
              refreshToken: cookies().get('refreshToken')?.value,
            }),
          },
        );
        if (responseToRefreshCookie.status !== 201) {
          throw Error('로그인이 만료되었습니다. 다시 로그인해주세요.');
        }
        const { accessToken, refreshToken } = await responseToRefreshCookie.json();
        if (!accessToken || !refreshToken) throw new Error('오류');
        if (accessToken && refreshToken) {
          cookies().set('accessToken', accessToken, {
            maxAge: 60 * 60 * 24 * 7,
          });
          cookies().set('refreshToken', refreshToken, {
            maxAge: 60 * 60 * 24 * 168,
          });
        }
        return fetch(...requestArgs);
      },
    },
  });

const fetchExtended = returnFetchJson({
  jsonParser: JSON.parse,
  fetch: returnFetchThrowingErrorByStatusCode({
    fetch: returnFetchRetry({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
  }),
});
export default fetchExtended;
