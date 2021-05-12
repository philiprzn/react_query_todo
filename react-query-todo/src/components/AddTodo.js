import React, {useRef} from 'react';
import { useMutation, useQueryCache } from 'react-query';
import { createTodo } from '../api';

export const AddTodo = (props) => {
    const inputRef = useRef();
    const queryCache = useQueryCache();

    const [mutateAdd] = useMutation(createTodo, {
        onSuccess: () => queryCache.invalidateQueries('todos')
    })

    const addTodo = () => {
        if (inputRef.current.value) {
            mutateAdd({text: inputRef.current.value});
            inputRef.current.value = '';
        }
    }

    return (
        <>
        <input ref={inputRef}></input> 
        <button disabled={props.isLoading} onClick={addTodo}>Add Todo</button>
        <hr />
        </>
    )
}