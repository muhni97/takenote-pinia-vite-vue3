<template>
  <div class="card p-4 mb-5" :class="`has-background-${props.bgColor}-dark`">
    <label class="label has-text-white" v-if="label">{{ label }}</label>

    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          maxlength="100"
          v-autofocus
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
/* Imports */
import { ref } from "vue";
import {vAutofocus} from '../../directives/vAutofocus.js'

/* Props */
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "success",
  },
  placeholder: {
    type: String,
    default: "Type something...",
  },
  label: {
    type: String,
  },
});

/* Emits */
const emit = defineEmits(["update:modelValue"]);

const textareaRef = ref(null);

/* Focus */
const focusTextarea = () => {
  textareaRef.value.focus();
};

defineExpose({
  focusTextarea,
});



</script>