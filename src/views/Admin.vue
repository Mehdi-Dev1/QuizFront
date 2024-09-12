<template>
  <h1>Bienvenue, {{ role }}!</h1>
  <div>
    Ajouter quiz
    <form @submit.prevent="handleQuizSubmit">
      <div>
        <div>
          Nom du quiz : <input v-model="quiz.quizName" />
        </div>
        <div>
          Description : <input v-model="quiz.descQuiz" />
        </div>
        <div>
          Question {{ QuestionNumber }} : 
          <input v-model="currentQuestion.questionText" />
        </div>
      </div>
      
      <!-- Bouton pour ajouter une nouvelle question -->
      <button type="button" @click="addQuestion">Ajouter une question</button>
      
      <!-- Section pour les réponses -->
      <div v-for="(reponse, index) in currentQuestion.reponses" :key="index">
        Réponse {{ index + 1 }} : 
        <input v-model="currentQuestion.reponses[index]" />
      </div>
      
      <!-- Bouton pour ajouter une réponse -->
      <button type="button" @click="addReponse">Ajouter une réponse</button>

      <button type="submit">Envoyer</button>
    </form>

    <!-- Bouton pour passer à la question précédente -->
    <button @click="prevQuestion" :disabled="QuestionNumber <= 1">Question précédente</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const role = ref(localStorage.getItem('role') || '')
const QuestionNumber = ref(1) // Index de la question actuelle
const currentQuestion = ref({ questionText: '', reponses: ['', '', '', ''] }) // Question en cours d'édition
const quiz = ref({
  quizName: '',
  descQuiz: '',
  questions: [] // Tableau contenant toutes les questions
})

// Soumettre le quiz
const handleQuizSubmit = async () => {
  try {
    // Soumettre le quiz (nom et description) au serveur
    const response = await fetch('http://localhost:3003/api/users/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quizName: quiz.value.quizName,
        descQuiz: quiz.value.descQuiz,
        questions: quiz.value.questions

      
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la soumission du quiz')
    }

    console.log('Quiz soumis avec succès!')
  } catch (error) {
    console.error('Erreur lors de la soumission du quiz:', error)
  }
}

// Ajouter une nouvelle question
const addQuestion = async () => {
  try {
    // Soumettre la question au serveur
    const response = await fetch('http://localhost:3003/api/users/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quiz_id: 1, // Remplace par l'ID du quiz si nécessaire
        question_text: currentQuestion.value.questionText
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout de la question')
    }

    const data = await response.json()

    // Ajouter l'ID de la question aux questions du quiz
    const newQuestion = {
      questionText: currentQuestion.value.questionText,
      reponses: currentQuestion.value.reponses,
      id: data.questionId
    }
    quiz.value.questions.push(newQuestion)

    // Incrémenter l'index pour passer à la prochaine question
    QuestionNumber.value++

    // Réinitialiser la question courante
    currentQuestion.value = { questionText: '', reponses: ['', '', '', ''] }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la question:', error)
  }
}

// Ajouter une réponse
const addReponse = () => {
  currentQuestion.value.reponses.push('') // Ajouter une nouvelle réponse vide
}

// Revenir à la question précédente
const prevQuestion = async () => {
  if (QuestionNumber.value > 1) {
    // Sauvegarder la question actuelle
    try {
      const questionIndex = QuestionNumber.value - 2 // Index de la question précédente
      const responses = currentQuestion.value.reponses.map((text, index) => ({
        question_id: quiz.value.questions[questionIndex].id,
        reponse_text: text,
        correct: index === 0 // Change en fonction de la logique de ton application
      }))

      await Promise.all(responses.map(response =>
        fetch('http://localhost:3003/api/users/reponses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(response)
        })
      ))

      // Décrémenter l'index pour revenir à la question précédente
      QuestionNumber.value--

      // Charger la question précédente
      currentQuestion.value = { ...quiz.value.questions[QuestionNumber.value - 1] }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réponse:', error)
    }
  }
}
</script>

<style>
/* Ajoute ici tes styles */
</style>
