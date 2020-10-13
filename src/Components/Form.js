/*  Todo List 프로젝트의 입력을 담당하는 Component로 추가되는 input과 button을 제어 */
import React from "react";
import "./Form.css";

//이 컴포넌트는 총 4가지의 props를 받아옴
//value: 인풋의 내용
//onCreate: 버튼이 클릭 될 때 실행 될 함수
//onChange: 인풋 내용이 변경 될 때 실행되는 함수
//onKeyPress: 인풋에서 키를 입력 할 때 실행되는 함수. Enter시 onCreate
const Form = ({ value, onChange, onCreate, onKeyPress }) => {
  return (
    <div className="form">
      <input
        placeholder="what needs to be done?"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className="create-button" onClick={onCreate}>
        add
      </div>
    </div>
  );
};

export default Form;
