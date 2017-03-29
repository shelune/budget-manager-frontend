<template>
    <div class="col-sm-4 col-sm-offset-4">
        <h2>Log In</h2>
        <form class="form" @submit.stop.prevent="submit()">
            <div class="form-group">
                <label for="email" class="sr-only control-label">Email</label>
                <input
                    id="email"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    v-model="credentials.email"
                >
            </div>
            <div class="form-group">
                <label for="password" class="sr-only control-label">Username</label>
                <input
                    id="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="credentials.password"
                >
            </div>
            <div class="alert alert-danger" v-if="error">

            </div>
            <button class="btn btn-primary" type="submit">Login</button>
        </form>
    </div>
</template>

<script>

export default {
    data () {
        return {
            credentials: {
                email: '',
                password: ''
            },
            error: false,
            errorMsg: {}
        }
    },
    methods: {
        submit () {

        }
    }
}
</script>
