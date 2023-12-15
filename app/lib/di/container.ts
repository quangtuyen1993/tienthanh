import "reflect-metadata";
import { Container } from "inversify";
import ClientServer from '@/lib/common/api_client'

enum TYPES {
    API_CLIENT = "API_CLIENT"
}
const container = new Container();

container.bind<ClientServer>(TYPES.API_CLIENT).toConstantValue(new ClientServer());

const ApiClient = container.get<ClientServer>(TYPES.API_CLIENT)

export {
    ApiClient,
};