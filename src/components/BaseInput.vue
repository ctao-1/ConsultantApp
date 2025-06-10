<template>
  <div :class="['mb-4', wrapperClass]">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <div class="relative rounded-md shadow-sm">
      <div v-if="hasLeadingIconSlot" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="leadingIcon"></slot>
      </div>
      <input 
        :type="type" 
        :id="inputId" 
        :value="modelValue" 
        @input="onInput"
        :placeholder="placeholder" 
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        :aria-invalid="error ? true : null"
        :aria-describedby="error ? errorId : (helpText ? helpTextId : null)"
      />
      <div v-if="hasTrailingIconSlot" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="trailingIcon"></slot>
      </div>
    </div>
    <p v-if="error" :id="errorId" class="mt-1 text-xs text-red-600">{{ error }}</p>
    <p v-else-if="helpText" :id="helpTextId" class="mt-1 text-xs text-gray-500">{{ helpText }}</p>
  </div>
</template>

<script setup>
import { computed, useSlots, getCurrentInstance } from 'vue'

const props = defineProps({
  modelValue: { // For v-model
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text' // text, password, email, number, tel, url, date, etc.
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: '' // Error message to display
  },
  helpText: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  variant: {
    type: String,
    default: 'default' // default, ghost
  },
  wrapperClass: {
      type: String,
      default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const instance = getCurrentInstance()

// Generate unique IDs for ARIA attributes
const uid = instance?.uid || Math.random().toString(36).substring(2, 9);
const inputId = computed(() => `base-input-${uid}`)
const errorId = computed(() => `base-input-error-${uid}`)
const helpTextId = computed(() => `base-input-help-${uid}`)

const hasLeadingIconSlot = computed(() => !!slots.leadingIcon)
const hasTrailingIconSlot = computed(() => !!slots.trailingIcon)

const baseInputClasses = 'block w-full focus:outline-none sm:text-sm rounded-md '
const paddingClasses = computed(() => {
    let pl = hasLeadingIconSlot.value ? 'pl-10' : 'px-3';
    let pr = hasTrailingIconSlot.value ? 'pr-10' : 'px-3';
    return `${pl} ${pr} py-2 `;
});

const stateClasses = computed(() => {
  if (props.error) {
    return 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 '
  }
  if (props.disabled) {
      return 'bg-gray-100 border-gray-300 cursor-not-allowed '
  }
  return 'border-gray-300 focus:ring-teal-500 focus:border-teal-500 '
})

const variantSpecificClasses = computed(() => {
    if (props.variant === 'ghost') {
        return 'border-transparent focus:border-gray-300 bg-gray-50 focus:bg-white '
    }
    return 'border '; // default has border
})

const inputClasses = computed(() => {
  return baseInputClasses + paddingClasses.value + stateClasses.value + variantSpecificClasses.value
})

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

</script>

<style scoped>
/* You can add specific styles here if needed */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style> 