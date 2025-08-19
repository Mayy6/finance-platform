import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategory = (id?:string) => {
    const query = useQuery({
        enabled: !!id, // only run the query if id is defined
        queryKey: ["category", {id}], // category and object with id as a key
        queryFn: async () => {
            const response = await client.api.categories[":id"].$get({
                param: {id},
            });
            if (!response.ok){
                throw new Error("Failed to fetch categories");
            }
            const {data} = await response.json();
            // distructure the data to match the expected format
            return data;
        },
        staleTime: 60 * 1000, // 1 minute
    })

    return query;
};