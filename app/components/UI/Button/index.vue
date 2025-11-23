<template>
  <button
    class="ui-button"
    :class="{
      'ui-button--secondary': secondary,
      'ui-button--no-icon': iconPosition === 'none' || !showIcon,
      'ui-button--small': small,
    }"
    type="button"
  >
    <span v-if="showIcon && iconPosition === 'left'" class="ui-button__icon">
      <slot name="icon">
        <IconsSend aria-hidden="true" />
      </slot>
    </span>
    <span class="ui-button__label">
      <slot />
    </span>
    <span v-if="showIcon && iconPosition === 'right'" class="ui-button__icon">
      <slot name="icon">
        <IconsSend aria-hidden="true" />
      </slot>
    </span>
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
  small: {
    type: Boolean,
    default: false,
  },
  iconPosition: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right', 'none'].includes(value),
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

  @media (max-width: $mobileBreakpoint) {
    padding: 17px 40px;
    width: 100%;
  }

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
    @media (max-width: $mobileBreakpoint) {
      width: 21px;
      height: 21px;
      flex: 0 0 21px;
    }
  }

  &--no-icon {
    padding-left: 45px;
  }
}

.ui-button--small {
  padding: 15px 25px;
  border-radius: 150px;
  color: $white;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: $mobileBreakpoint) {
    padding: 11px 25px;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .ui-button__icon {
    width: 17px !important;
    height: 17px !important;
    flex: 0 0 17px !important;

    @media (max-width: $mobileBreakpoint) {
      width: 13px !important;
      height: 13px !important;
      flex: 0 0 13px !important;
    }
  }
}

.ui-button--small.ui-button--no-icon {
  padding-left: 25px;
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
