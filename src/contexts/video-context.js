import { createContext, useContext, useReducer } from "react";

import { initialState, reducer } from './video-reducer';

export const VideoContext = createContext({});

export function useVideo() {
    return useContext(VideoContext);
}

export function VideoProvider({children}) {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    return <VideoContext.Provider value = {{ state, dispatch }}>
        { children }
    </VideoContext.Provider>
}