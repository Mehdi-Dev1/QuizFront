<template>
  <div>
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>  |
      <router-link to="/admin">Admin</router-link>  |
      <router-link to="/home">Home</router-link>
    </nav>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
        />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          v-model="password"
        />
      </div>
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      const response = await fetch('http://localhost:3003/api/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const name = data.name;
        const role = data.role;
          localStorage.setItem('authToken', token);
          localStorage.setItem('name', name); // Stocker le nom d'utilisateur
          localStorage.setItem('role', role);
          console.log('role stocké:', localStorage.getItem('role'));
          
        alert('Login reussi!');
        this.$router.push({ name: 'home' });
     
      } else {
        alert('Login failed');
      }
    }
  }
};

</script>

<style>

</style>
