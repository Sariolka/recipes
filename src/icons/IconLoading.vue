<script setup lang="ts"></script>

<template>
  <div class="lds-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.lds-spinner {
  display: inline-block;
  position: relative;
  width: 25px;
  height: 25px;
}

.lds-spinner,
.lds-spinner div,
.lds-spinner div:after {
  box-sizing: border-box;
}

.lds-spinner div {
  transform-origin: 12px 12px;
  animation: lds-spinner 0.8s linear infinite;
}

.lds-spinner div:after {
  content: ' ';
  display: block;
  position: absolute;
  top: 2px;
  left: 11px;
  width: 1.5px;
  height: 5.2px;
  border-radius: 30%;
  background: currentColor;
}

.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(45deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(90deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(135deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(180deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(225deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(270deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(315deg);
  animation-delay: 0s;
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
