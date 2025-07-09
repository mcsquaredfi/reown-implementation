export function useAppKitClientOnly() {
  if (import.meta.server) {
    return {}; // Avoid errors during SSR
  }

  const { $appKit } = useNuxtApp();

  if (!$appKit) {
    throw new Error('appKit is not available on the client side.');
  }

  return $appKit;
}
