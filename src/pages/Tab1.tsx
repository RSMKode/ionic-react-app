import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';

const IMAGE_KEY = 'image';

const Tab1: React.FC = () => {
  const [image, setImage] = useState<any>(null);

  useIonViewDidEnter(() => {
    const checkStorage = async () => {
      const savedImage = await Preferences.get({ key: IMAGE_KEY });
      setImage(savedImage.value);
    };
    checkStorage();
  });

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    const img = `data:image/jpeg;base64,${image.base64String}`;
    setImage(img);
    await Preferences.set({ key: IMAGE_KEY, value: img });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col max-w-2xl gap-2 mx-auto w-fit ">
          <IonButton expand="block" onClick={takePicture}>
            Take Picture
          </IonButton>
          {image && <IonImg src={image} alt="" />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
