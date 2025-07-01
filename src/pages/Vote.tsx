import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import ListMembers from "../components/ListMembers";

const Vote: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Vote</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Liste des Membres</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ListMembers />
            </IonContent>
        </IonPage>
    );
}

export default Vote;