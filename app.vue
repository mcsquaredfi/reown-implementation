<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { useConnectWallet } from '~/composables/useConnectWallet';
if (import.meta.client) useConnectWallet().initAppKit();

</script>