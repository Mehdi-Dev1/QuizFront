<template>
    <h1>Bienvenue, {{ role }}!</h1>
    <div>
        Ajouter quiz
        <form @submit.prevent="handleLogin">
            <div>
              <label for="quizname">Nom du quiz:</label>
              <input
                type="text"
                id="quizname"
                v-model="quizname"
              />
            </div>
            
            <div v-for="(question, index) in question" :key="index">
              <label for="text">Question</label>
              <input
                type="text"
                id="question"
                v-model="questionss"

            </div>
            <button type="submit">envoyer quiz</button>
            <button @click="addquestion">Ajouter une question</button>
            <button >enlever question</button>
          </form>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      role: '',
      question: []
    };
    
  },
  methods:{
    addquestion(){
        this.question.push(`question ${this.question.length + 1}`);
    },
    removequestion(){
        this.question.splice(`question ${this.question.length - 1}`);
    }
        
    },
  mounted() {
    this.role = localStorage.getItem('role'); // Récupérer le nom d'utilisateur stocké
  }
};

  </script>
  
  <style>
  
  </style>
  