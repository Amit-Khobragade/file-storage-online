import Folder from "./folder.mjs";

export default class SearchInstance {
    #folder = null;
    #stopFlag = false;
    #name = null;
    #result = [];
    #funcObj = null;
    constructor(folder, name, funcObj) {
        if (!folder instanceof Folder || !name instanceof String) {
            throw "invalid folder in search input";
        }

        this.#folder = folder;
        this.#name = name;
        this.#funcObj = funcObj;
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
            if (name.includes(toSearch)) {
                this.#result.push([name, obj]);
                if (this.#funcObj != null) {
                    this.#funcObj(obj);
                }
            }

            if (obj instanceof Folder) {
                this.#searchInFolder(obj, toSearch);
            }
        }
    }

    async stop() {
        this.#stopFlag = true;
    }
}
