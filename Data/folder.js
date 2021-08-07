class Folder {
    #list = new Map();
    name = "";
    constructor(name) {
        this.name = name;
    }

    insertItem(name, obj) {
        this.#list.set(name, obj);
    }
    deleteItem(name) {
        this.#list.delete(name);
    }
    get list() {
        return this.#list.keys();
    }
    getItem(name) {
        return this.#list.get(name);
    }
}
