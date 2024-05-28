import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "Content-Type": "application/json",
  "Api-Key": "coinranking6a88af4e76278cb5c7cd126383061011219b96f3847e44ad",
  // 'x-access-token': '53a0b0a7e4f2fa59519e4'
};
const baseUrl = "https://api.coinranking.com/v2";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  // TODO: to know what is this reducer for -
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});
// Redux toolkit provide a custom hook to fetch all data from api
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;




//   "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//   "x-rapidapi-key": "bf2be0966dmsh98991ad37ebce68p17befajsn2fa53e6c8585",