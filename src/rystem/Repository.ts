import { BatchBuilder } from "./batch/BatchBuilder";
import { IRepository } from "./IRepository";
import { Query } from "./query/Query";
import { RepositorySettings } from "./RepositorySettings";
import { State } from "./State";

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
        return fetch(`${this.baseUri}/Get?key=${key}`,
            {
                method: 'GET',
                headers: {
                }
            })
            .then(res => {
                const json = res.json();
                return json;
            })
            .catch((err) => {
                return null;
            })
            .then(res => {
                return res as T;
            })
    }
    insert(key: TKey, value: T): Promise<State<T, TKey>> {
        return fetch(`${this.baseUri}/Insert?key=${key}`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(value),
            })
            .then(res => {
                const json = res.json();
                return json;
            })
            .catch((err) => {
                return { isOk: false, message: err } as State<T, TKey>;
            })
            .then(res => {
                return res as State<T, TKey>;
            })
    }
    update(key: TKey, value: T): Promise<State<T, TKey>> {
        return fetch(`${this.baseUri}/Update?key=${key}`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(value),
            })
            .then(res => {
                const json = res.json();
                return json;
            })
            .catch((err) => {
                return { isOk: false, message: err } as State<T, TKey>;
            })
            .then(res => {
                return res as State<T, TKey>;
            })
    }
    exist(key: TKey): Promise<State<T, TKey>> {
        return fetch(`${this.baseUri}/Exist?key=${key}`,
            {
                method: 'GET',
                headers: {
                }
            })
            .then(res => {
                const json = res.json();
                return json;
            })
            .catch((err) => {
                return { isOk: false, message: err } as State<T, TKey>;
            })
            .then(res => {
                return res as State<T, TKey>;
            })
    }
    delete(key: TKey): Promise<State<T, TKey>> {
        return fetch(`${this.baseUri}/Delete?key=${key}`,
            {
                method: 'GET',
                headers: {
                }
            })
            .then(res => {
                const json = res.json();
                return json;
            })
            .catch((err) => {
                return { isOk: false, message: err } as State<T, TKey>;
            })
            .then(res => {
                return res as State<T, TKey>;
            })
    }
    batch(): BatchBuilder<T, TKey> {
        return new BatchBuilder<T, TKey>(this.baseUri);
    }
    query(): Query<T, TKey> {
        return new Query<T, TKey>(this.baseUri);
    }
}