import { useQuery } from "@tanstack/react-query"
import { getSettings } from ".."
import { ISettings } from "../../types"

export const useSettings = () => {
    return useQuery<ISettings>({
        queryKey: ['settings'],
        queryFn: getSettings,
        enabled: false
    })
}