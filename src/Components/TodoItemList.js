import React, { Component } from 'react';
import TodoItem from './TodoItem';

//todos: todo 객체들이 들어있는 배열
//onToggle: 체크박스를 키고 끄는 함수
//onRemove: 아이템을 삭제시키는 함수
class TodoItemList extends Component {

  shouldComponentUpdate(nextProps, nextState) { //컴포넌트 최적화 - 자원낭비를 막기 위해 \
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, onToggle, onRemove, onEdit } = this.props;

    const todoList = todos.map(
      ({id, title, checked}) => (
        <TodoItem
          id={id}
          text={title}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
          key={id}
        />
      )
    );

    return (
      <div>
        {todoList}        
      </div>
    );
  }
}

export default TodoItemList;