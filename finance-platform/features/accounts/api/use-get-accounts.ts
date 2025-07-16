import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await client.api.accounts.$get();
            if (!response.ok){
                throw new Error("Failed to fetch accounts");
            }
            const {data} = await response.json();
            // distructure the data to match the expected format
            return data;
        },
        staleTime: 60 * 1000, // 1 minute
    })

    return query;
};