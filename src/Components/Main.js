import React, { Component } from "react";
import TodoListTemplate from "./TodoListTemplate";
import Form from "./Form";
import TodoItemList from "./TodoItemList";
import axios from "axios";

class Main extends Component {
  id = 1;

  state = {
    input: "",
    todos: [],
  };

  componentDidMount() {
    //렌더링이 끝난 후에 호출되는 함수
    axios.get("http://localhost:5000/todos").then((response) => {
      //서버에서 데이터 받기
      const { data } = response;
      console.log(data);

      this.setState({
        //서버에서 받은 값 todos에 넣기
        todos: data,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value, // input 의 다음 바뀔 값
    });
  };

  handleCreate = () => {
    //아이템 추가
    axios
      .post("http://localhost:5000/todos/insert", {
        title: this.state.input,
      })
      .then((response) => {
        //서버에서 데이터 받기
        const { data } = response;

        this.setState({
          input: "", // 인풋 비우고
          //concat 을 사용하여 배열에 추가
          todos: this.state.todos.concat({
            id: data.insertId,
            title: this.state.input,
            contents: "",
            checked: "false",
          }),
        });
      });
  };

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  handleToggle = (id) => {
    //체크 하기/풀기
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex((todo) => todo.id === id);
    //console.log(todos[index]);

    if (todos[index].checked === "true") {
      todos[index].checked = "false";
    } else if (todos[index].checked === "false") {
      todos[index].checked = "true";
    }

    console.log(todos[index]);
    axios
      .post("http://localhost:5000/todos/Update", {
        id: id,
        checked: todos[index].checked,
      })
      .then((response) => {
        const { data } = response;
        console.log(data);

        const nextTodos = [...todos]; // 배열을 복사

        let todosUpdate = nextTodos.map((values) => {
          if (data.id === values.id) {
            values = {
              ...values,
              checked: data.checked,
            };
          }
          return values;
        });

        this.setState({
          //서버에서 받은 값 todos에 넣기
          todos: todosUpdate,
        });
      });
  };

  handleRemove = (id) => {
    //아이템 제거
    axios
      .delete("http://localhost:5000/todos/delete", {
        data: {
          id: id,
        },
      })
      .then((response) => {
        const { todos } = this.state;
        const { data } = response;

        console.log(data);

        this.setState({
          todos: todos.filter((todo) => todo.id !== data.id), // 내장함수 filter - 파라미터로 받아온 id를 갖고 있지 않는 배열 새로 생성
        });
      });
  };

  handleEdit = (id) => {
    //아이템 수정페이지로 이동할 때 아이템 값 전달
    const { todos } = this.state;
    const index = todos.findIndex((todo) => todo.id === id);
    const selected = todos[index]; // 선택한 객체
    this.props.history.push("/EditPage", selected);
  };

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleEdit,
    } = this;

    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />
        }
      >
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onEdit={handleEdit}
        />
      </TodoListTemplate>
    );
  }
}

export default Main;
