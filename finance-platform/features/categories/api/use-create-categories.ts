import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/lib/hono";
import { toast } from "sonner";
import { id } from "zod/v4/locales";
// InferResponseType and InferRequestType are utility types to infer the types of request and response from the Hono client.
type ResponseType = InferResponseType<typeof client.api.categories.$post>
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]

export const useCreateCategories = () => {
  const queryClient = useQueryClient();

    // useMutation is a hook from React Query that allows you to perform mutations (like POST requests) and manage their state.
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
    console.log("------------------");
    // const data = {id: "eee", name:"test", user_id: "fff"};
    // return data;
    const response = await client.api.categories.$post({ json });
        // const a = await response.json();
        // console.log("Response from create account:", a);
        // // return a;
        // if (response.ok){
        //     const res = await response.json();
        //     console.log("Response from create account:", res);
        // }
      return await response.json();
},
    
    
    onSuccess: async () => {
        toast.success("Category created successfully");
        // every time its gonna re-fetch the categories data
        // This is useful to keep the UI in sync with the server state.
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: async (error) => {
        toast.error(`Failed to create categories: ${error.message}`);
        },
  });

  return mutation;

};