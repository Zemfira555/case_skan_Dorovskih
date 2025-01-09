import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../api/routes/authAPI";
import { AccountInfo, AuthDataType } from "../../types/types";

type InitialState = {
  error: string | null;
  isAuth: boolean;
  info: AccountInfo | null;
  pending: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    isAuth: false,
    info: null,
    pending: false
  } as InitialState,
  reducers: {
    setError(state: InitialState, action) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state: InitialState) => {
      state.isAuth = true
    });
    builder.addCase(getInfo.fulfilled, (state: InitialState, action: PayloadAction<AccountInfo | null>) => {
      state.isAuth = true;
      state.info = action.payload;
      state.pending = false;
    })
    builder.addCase(getInfo.pending, (state: InitialState) => {
      state.pending = true;
    })
    builder.addCase(getInfo.rejected, (state: InitialState) => {
      state.isAuth = false;
    });
    builder.addCase(logout.fulfilled, (state: InitialState) => {
      state.isAuth = false;
      state.info = null;
      state.error = null;
      state.pending = false;
    })
  }
});

export const {setError} = authSlice.actions;

export const login = createAsyncThunk('/auth/login', async (payload: AuthDataType, {dispatch}) => {
  const data = await authAPI.login(payload);
  if(!data?.success) {
    return dispatch(setError(data?.error))
  }

  return data;
})

export const getInfo = createAsyncThunk('/auth/info', async () => {
  const dataResponse = await authAPI.getInfo();
  return dataResponse?.data || null;
});

export const logout = createAsyncThunk('/auth/logout', async () => {
  localStorage.removeItem('accessToken');
})

export default authSlice.reducer;

