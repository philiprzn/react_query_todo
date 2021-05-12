import React, { useState } from 'react';
import { fetchTodos } from './api';
import { useInfiniteQuery, useQuery } from 'react-query';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';

function Todos() {
  const {
    data,
    isLoading,
    isError,
    error,
    canFetchMore,
    fetchMore,
    isFetchingMore
  } = useInfiniteQuery('todos', fetchTodos, {
    getFetchMore: (lastGroup, pages) => {
      return lastGroup.offset;
    }
  });

  if (isLoading) return 'Loading...';

  if (isError) return <p>An error has occurred: {JSON.stringify(error)}</p>;

  return (
    <>
      <AddTodo isLoading={isLoading}/>
      <ul>
        {data.map((group, i) => (
          <React.Fragment key={i}>
              {group.records.map((record) => {
                const { fields, id } = record;

                return <TodoItem key={id} id={id} {...fields} />;
              })
            }
          </ React.Fragment>
        ))}
      </ul>
      <div>
        <button
          onClick={() => fetchMore()}
          disabled={isFetchingMore || !canFetchMore}
        >
          {isFetchingMore
            ? "Loading more..."
            : canFetchMore
              ? "Load more"
              : 'Nothing to load'
          }
        </button>
      </div>
    </>
  )
}

function App() {
  return (
    <Todos />
  );
}

export default App;
