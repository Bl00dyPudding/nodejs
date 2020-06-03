new Vue({
    el: '#app',
    vuetify: new Vuetify({
        theme: {dark: false}
    }),
    data() {
        return {
            isDark: false,
            todoTitle: '',
            todos: []
        }
    },
    created() {
        fetch('/api/todo', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then((todos) => {
                console.log(todos)
                this.todos = todos
            })
            .catch(err => console.error(err))
    },
    methods: {
        addTodo() {
            const title = this.todoTitle.trim()
            if (!title) return
            // this.todos.push({
            //     title: title,
            //     id: Math.random(),
            //     done: false,
            //     date: new Date()
            // })
            fetch('/api/todo', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            })
                .then(res => res.json())
                .then(({todo}) => {
                    console.log(todo)
                    this.todos.push(todo)
                    this.todoTitle = ''
                })
                .catch(err => console.error(err))
        },
        removeTodo(id) {
            this.todos = this.todos.filter(t => t.id !== id)
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        date(value, withTime) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }
            if (withTime) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }
            return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
        }
    }
})