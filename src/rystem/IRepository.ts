import { State } from "./State";

export interface IRepository<T, TKey> {
    get(key: TKey): Promise<T>;
    insert(key: TKey, value: T): Promise<State<T, TKey>>;
    update(key: TKey, value: T): Promise<State<T, TKey>>;
}
