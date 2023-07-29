import { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer';

export const useTodos = () => {

    const init = () => JSON.parse( localStorage.getItem('todos') ) || [];

    const [todos, dispatch] = useReducer( todoReducer, [], init );

    useEffect(() => {
        localStorage.setItem( 'todos', JSON.stringify(todos) )
    }, [todos])

    const handleNewTodo = ( todo ) =>
    {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) =>
    {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) =>
    {
        dispatch({
            type: '[TODO] Toogle Todo',
            payload: id
        });
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}

