import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { addOutline, close, trashBin, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import './List.css';

const List: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [presentigElement, setPresentingElement] = useState<HTMLElement | null>(
    null
  );
  const page = useRef(null);

  const [activeSegment, setActiveSegment] = useState<any>('details');

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const getUsers = async () => {
    const data = await fetch('https://randomuser.me/api/?results=10');
    const users = await data.json();
    console.log(users);
    return users.results;
    // setUsers(users.results);
  };

  useIonViewWillEnter(() => {
    setTimeout(() => {
      getUsers().then(users => setUsers(users));
      setLoading(false);
    }, 500);
  });

  const doRefresh = async (event: any) => {
    setLoading(true);
    const newUsers = await getUsers();
    setTimeout(() => {
      setUsers(newUsers);
      setLoading(false);
      event.detail.complete();
    }, 1000);
  };

  const clearList = () => {
    showAlert({
      header: 'Clear List',
      message: 'Are you sure you want to delete all users?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'tertiary',
        },
        {
          text: 'Delete',
          handler: () => {
            setUsers([]);
            showToast({
              message: 'All users deleted',
              duration: 2000,
              color: 'danger',
              position: 'bottom',
            });
          },
        },
      ],
    });
  };

  return (
    <IonPage ref={page}>
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
      <IonContent className="select-none">
        <IonRefresher slot="fixed" onIonRefresh={ev => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="max-w-4xl mx-auto">
          {loading &&
            [...Array(10)].map((_, index) => (
              <IonCard key={index}>
                <IonCardContent className="ion-no-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <IonSkeletonText animated className="w-32" />
                      <p>
                        <IonSkeletonText className="w-11/12" />
                      </p>
                    </IonLabel>
                    <IonChip color="primary"></IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}

          {users &&
            !loading &&
            users.map((user, index) => (
              <IonCard
                key={index}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer">
                <IonCardContent className="ion-no-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonImg
                        src={user.picture.thumbnail}
                        alt={user.name.first}
                      />
                    </IonAvatar>
                    <IonLabel>
                      {user.name.first} {user.name.last}
                      <p>{user.email}</p>
                    </IonLabel>
                    <IonChip color="primary">{user.nat}</IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
        </div>
        <IonModal
          className="select-none"
          breakpoints={[0.2, 0.5, 0.8]}
          initialBreakpoint={0.5}
          ref={modal}
          isOpen={selectedUser != null}
          onIonModalDidDismiss={() => setSelectedUser(null)}>
          <IonHeader>
            <IonToolbar color={'primary'}>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  <IonIcon slot="icon-only" icon={close} />
                </IonButton>
              </IonButtons>
              <IonTitle>
                {selectedUser?.name.first} {selectedUser?.name.last}
              </IonTitle>
            </IonToolbar>
            <IonToolbar color={''}>
              <IonSegment
                value={activeSegment}
                onIonChange={e => setActiveSegment(e.detail.value)}>
                <IonSegmentButton value="details">Details</IonSegmentButton>
                <IonSegmentButton value="calendar">Calendar</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {activeSegment === 'details' && (
              <IonCard className="ion-no-padding">
                <IonCardHeader>
                  <div className="flex flex-wrap justify-start gap-4 mx-auto">
                    <div>
                      <p className="text-base font-bold">
                        {selectedUser?.email}
                      </p>
                      <p>{selectedUser?.phone}</p>
                    </div>
                    <div>
                      <p className="text-base font-bold">
                        {selectedUser?.location.country}
                      </p>
                      <p>{selectedUser?.location.city}</p>
                    </div>
                  </div>
                </IonCardHeader>
                <IonCardContent className="">
                  <IonImg
                    src={selectedUser?.picture.large}
                    alt={selectedUser?.name.first}
                    className="w-full max-w-[18rem] mx-auto"
                  />
                </IonCardContent>
              </IonCard>
            )}
            {activeSegment === 'calendar' && (
              <IonDatetime className="mx-auto" />
            )}
          </IonContent>
        </IonModal>

        <IonModal
          ref={cardModal}
          trigger="card-modal"
          presentingElement={presentigElement!}>
          <IonHeader>
            <IonToolbar color={'secondary'}>
              <IonButtons slot="start">
                <IonButton onClick={() => cardModal.current?.dismiss()}>
                  <IonIcon slot="icon-only" icon={close} />
                </IonButton>
              </IonButtons>
              <IonTitle>Card Modal</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">Card Modal</IonContent>
        </IonModal>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="card-modal">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default List;
