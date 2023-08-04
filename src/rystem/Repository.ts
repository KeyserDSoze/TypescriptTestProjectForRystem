import { RepositorySettings } from "./RepositorySettings";

export interface IRepository<T, TKey> {
    get(key: TKey): Promise<T>;
}

export interface IEntity<T, TKey> {
    Value: T;
    Key: TKey;
}

export class Repository<T, TKey> implements IRepository<T, TKey>
{
    private baseUri: string | null;
    private settings: RepositorySettings;

    constructor(baseUri: string | null, settings: RepositorySettings) {
        if (settings.uri == null)
            this.baseUri = `${baseUri}${settings.path}`;
        else
            this.baseUri = settings.uri;
        this.settings = settings;
    }
    get(key: TKey): Promise<T> {
        return fetch(`${this.baseUri}/Get?key=${key}`)
            .then(res => {
                const json = res.json();
                return json;
            })
            .catch((err) => {
                return null;
            })
            .then(res => {
                return res as T
            })

    }
}
