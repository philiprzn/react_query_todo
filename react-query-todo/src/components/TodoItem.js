import React from 'react';
import { useMutation, useQueryCache } from 'react-query';
import { deleteTodo, updateTodo } from '../api';

export const TodoItem = ({id, text, isCompleted }) => {
    const queryCache = useQueryCache();

    const [mutateCheck] = useMutation(updateTodo, {
        // onSuccess: () => queryCache.invalidateQueries('todos')

        onMutate: (newTodo) => {
            queryCache.cancelQueries("todos");
            const previousQuery = queryCache.getQueryData("todos");

            queryCache.setQueryData("todos", (oldQuery) => {
                return oldQuery.map(group => {
                    return {
                        ...group,
                        record: group.records.map(rec => {
                            if(rec.id === newTodo.id) {
                                return {
                                    ...rec,
                                    fields: {...rec.fields, ...newTodo.fields}
                                }
                            } else {
                                return rec;
                            }
                        })
                    }
                })
            })
            return () => queryCache.setQueryData("todos", previousQuery);
        },
        onError: (err, newTodo, rollback) => rollback(),
        onSettled: (newTodo) => {
            queryCache.invalidateQueries('todos')
        }
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
