<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of character (of all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input v-model="loveTakeNote" type="text" placeholder="Do you love noteball?" class="input" v-autofocus />
  </div>
</template>

<script setup>
/* Imports */
import { useStoreNotes } from "../stores/storeNotes.js";
import {vAutofocus} from '../directives/vAutofocus'
import {useWatchCharacters} from '../use/useWatchCharacters'
import { ref } from "vue";

/* Store */
const storeNotes = useStoreNotes();

/* Love TakeNote */
const loveTakeNote = ref('')
useWatchCharacters(loveTakeNote, 50)

</script>