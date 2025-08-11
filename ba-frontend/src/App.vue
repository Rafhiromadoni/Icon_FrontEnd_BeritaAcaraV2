<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
}
</script>

<template>
  <header class="main-header">
    <div class="wrapper">
      <nav>
        <div v-if="authStore.isLoggedIn" class="nav-logout">
          <button @click="handleLogout" class="nav-button">Logout</button>
        </div>

        <template v-if="authStore.isLoggedIn">
          <RouterLink to="/">Generator</RouterLink>
          <RouterLink to="/history">Riwayat</RouterLink>
          <RouterLink to="/preview">Preview</RouterLink>
        </template>
        <div v-if="authStore.isLoggedIn" class="nav-user">
          <span v-if="authStore.user" class="user-greeting">{{ authStore.user.username }}</span>
        </div>

        <template v-else>
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </template>
      </nav>
    </div>
  </header>

  <div class="content">
  </div>
  <RouterView v-slot="{ Component }">
    <KeepAlive exclude="HistoryPage">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  flex-shrink: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

nav {
  width: 100%;
  font-size: 1rem;
  box-sizing: border-box;
  position: relative; 
  display: flex;
  justify-content: center; 
  align-items: center;
}

nav a{
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  color: #333;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: inherit;
}

nav a:hover, .nav-button:hover {
  background-color: #f4f4f4;
}

nav a.router-link-exact-active {
  background-color: #007bff;
  color: white;
}
.nav-logout {
  position: absolute;
  left: 2rem; 
  top: 50%;
  transform: translateY(-50%); 
}

.nav-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
  color: #dc3545;
}

.nav-button:hover {
  background-color: #f4f4f4;
}

.nav-user {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
}
.user-greeting {
  font-weight: 600;
  color: #555;
}

</style>
<style>
:root{
  /* palet kira-kira seperti background PLN */
  --pln-teal-1: #18B0C8;  /* terang */
  --pln-teal-2: #0E8FA9;  /* tengah */
  --pln-teal-3: #0A6E86;  /* gelap */
}

html, body, #app {
  min-height: 100%;
  /* linear gradient + radial glow di kiri-atas */
  background:
    radial-gradient(900px 500px at 25% 30%, rgba(255,255,255,.18), rgba(255,255,255,0) 60%),
    linear-gradient(135deg, var(--pln-teal-1) 0%, var(--pln-teal-2) 45%, var(--pln-teal-3) 100%);
  background-attachment: fixed;
}
</style>