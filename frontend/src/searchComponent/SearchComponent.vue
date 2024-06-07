<template>
    <div class="container mx-auto p-4">
        <div class=" p-4 w-full mb-4 text-center">Ecommece Assignment</div>
      <input 
        v-model="query" 
        @input="handleInput" 
        class="border p-4 w-full mb-4 border-black rounded-md text-center" 
        type="text" 
        placeholder="Search for clothes..." 
      />
      <button 
        @click="toggleShowAll" 
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {{ showAll ? 'Hide All' : 'Show All' }}
      </button>
      <div v-if="results.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="item in results" :key="item._id" class="border p-5 border-black">
          <h2 class="text-xl font-bold">{{ item.name }}</h2>
          <p class="text-gray-600">{{ item.description }}</p>
          <p class="text-gray-800 font-semibold">{{ item.price }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        query: '',
        results: [],
        showAll: false
      };
    },
    methods: {
      async handleInput() {
        if (this.query.length > 3) {
          try {
            const response = await axios.get(`http://localhost:8080/api/products/search?q=${this.query}`);
            this.results = response.data;
          } catch (error) {
            console.error("There was an error fetching the search results:", error);
          }
        } else {
          this.results = [];
        }
      },
      async toggleShowAll() {
        this.showAll = !this.showAll;
        if (this.showAll) {
          try {
            const response = await axios.get('http://localhost:8080/api/products');
            this.results = response.data;
          } catch (error) {
            console.error("There was an error fetching all products:", error);
          }
        } else {
          this.results = [];
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if necessary */
  </style>
  