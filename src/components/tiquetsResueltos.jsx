import { useState, useEffect } from "react";

const TiquetsResolts = () => {
    const [tiquets, setTiquets] = useState([]);

    useEffect(() => {
        const dadesGuardades = JSON.parse(localStorage.getItem("dades_tiquets")) || [];
        const resolts = dadesGuardades.filter(tiquet => tiquet.resolt);
        setTiquets(resolts);
    }, []);

    return (
        <div>
            <h2>Tiquets Resolts</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripció</th>
                        <th>Prioritat</th>
                    </tr>
                </thead>
                <tbody>
                    {tiquets.map((tiquet) => (
                        <tr key={tiquet.id}>
                            <td>{tiquet.id}</td>
                            <td>{tiquet.descripcio}</td>
                            <td>{tiquet.prioritat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TiquetsResolts;
