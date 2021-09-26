export default class Folder {
    /* 
        fields: 
            -> previousFolder(private): refers to the previous Folder
            -> list(private): refers to the internal data structure for simulating
                            the items inside the folder.
            -> name: the name of the folder which is of the type string
    */
    #previousFolder = null;
    #list = new Map();
    name = "";

    // constructor have name as an arg and previous Folder
    // as an optional arg
    constructor(name, previousFolder = null) {
        this.name = name;
        this.#previousFolder = previousFolder;
    }

    // functions for adding and removing items from the folder
    insertItem(name, obj) {
        this.#list.set(name, obj);
    }
    deleteItem(name) {
        this.#list.delete(name);
    }

    // getters and setters for the class
    get previousFolder() {
        return this.#previousFolder;
    }
    set previousFolder(previousFolder) {
        this.#previousFolder = previousFolder;
    }
    get nameList() {
        return this.#list.keys();
    }
    get list() {
        return this.#list.values();
    }
    get map() {
        return new Map(this.#list);
    }

    // function to get value with the help of the key
    getItem(name) {
        return this.#list.get(name);
    }

    // function to check if the map is empty
    isEmpty() {
        return this.#list.size == 0;
    }
}
