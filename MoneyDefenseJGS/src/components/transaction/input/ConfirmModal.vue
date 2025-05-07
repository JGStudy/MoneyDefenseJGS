<!-- src/components/common/ConfirmModal.vue -->
<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div class="bg-white dark:bg-kb-dark-line p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h2 class="text-title02 font-bold text-center mb-4">{{ title }}</h2>
            <p class="text-body01 text-center text-kb-ui-05 dark:text-kb-dark-subtext mb-6">{{ message }}</p>
            <div class="flex justify-center gap-4">
                <button @click="$emit('cancel')"
                    class="w-full py-2 rounded-xl border border-kb-ui-07 text-kb-ui-02 dark:text-kb-dark-text">
                    아니오
                </button>
                <button @click="$emit('confirm')"
                    class="w-full py-2 rounded-xl bg-kb-yellow-positive text-black font-semibold">
                    네
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    visible: Boolean,
    title: String,
    message: String,
})
defineEmits(['confirm', 'cancel'])
</script>