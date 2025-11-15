<template>
  <button
    class="ui-button"
    :class="{
      'ui-button--secondary': secondary,
      'ui-button--no-icon': !showIcon,
    }"
    type="button"
  >
    <span class="ui-button__label">
      <slot />
    </span>
    <IconsSend v-if="showIcon" class="ui-button__icon" aria-hidden="true" />
  </button>
</template>

<script setup>
defineProps({
  showIcon: {
    type: Boolean,
    default: true,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.ui-button {
  display: inline-flex;
  padding: 20px 45px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: none;
  border-radius: 150px;
  cursor: pointer;
  background: $text; // primary

  color: $white;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.02s ease;

  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)), $text;
  }

  &:active {
    transform: translateY(1px);
  }

  &__icon {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
  }

  &--no-icon {
    padding-left: 45px;
  }
}

.ui-button--secondary {
  background: $white;
  color: $text;

  &:hover {
    background-color: $background;
  }

  .ui-button__icon {
    // Ensure icon adopts text color in secondary state
    :deep(path) {
      fill: $text;
    }
  }
}

// Ensure primary icon is white
.ui-button:not(.ui-button--secondary) .ui-button__icon {
  :deep(path) {
    fill: $white;
  }
}
</style>
