export class RepositorySettings {
    name: string;
    uri: string | null;
    path: string | null;

    constructor() {
        this.name = "";
        this.uri = null;
        this.path = null;
    }
}