import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../utils/types';

export interface AuthState {
    user: UserType | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('')
        },
    },

})

export const { login,logout } = authSlice.actions

export default authSlice.reducer
