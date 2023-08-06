import { IperUser } from "../Models/IperUser";
import { SuperUser } from "../Models/SuperUser";
import { RepositoryServices } from "../rystem/RepositoryServices";
import { State } from "../rystem/State";

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
    const x = Math.floor(Math.random() * (30000 - 0 + 1)) + 0;
    const id = `${x}_Key_4942b090-f6a0-45a4-a188-286807f6bb9c`;
    const iperUser = {
        id: id,
        name: "corazon",
        email: "calcutta@gmail.com",
        port: 324324,
        isAdmin: true,
        groupId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    } as IperUser;
    const response2: State<IperUser, string> = await repository.insert(id, iperUser);
    console.log(response2.isOk);
    const response: IperUser = await repository.get(id);
    console.log(response);
    console.log(response.id);
}