import { IperUser } from "../Models/IperUser";
import { SuperUser } from "../Models/SuperUser";
import { RepositoryServices } from "../rystem/RepositoryServices";

export async function Runner() {
    RepositoryServices
        .Create("https://localhost:7058/api/")
        .AddRepository<IperUser, string>(x => {
            x.name = "test";
            x.path = "SuperUser";
        })
        .AddRepository<SuperUser, string>(x => {
            x.name = "test2"
            x.path = "SuperUser/inmemory";
        });
    const repository = RepositoryServices
        .Instance<IperUser, string>("test");
    const response: IperUser = await repository.get("Key_4942b090-f6a0-45a4-a188-286807f6bb9c");
    console.log(response);
    console.log(response.id);
}