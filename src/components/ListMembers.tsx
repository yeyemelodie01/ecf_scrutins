import {useEffect, useState} from "react";
import {IonButton} from "@ionic/react";
import {useParams} from "react-router";
import './ListMembers.css'

const ListMembers: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const scrutinId = useParams<{ scrutinId: string }>().scrutinId;
    interface Member {
        id: number;
        first_name: string;
        last_name: string;
        birth_date: string;
        has_voted: number;
    }

    useEffect(() => {
        const loadMembers = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/scrutins/${scrutinId}/members`);
                if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                const dataMembers = await res.json();
                setMembers(dataMembers.data);
                console.log('Membres chargés:', dataMembers);
            } catch (err) {
                console.error('Erreur de chargement des membres :', err);
            }
        };
        loadMembers();
    }, []);


    return (
        <div>
            <h1>Liste des Membres</h1>
            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Date de naissance</th>
                        <th>Statut de vote</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>{member.first_name}</td>
                            <td>{member.last_name}</td>
                            <td>{new Date(member.birth_date).toLocaleDateString()}</td>
                            <td>
                                {member.has_voted ? (
                                    "A déjà voté"
                                ) : (
                                    <IonButton>Voter</IonButton>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default ListMembers;