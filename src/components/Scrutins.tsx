import {useEffect, useState} from "react";
import './Scrutins.css'

const Scrutins: React.FC = () => {
    const [scrutins, setScrutins] = useState<Scrutin[]>([]);

    interface Scrutin {
        id: number;
        title: string;
        starts_at: string;
        ends_at: string;
    }

    useEffect(() => {
        const loadScrutins = async () => {
            try{
                const res = await fetch('http://localhost:3000/api/v1/scrutins');
                if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                const dataScrutins = await res.json();
                setScrutins(dataScrutins.data);
                console.log('Scrutins chargés:', dataScrutins);
            } catch (err) {
                console.error('Erreur de chargement des scrutins :', err);
            }
        };
        loadScrutins();

    }, []);

  return (
    <div>
      <h1>Scrutins</h1>

        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                </tr>
            </thead>
            <tbody>
                {scrutins.map((scrutin) => (
                    <tr onClick={() => {
                        // Redirection vers la page de scrutin
                        window.location.href = `${scrutin.id}/members/`;
                    } } key={scrutin.id}>
                        <td>{scrutin.title}</td>
                        <td>{new Date(scrutin.starts_at).toLocaleString()}</td>
                        <td>{new Date(scrutin.ends_at).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Scrutins;
