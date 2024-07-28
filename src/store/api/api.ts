import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharacterResponse } from '../../models';

export const API = createApi({
  reducerPath: 'rickandmortyapi.com',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://rickandmortyapi.com/api`,
    fetchFn: (url: RequestInfo, options?: RequestInit): Promise<Response> =>
      fetch(url, options),
  }),
  endpoints: (build) => ({
    getAllcharacters: build.query<CharacterResponse<Character>, number | void>({
      query: (page = 1) => ({
        url: `/character/?page=${page}`,
      }),
    }),
    getCharacterById: build.query<Character[], string>({
      query: (id: string) => ({
        url: `/character/${id}`,
      }),
    }),
    getCharactersByName: build.query<CharacterResponse<Character>, string>({
      query: (name: string) => ({
        url: `/character/?name=${name}`,
      }),
    }),
  }),
});

export const {
  useGetAllcharactersQuery,
  useGetCharacterByIdQuery,
  useLazyGetCharactersByNameQuery,
  useLazyGetAllcharactersQuery,
} = API;
