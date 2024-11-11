import {useEffect, useRef, useState} from "react";

let context = [];

export const useSyncState = (initialValue) => {
    const [_state, _setState] = useState({ current: initialValue });

    const state = () => {
        return _state.current;
    };

    const setState = (value) => {
        context = value;
        _setState({ current: value }); // для вызова обновления
        _state.current = value; // для того чтобы стейт обновлялся синхронно
    }

    return [state, setState];
};

export const useAutoEffect = (cb) => {
    const prevContext = useRef(null);

    useEffect(() => {
        if (prevContext.current && JSON.stringify(prevContext.current) === JSON.stringify(context)) {
            context = null;
            return;
        }

        prevContext.current = context;
        cb();
        context = null;
    }, [context])
}
