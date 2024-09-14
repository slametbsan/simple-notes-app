class NoteItem extends HTMLElement {
    static observedAttributes = ["id", "title", "body", "created_at", "archived", "index"];

    constructor() {
        super();

        this._id = this.getAttribute("id");
        this._title = this.getAttribute("title");
        this._body = this.getAttribute("body");
        this["_created_at"] = this.getAttribute("created_at");
        this._index = parseInt(this.getAttribute("index"));
    }

    handleDelete() {
        this.dispatchEvent(
            new CustomEvent("note-delete", {
                detail: {
                    id: this._id,
                },
                bubbles: true,
            })
        );
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="card">
                <div>
                    <p class="text-title">${this._title}</p>
                    <p class="text-body">${this._body}</p>
                    <p class="text-small">
                        Dibuat :
                        ${new Date(this["_created_at"]).toLocaleDateString("id-ID", {
                            dateStyle: "full",
                        })}
                    </p>
                </div>
                <delete-button data-id=${this._id}></delete-button>
            </div>
        `;
        const deleteButton = this.querySelector("delete-button");

        if (deleteButton) {
            deleteButton.addEventListener("click", this.handleDelete);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[`_${name}`] = newValue;
        this.render();
    }
}

customElements.get("note-item") || customElements.define("note-item", NoteItem);
