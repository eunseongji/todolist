/* Main.js 에서 받은 props 와 component 들을 통해 TodoList 프로젝트의 전체적인 틀과 Markup을 완성시키는 프로젝트의 틀의 역할*/
import React from 'react';
import './TodoListTemplate.css';

const TodoListTemplate = ({form, children}) => { //비구조화 할당
    return (
      <main className="todo-list-template">
        <div className="title">
          To do list
        </div>
        <section className="form-wrapper">
          { form }
        </section>
        <section className="todos-wrapper">
          { children }
        </section>
      </main>
    );
  };

  
  
  export default TodoListTemplate;