const BASE_URL = "https://notes-api.dicoding.dev/v2";

function getAllNotes() {
    return fetch(`${BASE_URL}/notes`)
        .then((response) => response.json())
        .then((data) => data.data);
}

async function addNote({ title, body }) {
    // console.log("addNote dipanggil");
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
    };
    const response = await fetch(`${BASE_URL}/notes`, options);
    const responseJSON = await response.json();
    return responseJSON;
}

async function deleteNote(id) {
    return fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => data.data);
}

export { getAllNotes, addNote, deleteNote };
