<script setup lang="ts">
import { theme } from '@/shared'

interface TProps {
    width?: string,
    height?: string,
    radius?: string,
    bg?: 'red' | 'yellow' | 'green',
}

const props = withDefaults(defineProps<TProps>(), {
    width: 'auto',
    height: 'auto',
    radius: '100%',
    bg: 'green',
})

const emit = defineEmits(['click'])

function buttonClick(event: MouseEvent) {
    emit('click', event)
}

</script>

<template>
    <button :class="['action-button', bg]" @click="buttonClick">
        <slot />
    </button>
</template>


<style lang="scss">
.action-button {
    width: v-bind('props.width');
    height: v-bind('props.height');
    border-radius: v-bind('props.radius');
    border-style: solid;
    border-width: 5px;
    color: v-bind('theme.COLORS.white');
    font-size: 20px;

    &.green {
        border-color: v-bind('theme.COLORS.greenDark');
        background-color: v-bind('theme.COLORS.greenLight');
    }
}
</style>