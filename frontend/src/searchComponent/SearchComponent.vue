<template>
    <div class="container mx-auto p-4">
        <div class=" p-2 w-full mb-4 text-center font-bold text-[rgb(126,123,219)] text-[5vh] underline underline-offset-4">ZIMSHARE ASSIGNMENT</div>
      <input 
        v-model="query" 
        @input="handleInput" 
        class="border-[0.3vh] p-2 w-full mb-4 text-center rounded-lg border-[rgb(129,129,129)]"  
        type="text" 
        placeholder="Search for clothes...   try searching for eg -> 'Classic T-Shirt' 'Denim Jacket' 'Leather Boots'  or click on 'show all' to see all.." 
      />
      <button 
        @click="toggleShowAll" 
        class="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        {{ showAll ? 'Hide All' : 'Show All' }}
      </button>
      <div v-if="results.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="item in results" :key="item._id" class="border p-4">
          <img :src="item.image" alt="Product Image" class="w-full h-auto mb-4" />
          <h2 class="text-xl font-bold">{{ item.name }}</h2>
          <p class="text-gray-600">{{ item.description }}</p>
          <p class="text-gray-800 font-semibold">${{ item.price.toFixed(2) }}</p>
          <p class="text-gray-500">Category: {{ item.category }}</p>
          <p class="text-gray-500">Brand: {{ item.brand }}</p>
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
        if (this.query.length > 2) {
          try {
            const response = await axios.get(`https://intern-assignment-zimeshare-backend.vercel.app/api/products/search?q=${this.query}`);
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
            const response = await axios.get('https://intern-assignment-zimeshare-backend.vercel.app/api/products');
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
  