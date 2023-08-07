import { Query } from "../Query";

export class FilterBuilder<T, TKey> {
    private parenthesisCount: number;
    private queryBuilder: Array<string>;
    private query: Query<T, TKey>;
    constructor(query: Query<T, TKey>) {
        this.parenthesisCount = 0;
        this.queryBuilder = new Array<string>();
        this.query = query;
    }
    select(predicate: (value: T) => any): FilterBuilder<T, TKey> {
        const splittedPredicate = predicate.toString().split('.');
        const variableName = splittedPredicate.slice(-(splittedPredicate.length - 1)).join('.');
        this.queryBuilder.push(variableName);
        return this;
    }
    operator(operation: Operators): FilterBuilder<T, TKey> {
        switch (operation) {
            case Operators.Equal:
                this.queryBuilder.push(" == ");
                break;
            case Operators.NotEqual:
                this.queryBuilder.push(" != ");
                break;
        }
        return this;
    }
    value(v: any | null): FilterBuilder<T, TKey> {
        if (v != null) {
            if (typeof v == 'number') {
                this.queryBuilder.push(v.toString());
            } else {
                this.queryBuilder.push(`"${v.toString()}"`);
            }
        }
        else
            this.queryBuilder.push("null");
        return this;
    }
    and(): FilterBuilder<T, TKey> {
        this.queryBuilder.push(" && ");
        return this;
    }
    or(): FilterBuilder<T, TKey> {
        this.queryBuilder.push(" || ");
        return this;
    }
    build(): Query<T, TKey> {
        return this.query.filter(this.queryBuilder.join(''));
    }
}

export enum Operators {
    Equal = 1,
    NotEqual = 2,
    GreaterThan = 3,
    GreaterThanOrEqual = 4,
    LesserThan = 5,
    LesserThanOrEqual = 6,
    Contains = 7,
    StartsWith = 8,
    EndsWith = 9
}