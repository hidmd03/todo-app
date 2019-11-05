import React, {Component} from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  state = {
    input: '',
    todos: [
      {id: 0, text: '리액트 공부하기', done: true},
      {id: 1, text: '컴포넌트 스타일링 해보기', done: false}
    ]
  }

  id= 1;
  getId = () => {
    return ++this.id;
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({
      input: value,
    });
  }

  handleInsert = () => {
    const {todos, input} = this.state;

    const newTodo = {
      text: input,
      done: false,
      id: this.getId()
    };

    this.setState({
      todos: [...todos, newTodo],
      input: '',
    });
  }

  // 투두아이템 토글하기
  handleToggle = (id) => {
    // id 로 배열의 인덱스를 찾습니다.
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    
    // 찾은 데이터의 done 값을 반전시킵니다.
    const toggled = {
      ...todos[index],
      done: !todos[index].done
    };

    // slice 를 통하여 우리가 찾은 index 전 후의 데이터들을 복사합니다
    // 그리고 그 사이에는 변경된 투두 객체를 넣어줍니다.
    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    const index = todos.findIndex(todo=>todo.id === id);

    this.setState({
      todos: [
        ...todos.slice(0, index),
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }

  render() {
    const {input, todos} = this.state;
    const {handleChange, handleInsert, handleToggle, handleRemove} = this;

    return (
      <div>
        <PageTemplate>
          <TodoInput onChange={handleChange} onInsert={handleInsert} value={input}/>
          <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
        </PageTemplate>
      </div>
    );
  }
}

export default App;
