import { Entity } from "../Entity";
import { FilterOperationAsString } from "./FilterOperationAsString";
import { FilterOperations } from "./FilterOperations";
import { SerializableFilter } from "./SerializableFilter";

export class Query<T, TKey> {
    private filters: SerializableFilter;
    private baseUri: string | null;
    constructor(baseUri: string | null) {
        this.filters = {
            o: [] as Array<FilterOperationAsString>
        } as SerializableFilter;
        this.baseUri = baseUri;
    }
    filter(predicate: (value: T) => boolean): Query<T, TKey> {
        console.log(predicate);
        let q: T = {} as T;
        
        this.filters.o.push({
            q: FilterOperations.Where,
            v: predicate.toString()
        } as FilterOperationAsString);
        return this;
    }

    execute(): Promise<Array<Entity<T, TKey>>> {
        return fetch(`${this.baseUri}/Query`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(this.filters),
            })
            .then(res => {
                const json = res.json();
                return json;
            })
            .catch((err) => {
                return {} as Array<Entity<T, TKey>>;
            })
            .then(res => {
                return res as Array<Entity<T, TKey>>;
            })
    }
}