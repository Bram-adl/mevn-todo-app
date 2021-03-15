<template>
  <div class="Todos">
    <div class="TodosHeader">
      <h1>All Todos</h1>
    </div>

    <div class="TodosItem" v-for="todo in todos" :key="todo._id">
      <div class="Todo-Title" :class="{ completed: todo.completed }">
        <p v-if="!todo.editing" @dblclick="editTodo(todo)">{{ todo.title }}</p>
        <input type="text" v-model="todo.title" @blur="updateTodo(todo)" @keyup.enter="updateTodo(todo)" v-focus v-else />
      </div>
      <div class="Todo-ActionsBox">
        <div
          class="Todo-CheckBox"
          v-if="!todo.completed"
          @click="markTodo(todo)"
        ></div>
        <div class="Todo-CompleteBox" v-else @click="markTodo(todo)">
          <i class="fas fa-check"></i>
        </div>
        <div class="Todo-DeleteBox" @click="deleteTodo(todo)">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </div>

    <div class="TodosCreateButton">
      <button type="button" @click="createTodo">
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <transition name="fadeInUp">
      <form class="TodosCreateForm" @submit.prevent="storeTodo" v-if="form">
        <i class="fas fa-times" @click="createTodo"></i>
        <label for="title">Todo Title</label>
        <input type="text" id="title" v-model="title" />
        <button type="submit">Create Todo</button>
      </form>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

