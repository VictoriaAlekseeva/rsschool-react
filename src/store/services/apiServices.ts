import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

const API_URL = process.env.API_URL;

export const beerAPI = createApi({
  reducerPath: 'beerAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],

  endpoints: (build) => ({
    getBeers: build.query({
      query: ({ beer_name, per_page = 5, page = 1 }) => {
        return `beers?beer_name=${beer_name}&page=${page}&per_page=${per_page}`;
      },
    }),
    getAllBeers: build.query({
      query: ({ per_page = 5, page = 1 }) => {
        return `beers?page=${page}&per_page=${per_page}`;
      },
    }),
    getSingleBeer: build.query({
      query: ({ id }) => {
        return `beers/${id}`;
      },
    }),
  }),
});

export const {
  useGetBeersQuery,
  useGetAllBeersQuery,
  useGetSingleBeerQuery,
  util: { getRunningQueriesThunk },
} = beerAPI;

export const { getBeers, getAllBeers, getSingleBeer } = beerAPI.endpoints;
