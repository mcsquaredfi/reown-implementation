// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@wagmi/vue/nuxt"],
  runtimeConfig: {
    public: {
      projectId: "cfa4eb2b3ecc4d91b3a43cfd19c91fda",
    },
  },
  vueQuery: {
    // useState key used by nuxt for the vue query state.
    // If you only want to import some functions, specify them here.
    // You can pass false or an empty array to disable this feature.
    // default: ["useQuery", "useQueries", "useInfiniteQuery", "useMutation", "useIsFetching", "useIsMutating", "useQueryClient"]
    autoImports: ["useQuery"],
    // Pass the vue query client options here ...
    queryClientOptions: {
      defaultOptions: {
        queries: {
          refetchOnMount: "always",
          gcTime: 24 * (60 * (60 * 1000)), // hours, (minutes * (seconds * milliseconds)) = hours
          staleTime: 24 * (60 * (60 * 1000)), // hours, (minutes * (seconds * milliseconds)) = hours
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
          retry: 3,
        },
      }, // default
    },
    // Pass the vue query plugin options here ....
    vueQueryPluginOptions: {},
  },
  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      autoSubfolderIndex: false,
    },
    esbuild: {
      options: {
        target: "es2020",
        logLevel: "info",
        logLimit: 0,
        treeShaking: true,
        legalComments: "none",
      },
    },
    routeRules: {
      "/": {
        headers: {
          "Permissions-Policy":
            'clipboard-write=(self "https://staging-app.mc2.fi")',
        },
      },
    },
  },
});