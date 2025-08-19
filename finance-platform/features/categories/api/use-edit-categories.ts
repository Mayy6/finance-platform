import { InferRequestType, InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/lib/hono";
import { toast } from "sonner";
// InferResponseType and InferRequestType are utility types to infer the types of request and response from the Hono client.
type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]

export const useEditCategories = (id?:string) => {
  const queryClient = useQueryClient();

    // useMutation is a hook from React Query that allows you to perform mutations (like POST requests) and manage their state.
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
    // const data = {id: "eee", name:"test", user_id: "fff"};
    // return data;
    const response = await client.api.categories[":id"]["$patch"]({param: {id}, json },);
        // const a = await response.json();
        // console.log("Response from create account:", a);
        // // return a;
        // if (response.ok){
        //     const res = await response.json();
        //     console.log("Response from create account:", res);
        if (!response.ok) {
            throw new Error("hahahhah");
        }
        
        else {
          console.log("Response from edit categories:", response);
        }


        
        // }
      return await response.json();
},
    
    
    onSuccess: async () => {
        toast.success("Category updated successfully");
        // every time its gonna re-fetch the categories data
        // This is useful to keep the UI in sync with the server state.
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: async (error) => {
        toast.error(`Failed to edit categories: ${error.message}`);
        },
  });

  return mutation;

};