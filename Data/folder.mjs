export default class Folder {
    #previousFolder = null;
    #list = new Map();
    name = "";

    constructor(name, previousFolder) {
        this.name = name;
        this.#previousFolder = previousFolder;
    }

    getPreviousFolder() {
        return this.#previousFolder;
    }
    setPreviousFolder(previousFolder) {
        this.#previousFolder = previousFolder;
    }
    insertItem(name, obj) {
        this.#list.set(name, obj);
    }
    deleteItem(name) {
        this.#list.delete(name);
    }
    get previousFolder() {
        return this.#previousFolder;
    }
    set previousFolder(previousFolder) {
        this.#previousFolder = previousFolder;
    }
    get names() {
        return this.#list.keys();
    }
    get list() {
        return this.#list.values();
    }
    get map() {
        return new Map(this.#list);
    }
    getItem(name) {
        return this.#list.get(name);
    }
    isEmpty() {
        return this.#list.size == 0;
    }
}
