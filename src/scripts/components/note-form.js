import formValidation from "../form-validation";

class NoteForm extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await this.render();
        formValidation(document.getElementById(this.getAttribute("form-id")));
    }

    async render() {
        this.innerHTML = ` <form
            id=${this.getAttribute("form-id")}
            class="card-body c-card form-input"
        >
            <form-control
                input-name="title"
                label="Judul"
                placeholder="mis : Catatan Rapat"
                min-length="3"
                description="Isi dengan judul catatan (min 3 karakter)"
            ></form-control>
            <div class="form-group">
                <label for="input-body" class="form-label">Catatan</label>
                <textarea id="input-body" class="form-control" name="body" placeholder="Tulis catatan di sini" rows="3" aria-describedby="input-body-description"></textarea>
                <p id="input-body-description" class="input-body-message form-text" data-defaultText="Tuliskan catatan di sini (min 3 karakter)">
                    Tuliskan catatan di sini (min 3 karakter)
                </p>
            </div>

            <button class="btn btn-primary" id="save-button">Simpan</button>
        </form>`;
    }
}

customElements.get("note-form") || customElements.define("note-form", NoteForm);
