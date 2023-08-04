import { IRepository, Repository } from "./Repository";
import { RepositorySettings } from "./RepositorySettings";

export class RepositoryServices {
    private static instance: RepositoryServices;
    private repositories: Map<string, any>;
    private baseUri: string | null;

    private constructor() {
        this.repositories = new Map<string, any>();
        this.baseUri = null;
    }

    public static Instance<T, TKey>(name: string): IRepository<T, TKey> {
        if (!RepositoryServices.instance) {
            RepositoryServices.instance = new RepositoryServices();
        }
        if (RepositoryServices.instance.repositories.has(name))
            return RepositoryServices.instance.repositories.get(name) as IRepository<T, TKey>;
        throw new Error(`Repository ${name} has a wrong setup.`);
    }

    public static Create<T, TKey>(baseUri: string | null): RepositoryServices {
        if (!RepositoryServices.instance) {
            RepositoryServices.instance = new RepositoryServices();
        }
        RepositoryServices.instance.baseUri = baseUri;
        return RepositoryServices.instance;
    }
    public AddRepository<T, TKey>(builder: (x: RepositorySettings) => void): this {
        const settings = new RepositorySettings();
        builder(settings);
        if (settings.name == null || settings.name == "")
            throw new Error("Repository needs a name during setup. Please provide in settings a name length greater than or equal to 1.");
        const repository = new Repository<T, TKey>(this.baseUri, settings);
        this.repositories.set(settings.name, repository);
        return this;
    }
}