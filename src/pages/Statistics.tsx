import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import StatsDisplay from "../components/StatsDisplay";

const Statistics: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Statistics</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Statistics</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <StatsDisplay />
            </IonContent>
        </IonPage>
    );
}

export default Statistics;