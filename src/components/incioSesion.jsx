import { useState } from "react";

const inicioSesion = () => {
    const [email, setEmail] = useState("");
    const [contrasenya, setContrasenya] = useState("");
    const [missatge, setMissatge] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const usuarisGuardats = JSON.parse(localStorage.getItem("dades_usuaris")) || [];

        const usuariTrobat = usuarisGuardats.find(
            (usuari) => usuari.email === email && usuari.contrasenya === contrasenya
        );

        if (usuariTrobat) {
            setMissatge("✅ Inici de sessió correcte!");
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

            {missatge && <p>{missatge}</p>}
        </div>
    );
};

export default inicioSesion;
