<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
    class="inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-150 ease-in-out"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <component v-if="icon && !loading && iconPosition === 'left'" :is="icon" :class="['h-5 w-5', label && iconPosition === 'left' ? 'mr-2' : '']" />
    <span v-if="label">{{ label }}</span>
    <component v-if="icon && !loading && iconPosition === 'right'" :is="icon" :class="['h-5 w-5', label && iconPosition === 'right' ? 'ml-2' : '']" />
    <slot v-if="!label"></slot> <!-- Allow content projection if no label -->
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button', // button, submit, reset
  },
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger, success, warning, info, outline, ghost, link
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false, // full width
  },
  icon: {
    type: [Object, Function, String], // Vue component or SVG string for inline icon
    default: null
  },
  iconPosition: {
    type: String,
    default: 'left', // left, right
  }
})

const emit = defineEmits(['click'])

const baseClasses = 'border border-transparent shadow-sm '
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-1.5 text-sm '
    case 'lg': return 'px-6 py-3 text-lg '
    case 'md':
    default: return 'px-4 py-2 text-base '
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:ring-gray-400 '
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400 '
    case 'success':
      return 'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-400 '
    case 'warning':
      return 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-400 '
    case 'info':
      return 'bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-400 '
    case 'outline':
      return 'bg-transparent text-teal-600 border-teal-500 hover:bg-teal-50 focus-visible:ring-teal-400 '
    case 'ghost':
      return 'bg-transparent text-teal-600 hover:bg-teal-50 focus-visible:ring-teal-400 '
    case 'link':
      return 'bg-transparent text-teal-600 hover:underline focus-visible:ring-teal-400 shadow-none border-none '
    case 'primary':
    default:
      return 'bg-teal-500 text-white hover:bg-teal-600 focus-visible:ring-teal-400 '
  }
})

const blockClasses = computed(() => props.block ? 'w-full ' : '')

const disabledClasses = computed(() => 
  props.disabled || props.loading ? 'opacity-50 cursor-not-allowed ' : ''
)

const buttonClasses = computed(() => {
  return baseClasses + sizeClasses.value + variantClasses.value + blockClasses.value + disabledClasses.value
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

</script>

<style scoped>
/* Scoped styles if needed, though UnoCSS/Tailwind handles most */
</style> 