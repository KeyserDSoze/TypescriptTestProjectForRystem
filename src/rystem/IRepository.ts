import { BatchBuilder } from "./batch/BatchBuilder";
import { QueryBuilder } from "./query/QueryBuilder";
import { State } from "./State";

export interface IRepository<T, TKey> {
    get(key: TKey): Promise<T>;
    insert(key: TKey, value: T): Promise<State<T, TKey>>;
    update(key: TKey, value: T): Promise<State<T, TKey>>;
    delete(key: TKey): Promise<State<T, TKey>>;
    exist(key: TKey): Promise<State<T, TKey>>;
    batch(): BatchBuilder<T, TKey>;
    query(): QueryBuilder<T, TKey>;
}
