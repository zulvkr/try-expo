import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

export default function QueryClientProvider(props: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {props.children}
    </ReactQueryClientProvider>
  )
}
