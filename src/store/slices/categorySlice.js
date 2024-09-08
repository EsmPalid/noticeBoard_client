import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultAxios from "../../api/defaultAxios";

export const fetchCategory = createAsyncThunk(
    "category",
    async (data, thunkAPI) => {
        try {
            const response = await defaultAxios("/createArticle");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: {
        type: [],
    },
    reducers: {
        testAction: (state, action) => {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.type = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { testAction } = categorySlice.actions;
export default categorySlice.reducer;
