<template>
  <div class="home">
    <h1>Welcome to the App!</h1>
    <div v-if='!loggedIn'>
      <p>계속 이용하기 위해서는</p>
      <router-link to='/login'>
        Login
      </router-link>
        또는
      <router-link to='/register'>
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
import { authComputed } from '../store/helpers.js';
export default {
  computed: {
    ...authComputed
  }
};
</script>
