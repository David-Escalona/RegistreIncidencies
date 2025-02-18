import { useState } from "react";

const inicioSesion = () => {
    const [email, setEmail] = useState("");
    const [contrasenya, setContrasenya] = useState("");
    const [missatge, setMissatge] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Obtenir usuaris guardats a localStorage
        const usuarisGuardats = JSON.parse(localStorage.getItem("dades_usuaris")) || [];

        // Buscar un usuari que coincideixi amb l'email i contrasenya
        const usuariTrobat = usuarisGuardats.find(
            (usuari) => usuari.email === email && usuari.contrasenya === contrasenya
        );

        if (usuariTrobat) {
            setMissatge("✅ Inici de sessió correcte!");
            // Aquí podries redirigir a una altra pàgina o guardar l'estat de sessió
        } else {
            setMissatge("❌ Credencials incorrectes. Torna-ho a intentar.");
        }
    };

    return (
        <div>
            <h2>Inici de Sessió</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contrasenya:</label>
                    <input
                        type="password"
                        value={contrasenya}
                        onChange={(e) => setContrasenya(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sessió</button>
            </form>

            {/* Mostra el missatge si existeix */}
            {missatge && <p>{missatge}</p>}
        </div>
    );
};

export default inicioSesion;