export default {
  name: "TodosComponent",

  data() {
    return {
      todos: [],
      title: "",
      form: false,
    };
  },

  mounted() {
    this.getTodos();
  },

  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },

  methods: {
    getTodos() {
      axios
        .get("/todos")
        .then(({ data }) => {
          this.todos = data;
        })
        .catch(({ response }) => {
          console.log(response.data);
        });
    },

    createTodo() {
      this.form = this.form ? false : true;
    },

    storeTodo() {
      axios
        .post("/todos", {
          title: this.title,
          completed: false,
          editing: false,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .then(({ data }) => {
          this.todos.push(data.ops[0]);
          this.title = "";
          this.form = false;
        })
        .catch(({ response }) => {
          console.log(response.data);
        });
    },

    editTodo(todo) {
      todo.editing = true;
    },

    updateTodo(todo) {
      const index = this.todos.findIndex((item) => item._id === todo._id);
      console.log(index);

      axios
        .put('/todos/' + todo._id, {
          title: todo.title,
          completed: todo.completed,
          editing: false,
          created_at: todo.created_at,
          updated_at: new Date()
        })
        .then(() => {
          this.getTodos();
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    markTodo(todo) {
      if (!todo.completed) {
        this.markComplete(todo);
      } else {
        this.markUncomplete(todo);
      }
    },

    markComplete(todo) {
      axios
        .put("/todos/" + todo._id, {
          title: todo.title,
          completed: true,
          editing: false,
          created_at: todo.created_at,
          updated_at: new Date(),
        })
        .then(() => {
          this.getTodos();
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    markUncomplete(todo) {
      axios
        .put("/todos/" + todo._id, {
          _id: todo._id,
          title: todo.title,
          completed: false,
          editing: false,
          created_at: todo.created_at,
          updated_at: new Date(),
        })
        .then(() => {
          this.getTodos();
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },

    deleteTodo(todo) {
      const index = this.todos.findIndex((item) => item._id === todo._id);

      axios
        .delete("/todos/" + todo._id)
        .then(() => {
          this.todos.splice(index, 1);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },
};
</script>

<style lang="scss">
.Todos {
  position: relative;
  display: block;

  width: 100%;
  max-width: 360px;
  height: 640px;

  margin: 0;
  padding: 1rem 1rem 5.5rem;

  background: linear-gradient(to bottom, #efeaea, #dedbdb);
  color: #545454;

  border-radius: 0.25rem;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.16);

  overflow-y: auto;
  z-index: 1;

  .TodosHeader {
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid lightgray;

    h1 {
      font-size: 1.5rem;
      font-weight: normal;
      text-align: center;
    }
  }
}

.TodosItem {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 1rem 0;
  padding: 0.8rem 1rem;

  background: #eaeaea;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 100rem;

  .Todo-Title {
    flex: 1;
    transition: 0.2s ease-out;
    overflow-x: auto;

    p {
      padding: 0.25rem;
    }

    &.completed p {
      color: lightgrey;
      text-decoration: line-through;
    }

    input {
      appearance: none;
      border: none;
      outline: none;

      color: #545454;
      font-family: inherit;
      font-size: 1rem;

      width: 100%;
      height: auto;

      margin: 0;
      padding: 0.25rem;
    }
  }

  .Todo-ActionsBox {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;

    .Todo-CheckBox {
      width: 1.5rem;
      height: 1.5rem;

      background: #eaeaea;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);

      cursor: pointer;
      transition: 0.2s ease-out;

      &:hover {
        background: darken(#eaeaea, 5%);
      }
    }

    .Todo-CompleteBox {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 1.5rem;
      height: 1.5rem;

      background: rgb(73, 170, 73);
      border-radius: 50%;

      cursor: pointer;
      transition: 0.2s ease-out;

      &:hover {
        background: darken($color: rgb(73, 170, 73), $amount: 5%);
      }

      .fa-check {
        color: #eaeaea;
        font-size: 0.8rem;
        line-height: 0;
        margin-top: 0.2rem;
      }
    }

    .Todo-DeleteBox {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 1.5rem;
      height: 1.5rem;

      background: rgb(212, 62, 62);
      border-radius: 50%;

      cursor: pointer;
      transition: 0.2s ease-out;

      &:hover {
        background: darken($color: rgb(212, 62, 62), $amount: 5%);
      }

      .fa-trash {
        color: #eaeaea;
        font-size: 0.8rem;
        line-height: 0;
        margin-top: 0.2rem;
      }
    }
  }
}

.TodosCreateButton {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -2.25rem);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 360px;
  height: 100px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));

  z-index: 9;

  button {
    width: 3.5rem;
    height: 3.5rem;

    background: linear-gradient(to top, rgb(36, 111, 197), rgb(43, 96, 165));
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24);
    border: none;
    border-radius: 50%;
    outline: none;

    cursor: pointer;
    transition: 0.2s ease-out;

    &:hover {
      background: linear-gradient(to top, rgb(33, 102, 182), rgb(37, 83, 143));
    }

    .fa-plus {
      color: #efeaea;
      font-size: 1.5rem;
    }
  }
}

.TodosCreateForm {
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  height: 50%;

  margin: 0;
  padding: 1rem;

  background: rgb(36, 111, 197);
  color: #eaeaea;

  z-index: 10;

  .fa-times {
    position: absolute;
    right: 1rem;
    top: 1rem;

    cursor: pointer;
    transition: 0.2s ease-out;

    &:hover {
      color: rgb(212, 62, 62);
    }
  }

  label {
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  input {
    display: block;

    width: 100%;
    height: auto;

    margin: 1rem 0;
    padding: 0.75rem 1rem;

    border: none;
    border-radius: 0.125rem;
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);

    color: #545454;
  }

  button {
    display: block;

    width: 100%;
    height: auto;

    margin: 0;
    padding: 0.75rem 1rem;

    border: none;
    border-radius: 0.125rem;
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);

    background: rgb(73, 170, 73);
    color: #eaeaea;

    font-weight: bold;
    font-size: 1rem;

    cursor: pointer;
    transition: 0.2s ease-out;

    &:hover {
      background: darken(rgb(73, 170, 73), 5%);
    }
  }
}

.fadeInUp-enter-active,
.fadeInUp-leave-active {
  transition: 0.2s ease-out;
}

.fadeInUp-enter,
.fadeInUp-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
