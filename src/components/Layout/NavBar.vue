<template>
  <div>
    <nav
      class="navbar is-success"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
          <div class="navbar-item is-size-4 is-family-monospace">TakeNote</div>

          <a
            role="button"
            @click.prevent="showMobileNav = !showMobileNav"
            :class="{ 'is-active': showMobileNav }"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            ref="navbarBurgerRef"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          class="navbar-menu"
          :class="{ 'is-active': showMobileNav }"
          ref="navbarMenuRef"
        >
        <div class="navbar-start">
          <button 
          v-if="storeAuth.user.id"
          @click="logout"
          class="button is-small is-info mt-3 ml-3">
            Log out {{storeAuth.user.email}}
          </button>
        </div>
          <div class="navbar-end">
            <RouterLink
              @click="showMobileNav = false"
              to="/"
              class="navbar-item"
              active-class="is-active"
            >
              Notes
            </RouterLink>
            <RouterLink
              @click="showMobileNav = false"
              to="/stats"
              class="navbar-item"
              active-class="is-active"
            >
              Stats
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
/* Imports */
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import {useStoreAuth} from '@/stores/storeAuth.js'

/* Store */
const storeAuth = useStoreAuth()

/* Mobile Nav */
const showMobileNav = ref(false);

/* Click outside to close */
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(navbarMenuRef, (event) => {
  showMobileNav.value = false;
}, {
  ignore : [navbarBurgerRef]
});

/* Logout */
const logout = () => {
  showMobileNav.value = false
  storeAuth.logoutUser()
}

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>