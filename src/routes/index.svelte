<script>
    import TodoItem from "../lib/TodoItem.svelte";
    const title = "Todo"
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>
<form action="">
    <input type="text" name="todo" aria-label="Add a todo" placeholder="+ Type to add a todo">
</form>
<TodoItem/>