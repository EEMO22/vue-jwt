<template>
    <div id='nav'>
        <router-link to='/'>
        Home |
        </router-link>
        <router-link to='/dashboard'>
        Dashboard |
        </router-link>
        <router-link v-if='!loggedIn' to='/login'>
        Login |
        </router-link>
        <router-link v-if='!loggedIn' to='/register'>
        Register
        </router-link>
    </div>
</template>