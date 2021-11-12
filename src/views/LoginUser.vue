<template>
    <div>
        <form @submit.prevent='login'>
            <label for='email'>
                Email:
            </label>
            <input v-model='email' type='email' name='email' value />

            <label for='password'>
                Password:
            </label>
            <input v-model='password' type='password' name='password' value />

            <button type='submit' name='button'>
                Login
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errors: null,
        };
    },
    methods: {
        login() {
            const userData = {
                email: this.email,
                password: this.password
            };
            console.log('userData: ', userData)
            this.$store
            .dispatch('login', userData)
            .then(() => {
                console.log('userData after dispatch: ', userData);
                this.$router.push({ name: 'dashboard' });
            })
            .catch(err => {
                this.errors = err.response.data.errors;
            });
        }
    }
};
</script>
