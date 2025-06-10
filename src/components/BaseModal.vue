<template>
  <transition name="modal-fade">
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
      @click.self="closeModal(true)" <!-- Allow closing by clicking backdrop if dismissable -->
    >
      <div 
        :class="['bg-white rounded-lg shadow-xl transform transition-all w-full', modalSizeClass]"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'modal-title' : null"
      >
        <!-- Header -->
        <div v-if="hasHeaderSlot || title" class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <slot name="header">
            <h3 v-if="title" id="modal-title" class="text-xl font-semibold text-gray-800">{{ title }}</h3>
          </slot>
          <button 
            v-if="showCloseButton"
            @click="closeModal(false)" 
            class="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5">
          <slot></slot> <!-- Default slot for modal content -->
        </div>

        <!-- Footer -->
        <div v-if="hasFooterSlot" class="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end space-x-3">
          <slot name="footer">
            <!-- Default footer buttons can be added here or expect user to provide -->
            <!-- Example: 
            <BaseButton label="Cancel" variant="outline" @click="closeModal(false)" />
            <BaseButton label="Confirm" variant="primary" @click="confirmModal" />
            -->
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, useSlots, watch, onMounted, onUnmounted } from 'vue'
// import BaseButton from './BaseButton.vue'; // Uncomment if using BaseButton for default footer

const props = defineProps({
  modelValue: { // Used for v-model binding
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg, xl, full
  },
  dismissableBackdrop: {
    type: Boolean,
    default: true, // Whether clicking on the backdrop closes the modal
  },
  showCloseButton: {
    type: Boolean,
    default: true, // Show the 'X' close button in the header
  },
  persistent: {
      type: Boolean, // If true, Esc key and backdrop click won't close modal
      default: false,
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'confirm'])
const slots = useSlots()

const hasHeaderSlot = computed(() => !!slots.header)
const hasFooterSlot = computed(() => !!slots.footer)

const closeModal = (isBackdropClick = false) => {
  if (props.persistent && isBackdropClick) return; // Prevent closing if persistent and backdrop click
  if (!props.persistent || !isBackdropClick) { // Allow programmatic close even if persistent
      emit('update:modelValue', false)
      emit('close')
  }
}

// const confirmModal = () => {
//   emit('confirm')
//   // closeModal() // Optionally close after confirm, or let parent component decide
// }

const modalSizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-sm'
    case 'lg': return 'max-w-lg'
    case 'xl': return 'max-w-xl'
    case '2xl': return 'max-w-2xl'
    case 'full': return 'max-w-full mx-4'
    case 'md':
    default: return 'max-w-md'
  }
})

// Handle Escape key press
const handleEsc = (event) => {
  if (event.key === 'Escape' && props.modelValue && !props.persistent) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
})

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = ''
  }
}, { immediate: true })

// Clean up body style on unmount in case component is destroyed while modal is open
onUnmounted(() => {
    if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = ''
    }
})

</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .transform,
.modal-fade-leave-active .transform {
  transition: transform 0.3s ease-out;
}
.modal-fade-enter-from .transform {
  transform: scale(0.95) translateY(-20px);
}
.modal-fade-leave-to .transform {
  transform: scale(0.95) translateY(-20px);
}
</style> 