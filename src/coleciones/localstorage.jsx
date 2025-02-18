if (!localStorage.getItem('dades_tiquets')) {
    localStorage.setItem('dades_tiquets', JSON.stringify([]));
}

if (!localStorage.getItem('dades_usuaris')) {
    localStorage.setItem('dades_usuaris', JSON.stringify([]));
}
