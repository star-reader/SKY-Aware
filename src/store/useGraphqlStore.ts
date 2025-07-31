import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { create } from 'zustand'

const initState: {
    client: ApolloClient<NormalizedCacheObject> | null
} = {
    client: null,
}

const useGraphqlStore = create(set => ({
    ...initState,

    setClient: (client: ApolloClient<NormalizedCacheObject>) => set({ client }),

}))
  
export default useGraphqlStore