import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import { IClient,Clients } from "../../pages/datatable";


const useClient = () => {
    const { user, token } = useAuth();
    const queryClient = useQueryClient();

    async function deleteClient(id: string) :Promise<Clients> {

        console.log(id + 'from fetch api')
        const response = await axios.delete('api/clients/delete', {
            data: {
                id: id
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data.clients
    }

    return useMutation((id: string) => deleteClient(id), {
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ['getClient'] });
        },
        onError:(error)=>{
            console.log(error)
        }
    })
}

export default useClient