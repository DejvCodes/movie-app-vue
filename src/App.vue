<script setup lang="ts">
import ToastNotification from '@/components/ToastNotification.vue';
</script>

<template>
	<RouterView v-slot="{ Component }">
		<Transition
			name="page"
			mode="out-in"
		>
			<component :is="Component" />
		</Transition>
	</RouterView>
	<ToastNotification />
</template>
