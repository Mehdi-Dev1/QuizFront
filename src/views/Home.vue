<template>
    <h1>Bienvenue, {{ name }}!</h1>
  </template>
  
  <script>
  export default {
  data() {
    return {
      name: ''
    };
  },
  mounted() {
    this.name = localStorage.getItem('name'); // Récupérer le nom d'utilisateur stocké
  }
};

  </script>
  
  <style>
  
  </style>
  