/*Form 에서 입력되고 Main.js의 state로 등록된 데이터를 하나하나 개별적으로 관리하고 최적화할 역할*/
import React, { Component } from 'react';
import './TodoItem.css';

//text: todo 내용
//checked: 체크박스 상태
//id: todo 의 고유 아이디
//onToggle: 체크박스를 키고 끄는 함수
//onRemove: 아이템을 삭제시키는 함수
class TodoItem extends Component {

  shouldComponentUpdate(nextProps, nextState) { //컴포넌트가 필요할 때만 리렌더링
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { text, checked, id, onToggle, onRemove, onEdit } = this.props; //비구조화 할당 

    console.log(checked)

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle(부모의 클릭 이벤트) 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        <div className={`todo-text ${checked==='true' && 'checked' }`}> 
          <div>{text}</div>
        </div>
          <div className="edit-button" onClick={(e) => {
              e.stopPropagation(); // onToggle(부모의 클릭 이벤트) 이 실행되지 않도록 함
              onEdit(id)}
          }>edit</div>
   
        {
          checked==='true' && (<div className="check-mark">✓</div>)
        }
      </div>
    );
  }
}

export default TodoItem;