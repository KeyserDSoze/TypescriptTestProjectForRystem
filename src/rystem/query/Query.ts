import { Entity } from "../Entity";
import { FilterBuilder } from "./filter/FilterBuilder";
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
    filterBuilder(): FilterBuilder<T, TKey> {
        return new FilterBuilder<T, TKey>(this);
    }
    filter(predicate: string): Query<T, TKey> {
        this.filters.o.push({
            q: FilterOperations.Where,
            v: predicate
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