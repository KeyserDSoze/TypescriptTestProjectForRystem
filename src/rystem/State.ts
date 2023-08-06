export type State<T, TKey> = {
    isOk: boolean;
    entity: {
        key: TKey;
        value: T;
    },
    code: number | null,
    message: string | null
}