import { QueryBuilder } from "./query/QueryBuilder";
import { State } from "./State";

export interface IQuery<T, TKey> {
    get(key: TKey): Promise<T>;
    exist(key: TKey): Promise<State<T, TKey>>;
    query(): QueryBuilder<T, TKey>;
}
