import { GetRequest } from "../apiUtills/Requests";
import { clients } from "./ClientsMockData";

const reqFetchAllClients = () => new GetRequest('/app-location', {
    mock: clients,});
export const apiFetcAllClients = async () => reqFetchAllClients();

export const apiFetchCurrentClient = async (email, password) => {
    const allClients = (await apiFetcAllClients()).mock;
    const client = allClients.find(client => client.email === email && client.password === password);
    if (!client) {
        throw new Error('Client not found');
    }
    else{
        return client;
    }
}