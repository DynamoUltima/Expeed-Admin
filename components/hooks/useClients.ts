import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { CredentialInputs } from "../../pages/addClients";

import { IClient,Clients } from "../../pages/datatable";


const useDeleteClient = () => {
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

export default useDeleteClient;


export const useRegisterClient=()=>{
    const { user, token } = useAuth();
    const queryClient = useQueryClient();

    const registerClient =async(data:CredentialInputs)=>{
        

        const res = await fetch('api/clients/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
          })
          const results= res.json
          return results;

    }

    return useMutation((data:CredentialInputs) => registerClient(data), {
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ['getClient'] });
        },
        onError:(error)=>{
            console.log(error)
        }
    })



}