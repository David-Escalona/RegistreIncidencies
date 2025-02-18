import { useState } from "react";

const Registre = () => {
    const [email, setEmail] = useState("");
    const [contrasenya, setContrasenya] = useState("");
    const [missatge, setMissatge] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Obtenir usuaris actuals de localStorage
        const usuarisGuardats = JSON.parse(localStorage.getItem("dades_usuaris")) || [];

        // Comprovar si l'usuari ja existeix
        const usuariExisteix = usuarisGuardats.some((usuari) => usuari.email === email);

        if (usuariExisteix) {
            setMissatge("⚠️ Aquest email ja està registrat.");
            return;
        }

        // Crear un nou usuari
        const nouUsuari = { email, contrasenya };

        // Afegir el nou usuari a la llista
        const usuarisActualitzats = [...usuarisGuardats, nouUsuari];

        // Guardar la llista actualitzada a localStorage
        localStorage.setItem("dades_usuaris", JSON.stringify(usuarisActualitzats));

        // Netejar els camps després de registrar
        setEmail("");
        setContrasenya("");
        setMissatge("✅ Usuari registrat correctament!");
    };

    return (
        <div>
            <h2>Registre</h2>
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
                <button type="submit">Registrar</button>
            </form>

            {/* Mostra el missatge si existeix */}
            {missatge && <p>{missatge}</p>}
        </div>
    );
};

export default Registre;
