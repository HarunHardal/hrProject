import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../apollo';
import { gql } from '@apollo/client';

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await client.query({
    query: gql`
    {
      countries{
        code
        name
        native
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }
    `,
  });
  return response.data.countries;
});

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default countrySlice.reducer;