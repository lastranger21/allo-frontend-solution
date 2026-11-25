<template>
  <div class="app-shell">
    <nav class="navbar">
      <div class="nav-inner">
        <RouterLink to="/" class="brand">SpaceX Launchers</RouterLink>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
  //
</script>
