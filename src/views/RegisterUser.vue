<template>
    <div>
        <form @submit.prevent='register'>
            <label for='name'>
                Name:
            </label>
            <input v-model='username' type='text' name='name' value />

            <label for='email'>
                Email:
            </label>
            <input v-model='email' type='email' name='email' value />

            <label for='password'>
                Password:
            </label>
            <input v-model='password' type='password' name='password' value />

            <button type='submit' name='button'>
                Register
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            errors: null,
        }
    },
    methods: {
        register() {
            const userData = {
                name: this.username,
                email: this.email,
                password: this.password
            };
            console.log('userData: ', userData)
            this.$store
            .dispatch('register', userData)
            .then(() => {
                console.log('userData after dispatch: ', userData);
                this.$router.push({ name: 'dashboard' });
            });
        }
    }
};
</script>
