import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import type {TypedUseSelectorHook} from 'react-redux'
import productionSlice from "../application/production/store/ProductionSlice";
import { serverApi } from "../application/production/store/ApiServer";
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({ 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
    reducer:{
        production:productionSlice,
        [serverApi.reducerPath]:serverApi.reducer,
    },
 })

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

