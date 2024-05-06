import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonViewWillEnter,
} from '@ionic/react';
import { trashBin, trashBinOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const List: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  const getUsers = async () => {
    const data = await fetch('https://randomuser.me/api/?results=10');
    const users = await data.json();
    console.log(users);
    setUsers(users.results);
  };

  const clearList = () => {
    setUsers([]);
  };

  useIonViewWillEnter(() => {
    getUsers();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon slot="icon-only" icon={trashBin} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {users &&
          users.map((user, index) => (
            <IonCard key={index}>
              <IonCardContent>
                <div className="flex items-center gap-2">
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                  <IonTitle>
                    {user.name.first} {user.name.last}
                  </IonTitle>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default List;
