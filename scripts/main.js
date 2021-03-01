// --- Vue App --- //
var app = new Vue({
  el: '#app',
  
  data: {
    newTodo: "",
    todos: [],
  },

  created() {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      } catch(e) {
        localStorage.removeItem('todos');
      }
    }
    console.log("todos:", this.todos);
  },
  
  methods: {
    addTodo() {
      console.log("newTodo:", this.newTodo)

      if (!this.newTodo) {
        return;
      };
      
      // New Object
      let id = uid();
      let text = this.newTodo;
      
      console.log("New Todo:", id, text)

      this.todos.push({
        id,
        text
      });
      
      // inputを空にする
      this.newTodo = '';

      // Save
      this.saveTodos();
    },
    removeTodo(index) {
      this.$delete(this.todos, index)
      this.saveTodos();
    },
    saveTodos() {
      let parsed = JSON.stringify(this.todos);
      localStorage.setItem('todos', parsed);
    }
  }
})

// --- Generate UUID --- //
const uid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
    .replace(/y/g, () => (Math.floor(Math.random() * 4) + 8).toString(16))
  ;
};