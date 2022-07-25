<script setup lang='ts'>
import { toggleDark } from '~/composables'
</script>
<template>
  <div class="navbar" flex justify-around mt-2 items-center>
    <div class="left" inline-flex justify-evenly flex-1>
      <img src="favicon.svg" alt="hello" class="logo" h-10>
      <!-- <div>Thawing X</div> -->
    </div>
    <div class="right" inline-flex text-xl flex-1 gap-4 items-center justify-center>
      <button icon-btn @click="toggleDark()">
        <div dark:i-carbon-moon i-carbon-sun />
      </button>
      <router-link to="/">Home</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/idea">Idea</router-link>
      <a icon-btn i-carbon-logo-github rel="noreferrer" href="https://github.com/ThawingX" target="_blank"
        title="GitHub" />


    </div>
  </div>

</template>
