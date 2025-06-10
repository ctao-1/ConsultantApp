<template>
  <div :class="cardClasses">
    <div v-if="hasHeaderSlot || title" :class="headerClasses">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-gray-700">{{ title }}</h3>
      </slot>
    </div>
    <div :class="bodyClasses">
      <slot></slot> <!-- Default slot for card content -->
    </div>
    <div v-if="hasFooterSlot" :class="footerClasses">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'default', // e.g., default, bordered, flat
  },
  padding: {
    type: String,
    default: 'md', // none, sm, md, lg
  },
  shadow: {
    type: String,
    default: 'md', // none, sm, md, lg, xl
  },
  rounded: {
    type: String,
    default: 'lg', // none, sm, md, lg, xl, full
  }
})

const slots = useSlots()

const hasHeaderSlot = computed(() => !!slots.header)
const hasFooterSlot = computed(() => !!slots.footer)

const baseCardClasses = 'bg-white overflow-hidden '

const shadowClasses = computed(() => {
  switch (props.shadow) {
    case 'none': return 'shadow-none '
    case 'sm': return 'shadow-sm '
    case 'lg': return 'shadow-lg '
    case 'xl': return 'shadow-xl '
    case 'md':
    default: return 'shadow-md '
  }
})

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'none': return 'rounded-none '
    case 'sm': return 'rounded-sm '
    case 'md': return 'rounded-md '
    case 'xl': return 'rounded-xl '
    case 'full': return 'rounded-full '
    case 'lg':
    default: return 'rounded-lg '
  }
})

const variantClasses = computed(() => {
  // Example: add border for 'bordered' variant
  if (props.variant === 'bordered') {
    return 'border border-gray-200 '
  }
  if (props.variant === 'flat') {
    return 'shadow-none border border-gray-200 '
  }
  return ''
})

const cardClasses = computed(() => {
  return baseCardClasses + shadowClasses.value + roundedClasses.value + variantClasses.value
})

const paddingClasses = computed(() => {
  switch (props.padding) {
    case 'none': return 'p-0'
    case 'sm': return 'p-3'
    case 'lg': return 'p-8'
    case 'md':
    default: return 'p-5'
  }
})

// Header, Body, Footer specific classes
const headerClasses = computed(() => {
  return `${paddingClasses.value} border-b border-gray-200` // Example styling
})

const bodyClasses = computed(() => {
  return paddingClasses.value
})

const footerClasses = computed(() => {
  return `${paddingClasses.value} border-t border-gray-200` // Example styling
})

</script>

<style scoped>
/* Add any specific scoped styles if necessary */
</style> 