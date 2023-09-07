<script setup lang="ts">
import { theme } from '@/shared'

interface TProps {
    width?: string,
    height?: string,
    radius?: string,
    bg?: 'red' | 'yellow' | 'green',
    disabled?: boolean,
}

const props = withDefaults(defineProps<TProps>(), {
    width: 'auto',
    height: 'auto',
    radius: '100%',
    bg: 'green',
    disabled: false,
})

const emit = defineEmits(['click'])

function buttonClick(event: MouseEvent) {
    emit('click', event)
}

</script>

<template>
    <button :class="['action-button', bg]" @click="buttonClick" :disabled="disabled">
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

    &:disabled {
        opacity: 0.3;
        cursor: auto;
    }
}
</style>