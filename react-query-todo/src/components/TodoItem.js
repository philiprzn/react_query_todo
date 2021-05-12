import React from 'react';
import { useMutation, useQueryCache } from 'react-query';
import { deleteTodo, updateTodo } from '../api';

export const TodoItem = ({id, text, isCompleted }) => {
    const queryCache = useQueryCache();

    const [mutateCheck] = useMutation(updateTodo, {
        onSuccess: () => queryCache.invalidateQueries('todos')
    });

    const [mutateDelete] = useMutation(deleteTodo, {
        onSuccess: () => queryCache.invalidateQueries('todos')
    });

    const onCheck = (event) => {
        mutateCheck({id, fields: { isCompleted: event.target.checked }})
    };

    const remove = () => {
        mutateDelete(id)
    };

    return (
        <li>
            <span>{text}</span>
            <input type='checkbox' checked={!!isCompleted} onChange={onCheck} />
            <button onClick={remove}>Delete</button>
        </li>
    )
}
