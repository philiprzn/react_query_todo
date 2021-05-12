const BASE = 'appDFm7JIwITH5QZJ';
const TABLE = 'Table%201';
const VIEW = 'Grid%20view';
const API_URL = 'https://api.airtable.com/v0';

const AUTH_HEADER = {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_TOKEN}`
};

export const fetchTodos = (key, cursor) => {
    let url = `${API_URL}/${BASE}/${TABLE}/?view=${VIEW}&pageSize=${3}`;

    if(cursor) {
        url = url + `&offset=${cursor}`;
    }

    const result = fetch(url, {
        headers: {
            ...AUTH_HEADER,
        }
    }).then(res => res.json());

    return result;
};

export const updateTodo = ({id, fields}) => {
    let url = `${API_URL}/${BASE}/${TABLE}/${id}`;

    return fetch(url, {
        method: 'PATCH',
        headers: {
            ...AUTH_HEADER,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields })
    })
};

export const deleteTodo = (id) => {
    let url = `${API_URL}/${BASE}/${TABLE}/${id}`;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            ...AUTH_HEADER
        }
    })
}

export const createTodo = (fields) => {
    let url = `${API_URL}/${BASE}/${TABLE}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            ...AUTH_HEADER,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields }),
    })
};

// CAN ADD TO headers -> "Content-Type": "application/json"
