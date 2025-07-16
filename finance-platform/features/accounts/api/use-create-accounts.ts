import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/lib/hono";
import { toast } from "sonner";
import { id } from "zod/v4/locales";
// InferResponseType and InferRequestType are utility types to infer the types of request and response from the Hono client.
type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateAccounts = () => {
  const queryClient = useQueryClient();

    // useMutation is a hook from React Query that allows you to perform mutations (like POST requests) and manage their state.
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
    console.log("------------------");
    // const data = {id: "eee", name:"test", user_id: "fff"};
    // return data;
    const response = await client.api.accounts.$post({ json });
        // const a = await response.json();
        // console.log("Response from create account:", a);
        // return a;
        if (response.ok){
            const res = await response.json();
            console.log("Response from create account:", res);
        }
      return await response.json();
},
    
    
    onSuccess: async () => {
        toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },

    onError: async (error) => {
        toast.error(`Failed to create account: ${error.message}`);
        },
  });

  return mutation;

};