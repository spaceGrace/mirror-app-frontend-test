import { useQuery } from "@tanstack/react-query"
import { getUsers } from ".."
import { IUser } from "../../types"

export const useUsers = () => {
    return useQuery<IUser[]>({
        queryKey: ['users'],
        queryFn: getUsers,
        enabled: false
    })
}