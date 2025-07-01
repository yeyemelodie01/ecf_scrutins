import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Scrutins from '../components/Scrutins';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Accueil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Accueil</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Scrutins />
      </IonContent>
    </IonPage>
  );
};

export default Home;
