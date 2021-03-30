import { createContext, useContext, useReducer } from "react";

import { reducer, initialState } from './store-reducer';

const StoreContext = createContext({});

 export function useStore() {
     return useContext(StoreContext);
 }

 export function StoreProvider( { children } ) {
    const [state, dispatch] = useReducer(reducer, initialState);
     return (
         <StoreContext.Provider value = {{ state, dispatch }}>
             { children }
         </StoreContext.Provider>
     )
 }