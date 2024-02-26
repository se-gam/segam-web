'use server';

import returnFetch, { ReturnFetch } from 'return-fetch';
import returnFetchJson from 'return-fetch-json';

const returnFetchThrowingErrorByStatusCode: ReturnFetch = (args) =>
  returnFetch({
    ...args,
    interceptors: {
      response: async (response) => {
        if (response.status === 500) {
          throw new Error('서버에 문제가 발생했습니다.');
        }
        if (response.status >= 400) {
          throw await response.text().then(Error);
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
export default fetchExtended;
