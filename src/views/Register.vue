<template>
  <div>
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </nav>
    <h2>Register</h2>
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
      <div>
        <label for="username">Nom:</label>
        <input
          type="text"
          id="name"
          v-model="name"
        />
      </div>
      <div>
        <label for="username">Prénom:</label>
        <input
          type="text"
          id="firstname"
          v-model="firstname"
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
      const response = await fetch('http://localhost:3003/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          name: this.name,
          firstname: this.firstname
        })
      });

      if (response.ok) {

        const data = await response.json();


        alert('Enregistrement réussi!');

     
      } else {
        alert('register failed');
      }
    }
  }
};

</script>
