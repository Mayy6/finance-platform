import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await client.api.categories.$get();
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

