import React from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import AngularLogo from '../assets/angular-logo.svg';

const Register: React.FC = () => {
  const router = useIonRouter();

  const doRegister = (event: any) => {
    event.preventDefault();
    console.log('doRegister');
    router.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <div className="flex flex-col items-center max-w-xl gap-4 p-4 mx-auto">
          <img
            src={AngularLogo}
            alt="Angular logo"
            className="w-1/2 max-w-60"
          />
          <IonCard className="w-full">
            <IonCardContent>
              <form onSubmit={doRegister} className="flex flex-col gap-2">
                <IonInput
                  label="Email"
                  type="email"
                  placeholder="example@google.com"
                  labelPlacement="floating"
                  fill="outline"
                />
                <IonInput
                  label="Password"
                  type="password"
                  placeholder="example@google.com"
                  labelPlacement="floating"
                  fill="outline"
                />
                <IonButton color="secondary" expand="block" type="submit">
                  <span className="inline-flex items-center gap-2">
                    Create my Account
                    <IonIcon icon={personCircleOutline} className="size-6" />
                  </span>
                </IonButton>
                <small className="text-primary">Already have an account?</small>
                <IonButton
                  size="small"
                  expand="block"
                  type="button"
                  routerLink="/">
                  <span className="inline-flex items-center gap-2">
                    Go to Login
                    <IonIcon icon={logInOutline} className="size-6" />
                  </span>
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      {/* <IonFooter>
        <IonToolbar>
          <IonTitle>Footer</IonTitle>
        </IonToolbar>
      </IonFooter> */}
    </IonPage>
  );
};

export default Register;
