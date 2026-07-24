import { QueryClient } from '@tanstack/react-query';

// Singleton query client for use in mutation options and other non-component code.
// In TanStack Start, the primary queryClient lives in the router context,
// but mutations defined outside components need a reference too.
//
// The router must create a fresh QueryClient on every createRouter() call
// (see router.tsx) since that runs once per SSR request on the server — reusing
// a client across requests leaks query-cache subscriptions from finished
// requests and crashes later renders. setQueryClient() keeps this reference
// in sync with whichever client the router is currently using.
let queryClient: QueryClient | undefined;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      }
    }
  });
}

export function getQueryClient() {
  if (!queryClient) {
    queryClient = createQueryClient();
  }
  return queryClient;
}

export function setQueryClient(client: QueryClient) {
  queryClient = client;
}
