import "./components/index.js";
import formValidation from "./form-validation.js";
import Swal, * as Sweetalert2 from "sweetalert2";
import "../styles/style.css";
import { addNote, getAllNotes, deleteNote } from "./data/api.js";

const RENDER_EVENT = "RENDER_EVENT";

const formInput = document.getElementById("add-form");

formInput.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.body.appendChild(document.createElement("loading-overlay"));
    const title = formInput.elements.title.value;
    const body = formInput.elements.body.value;

    const newNote = {
        title,
        body,
    };

    try {
        await addNote(newNote);
        Sweetalert2.fire({
            title: "Catatan berhasil ditambahkan",
            icon: "success",
            confirmButtonText: "OK",
        });
    } finally {
        setTimeout(() => {
            document.querySelector("loading-overlay").remove();
            formInput.reset();
        }, 500);
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
});

function deleteNoteHandler(noteId) {
    Sweetalert2.fire({
        title: "Anda Yakin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        cancelButtonColor: "red",
        confirmButtonColor: "blue",
    }).then(async (result) => {
        if (result.isConfirmed) {
            document.body.appendChild(document.createElement("loading-overlay"));

            await deleteNote(noteId);
            setTimeout(() => {
                document.querySelector("loading-overlay").remove();
                formInput.reset();
            }, 500);

            Sweetalert2.fire({
                title: "Catatan berhasil dihapus",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
                position: "top-start",
            });

            document.dispatchEvent(new Event(RENDER_EVENT));
        }
    });
}

function createNoteElement(noteItem, index) {
    const noteElement = document.createElement("note-item");
    noteElement.setAttribute("id", noteItem.id);
    noteElement.setAttribute("title", noteItem.title);
    noteElement.setAttribute("body", noteItem.body);
    noteElement.setAttribute("created_at", noteItem.createdAt);
    noteElement.setAttribute("archived", noteItem.archived);
    noteElement.setAttribute("index", index);
    noteElement.addEventListener("note-delete", (event) => {
        deleteNoteHandler(noteItem.id);
    });
    return noteElement;
}

document.addEventListener(RENDER_EVENT, async function () {
    const noteList = document.getElementById("note-lists");
    const loadingIndicator = document.createElement("loading-indicator");

    noteList.innerHTML = "";
    noteList.parentElement.insertBefore(loadingIndicator, noteList);
    try {
        const notes = await getAllNotes();
        let index = 1;
        for (const noteItem of notes) {
            noteList.append(createNoteElement(noteItem, index));
            index++;
        }
    } finally {
        setTimeout(() => {
            loadingIndicator.setAttribute("display", "none");
        }, 500);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    document.dispatchEvent(new Event(RENDER_EVENT));
});
