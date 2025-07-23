import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccount = (id?:string) => {
    const query = useQuery({
        enabled: !!id, // only run the query if id is defined
        queryKey: ["account", {id}],
        queryFn: async () => {
            const response = await client.api.accounts[":id"].$get({
                param: {id},
            });
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