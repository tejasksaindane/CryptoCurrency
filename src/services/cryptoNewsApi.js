import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  //   "Content-Type": "application/json",
  "X-Api-Key": "a1c3c7453b0f4e4d83b74b31f0d8c212",
  //   "Access-Control-Allow-Headers": "Api-Key",
};

const ApiKey = "a1c3c7453b0f4e4d83b74b31f0d8c212";
const baseUrl = "https://newsapi.org/v2/everything";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

let dateObj = new Date();
let month = String(dateObj.getMonth() + 1).padStart(2, "0");
let day = String(dateObj.getDate()).padStart(2, "0");
let year = dateObj.getFullYear();
const output = year + "-" + month + "-" + day;
console.log(output);

export const cryptoNewsApi = createApi({
  // TODO: to know what is this reducer for -
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count }) =>
        createRequest(
          `?q=Cryptocurrency&from=2024-05-23&sortBy=popularity&${ApiKey}&pageSize=${count}`
        ),
    }),
  }),
});
// Redux toolkit provide a custom hook to fetch all data from api
export const { useGetCryptoNewsQuery } = cryptoNewsApi;

// FIXME: a1c3c7453b0f4e4d83b74b31f0d8c212


