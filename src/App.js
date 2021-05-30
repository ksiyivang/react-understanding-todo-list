
import React, { useState, useEffect } from 'react';


const initialTodos = [
  {
    id: 1,
    title: 'Todo #1',
    description: 'Desc del Todo #1',
    completed: false
  },
  {
    id: 2,
    title: 'Todo #2',
    description: 'Desc del Todo #2',
    completed: true
  }
];

const initialChoose = []

const localChoose = JSON.parse(localStorage.getItem('todoChoose'));

const localTodos = JSON.parse(localStorage.getItem('todos'));

const initialFormValues = {
  title: '',
  description: ''
}

const App = () => {

  const [todos, setTodos] = useState(localTodos || initialTodos);
  const [todoEdit, setTodoEdit] = useState(null);


  // Form

  const [formValues, setFormValues] = useState(initialFormValues)
  const { title, description } = formValues;
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  // Form

  // Choose todo
  const [valChooseTodo, setChooseTodo] = useState(localChoose || initialChoose)

  // Choose todo
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  useEffect(() => {
    localStorage.setItem('todoChoose', JSON.stringify(valChooseTodo));
  }, [valChooseTodo]);



  const todoDelete = async (e, todoId) => {
    e.preventDefault()
    setTimeout(() => {
      chooseTodoItem(e, todoId);
    }, 300);

    if (todoEdit && todoId === todoEdit.id) {
      setTodoEdit(null);
    }

    const changedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(changedTodos);

  }

  const chooseTodoItem = async (e, todoId) => {
    e.preventDefault();
    let _chooseTodos = todos.filter(todo => todo.id === todoId)
    let [id] = _chooseTodos
    let result = id;

    const newChooseTodo = [
      result,
      ...valChooseTodo
    ]
    setChooseTodo(newChooseTodo)
  }

  if (valChooseTodo) {
    console.log("valChooseTodo...: ", valChooseTodo)
    console.log("----------------------------------")
  }

  const todoCancel = async (e, todoId) => {
    e.preventDefault();

    const cancelChoose = valChooseTodo.filter(todo => todo.id === todoId);
    let [id] = cancelChoose
    let cancleResult = id;
    const newCanceTodo = [
      cancleResult,
      ...todos
    ]
    setTodos(newCanceTodo)
    console.log("cancelChoose: ", newCanceTodo)



    const _cancelchangedTodos = valChooseTodo.filter(todo => todo.id !== todoId);
    setChooseTodo(_cancelchangedTodos);



  }







  const todoToogleCompleted = (todoId) => {
    const changedTodos = todos.map(todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo);

    setTodos(changedTodos);
  }


  // Form


  useEffect(() => {

    if (todoEdit) {
      setFormValues(todoEdit);
    }

    else {
      setFormValues(initialFormValues);
    }

  }, [todoEdit])



  const handleInputChange = (e) => {

    const changedFormValues = {
      ...formValues,
      [e.target.name]: e.target.value
    }

    setFormValues(changedFormValues);
  }





  const todoAdd = (todo) => {

    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false

    }

    const changedTodos = [
      newTodo,
      ...todos,
    ]

    setTodos(changedTodos);
  }

  const todoUpdate = (todoEdit) => {

    const changedTodos = todos.map(todo => (
      todo.id === todoEdit.id
        ? todoEdit
        : todo
    ))

    setTodos(changedTodos);

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      setError('Please input title');
      return;
    }

    if (description.trim() === '') {
      setError('Please input description');
      return;
    }


    if (todoEdit) {
      todoUpdate(formValues);
      setSuccessMessage('Update Data Successfully');
    }

    else {
      todoAdd(formValues);
      setSuccessMessage('Add Data Successfully');
      setFormValues(initialFormValues);
    }

    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);

    setError(null);
  }




  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-8">
          <h2 className="text-right display-4">Khamla TodoList</h2>
          <h4>Display Data</h4>
          {/* TodoList */}
          {
            todos.length === 0
              ? (
                <div className="alert alert-primary">
                  No data display {":)"}
                </div>
              )
              : (
                todos.map(todo => (
                  <div className="card mt-2">
                    <div className="card-body">
                      <h3 className="card-title text-right">
                        <p>Id: {todo.id}</p>
                        <p> {todo.title}</p>

                        <button
                          onClick={() => todoToogleCompleted(todo.id)}
                          className={`btn btn-sm ${todo.completed ? 'btn-outline-success' : 'btn-success'} ml-2`}
                        >

                          {todo.completed ? 'Finished' : 'To do'}
                        </button>
                      </h3>
                      <p className="card-text text-right">
                        {todo.description}
                      </p>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <button
                          onClick={() => setTodoEdit(todo)}
                          className="btn btn-sm btn-outline-primary mr-2"
                        >
                          Update
                          </button>
                        <button
                          onClick={(e) => todoDelete(e, todo.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                          </button>
                      </div>
                    </div>

                  </div>
                ))
              )
          }

          <div style={{ padding: "20px" }} />
          <h4>Choose Data</h4>

          {
            valChooseTodo.length === 0
              ? (
                <div className="alert alert-primary">
                  No data display {":)"}
                </div>
              )
              : (
                valChooseTodo.map(todo => (
                  <div className="card mt-2">
                    <div className="card-body">
                      <h3 className="card-title text-right">
                        <p>Id: {todo.id}</p>
                        <p> {todo.title}</p>
                        <button
                          onClick={() => todoToogleCompleted(todo.id)}
                          className={`btn btn-sm ${todo.completed ? 'btn-outline-success' : 'btn-success'} ml-2`}
                        >

                          {todo.completed ? 'Finished' : 'To do'}
                        </button>
                      </h3>
                      <p className="card-text text-right">
                        {todo.description}
                      </p>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <button
                          onClick={(e) => todoCancel(e, todo.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Cancel
                          </button>
                      </div>
                    </div>

                  </div>
                ))
              )
          }

        </div>

        {/*  TodoForm */}
        <div className="col-4">
          <h2 className="text-center display-5">{todoEdit ? 'Update Information' : 'Insert Information'}</h2>
          {
            todoEdit &&
            <button
              onClick={() => setTodoEdit(null)}
              className="btn btn-sm btn-warning mb-2"
            > Cancel
                </button>
          }


          <form
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="title"
              className="form-control"
              value={title}
              name="title"
              onChange={handleInputChange}
            />

            <textarea
              placeholder="Description"
              className="form-control mt-2"
              value={description}
              name="description"
              onChange={handleInputChange}
            ></textarea>

            <button
              className="btn btn-primary btn-block mt-2"
            >{todoEdit ? 'Update' : 'Add'}
            </button>

          </form>



          {
            error &&
            (
              <div className="alert alert-danger mt-2">
                { error}
              </div>
            )

          }

          {
            successMessage && (
              <div className="alert alert-success mt-2">
                { successMessage}
              </div>
            )
          }



        </div>


      </div>
    </div>
  );
}

export default App;
