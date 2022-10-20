<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{dateFormatted}}</small>
          <small class="column has-text-right">{{ charecterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        @click.prevent="modals.deleteNote = true"
        class="card-footer-item"
        href="#"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id" />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import {useDateFormat} from '@vueuse/core'
import ModalDeleteNote from "../Notes/ModalDeleteNote.vue";
import { useStoreNotes } from "../../stores/storeNotes.js";

/* Props */
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/* Store */
const storeNotes = useStoreNotes();

/* Date Format */
const dateFormatted = computed( () => {
  let date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'DD/MM/YYYY - HH:mm')
})

/* Character Length */
const charecterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";
  return `${length} ${description}`;
});


/* Modals */
const modals = reactive({
  deleteNote: false,
});
</script>