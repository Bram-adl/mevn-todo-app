<template>
  <div class="TodosPage">
    <TodosComponent />
  </div>
</template>

<script>
import TodosComponent from '../components/TodosComponent';

export default {
  name: 'Todos',

  components: {
    TodosComponent,
  },
}
</script>

<style lang="scss">
.TodosPage {
  width: 100%;
  height: calc(100vh - 75px);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>