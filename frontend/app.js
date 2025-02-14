const API_URL = 'http://localhost:3000/todos'
const form = document.getElementById('todoForm')
const todoList = document.getElementById('todoList')

// Load todos on startup
document.addEventListener('DOMContentLoaded', fetchTodos)

// Form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const title = document.getElementById('title').value
  
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    })
    form.reset()
    fetchTodos()
  } catch (err) {
    alert('Failed to add todo')
  }
})

// Fetch and display todos
async function fetchTodos() {
  try {
    const response = await fetch(API_URL)
    const todos = await response.json()
    
    todoList.innerHTML = ''
    todos.forEach(todo => {
      const div = document.createElement('div')
      div.className = 'todo'
      div.innerHTML = `
        <span>${todo.title}</span>
        <button onclick="editTodo('${todo._id}')">Edit</button>
        <button onclick="deleteTodo('${todo._id}')">Delete</button>
      `
      todoList.appendChild(div)
    })
  } catch (err) {
    alert('Failed to load todos')
  }
}

// Delete todo
async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    fetchTodos()
  } catch (err) {
    alert('Failed to delete todo')
  }
}

// Edit todo
async function editTodo(id) {
  const newTitle = prompt('Enter new title')
  if (newTitle) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      })
      fetchTodos()
    } catch (err) {
      alert('Failed to update todo')
    }
  }
}