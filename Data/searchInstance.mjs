import Folder from "./folder";

export default class SearchInstance {
    #folder = null;
    #stopFlag = false;
    #name = null;
    #result = [];
    constructor(folder, name) {
        if (!folder instanceof Folder || !name instanceof String) {
            throw "invalid folder in search input";
        }

        this.#folder = folder;
        this.#name = name;
    }

    startSearch() {
        if (this.#folder && !this.#stopFlag) {
            this.#searchInFolder(this.#folder, this.#name);
        }
    }

    get results() {
        return new Array(this.#result);
    }
    async #searchInFolder(folder, toSearch) {
        if (!folder instanceof Folder) {
            throw "invalid folder in search input(Internal function Error)";
        }

        for (const [name, obj] of folder.map) {
            if (this.#stopFlag) {
                break;
            }
            if (name === toSearch) {
                this.#result.push([name, obj]);
            }

            if (obj instanceof folder) {
                this.#searchInFolder(obj, toSearch);
            }
        }
    }

    async stop() {
        this.#stopFlag = true;
    }
}
