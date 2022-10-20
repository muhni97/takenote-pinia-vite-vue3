<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      label="Edit Note"
      placeholder="Edit note"
    >
      <template #buttons>
        <button
        @click="$router.back()"
          class="button is-link is-light mr-2"
        >
          Cancel
        </button>
        <button
        @click="handleSaveClicked"
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
/* Imports */
import { ref } from "vue";
import {useRoute, useRouter} from 'vue-router'
import AddEditNote from "../components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes.js";

/* router */
const route = useRoute()
const router = useRouter()

/* Store */
const storenotes = useStoreNotes()

/* Note */
const noteContent = ref("");

noteContent.value = storenotes.getNoteContent(route.params.id)

/* Save */

const handleSaveClicked = () => {
  storenotes.updateNote(route.params.id, noteContent.value)
  router.push('/')
}

</script>