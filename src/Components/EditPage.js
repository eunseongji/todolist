import React, { Component } from "react";
import "./EditPage.css";
import axios from "axios";

class EditPage extends Component {
  state = {
    id: 0,
    title: "",
    contents: "",
  };

  componentDidMount() {
    const { id, title, contents } = this.props.history.location.state;

    this.setState({
      id: id,
      title: title,
      contents: contents,
    });
  }

  handleChange = (e) => {
    //수정할 때 계속 렌더링 되는 함수
    this.setState({
      [e.target.name]: e.target.value, //이벤트 객체에 담겨있는 현재의 텍스트 값을 읽어옴
    });
  };

  HandleUpdate = (id) => {
    //수정후 업데이트
    axios
      .post("http://localhost:5000/todos/edit", {
        id: this.state.id,
        title: this.state.title,
        contents: this.state.contents,
      })
      .then((response) => {
        const { todos } = this.state;
        const { data } = response;
        console.log(data);

        if (data === "success") {
          this.props.history.push("/", todos);
        } else if (data === "fail") {
          alert("fail");
        }
      });
  };

  render() {
    console.log(this.state);
    const { title, contents } = this.state;

    return (
      <main className="edit-template">
        <div className="edit-title">Edit Form</div>
        <section className="edit-form-wrapper">
          <div className="edit-form">
            <input
              className="title-input"
              placeholder="what needs to be done?"
              value={title}
              onChange={this.handleChange}
              name="title"
            />
            <textarea
              className="content-input"
              value={contents}
              onChange={this.handleChange}
              name="contents"
            />
            <div className="confirm-button" onClick={this.HandleUpdate}>
              Update
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default EditPage;
