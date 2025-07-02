import {useEffect, useState} from "react";
import {IonButton, IonText} from "@ionic/react";
import {useParams} from "react-router";
import './style/ListMembers.css'

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
            <table className="list-members-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Date de naissance</th>
                        <th>État de vote</th>
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
                                    <IonText color="success">A voté</IonText>
                                ) : (
                                    <IonButton onClick={async () => {
                                        try {
                                            const res = await fetch(`http://localhost:3000/api/v1/scrutins/${scrutinId}/members/${member.id}/vote`, {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({ has_voted: 1 })
                                            });
                                            if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
                                            const updatedData = await res.json();
                                            console.log('Membre mis à jour:', updatedData);
                                            setMembers((prevMembers) =>
                                                prevMembers.map((m) =>
                                                    m.id === member.id ? { ...m, has_voted: 1 } : m
                                                )
                                            );
                                        } catch (err) {
                                            console.error('Erreur de mise à jour du membre :', err);
                                        }
                                    }}>Voter</IonButton>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="back-btn">
                <IonButton routerLink="/home">
                    Retour
                </IonButton>
            </div>
        </div>
    )
}
export default ListMembers;