import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from '@ionic/react';
import {
  colorFill,
  logInOutline,
  logOutOutline,
  personCircleOutline,
  returnDownBackOutline,
} from 'ionicons/icons';
import React, { useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

import AngularLogo from '../assets/angular-logo-color.svg';
import Intro from '../components/Intro';

const INTRO_KEY = 'intro_seen';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = React.useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      console.log('seen', seen);
      setIntroSeen(seen.value === 'true');
    };
    checkStorage();
  }, []);

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present('Logging in...');
    setTimeout(() => {
      dismiss();
      router.push('/app', 'root');
    }, 1000);
  };

  const finishIntro = async () => {
    console.log('finishIntro');
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: 'true' });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color="primary">
              {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons> */}
              <IonTitle>Logina</IonTitle>
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
                  <form onSubmit={doLogin} className="flex flex-col gap-2 item">
                    <IonInput
                      mode="md"
                      label="Email"
                      type="email"
                      placeholder="example@google.com"
                      labelPlacement="floating"
                      fill="outline"
                    />
                    <IonInput
                      mode="md"
                      label="Password"
                      type="password"
                      placeholder="example@google.com"
                      labelPlacement="floating"
                      fill="outline"
                    />
                    <IonButton expand="block" type="submit">
                      <span className="inline-flex items-center gap-2">
                        Login
                        <IonIcon icon={logInOutline} className="size-6" />
                      </span>
                    </IonButton>
                    <small className="text-primary">
                      Don't have an account?
                    </small>
                    <IonButton
                      size="small"
                      routerLink="/register"
                      color="secondary"
                      expand="block"
                      type="button">
                      <span className="inline-flex items-center gap-2">
                        Create Account
                        <IonIcon
                          icon={personCircleOutline}
                          className="size-6"
                        />
                      </span>
                    </IonButton>
                    <IonButton
                      fill="clear"
                      size="small"
                      color="medium"
                      expand="block"
                      type="button"
                      onClick={seeIntroAgain}>
                      <span className="inline-flex items-center gap-2 w-fit">
                        See Intro Again
                        <IonIcon
                          icon={returnDownBackOutline}
                          className="size-6"
                        />
                      </span>
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
