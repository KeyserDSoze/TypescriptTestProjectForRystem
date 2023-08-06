import { State } from "../State";

export type BatchResult<T, TKey> = {
    c: 1 | 2 | 4;
    k: TKey;
    s: State<T, TKey>;
};
