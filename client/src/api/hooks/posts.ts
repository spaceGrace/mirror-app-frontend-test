import { useQuery } from "@tanstack/react-query"
import { getPosts } from ".."
import { IPost } from "../../types"

export const usePosts = () => {
    return useQuery<IPost[]>({
        queryKey: ['posts'],
        queryFn: getPosts,
        enabled: false
    })
}