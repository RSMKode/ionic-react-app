import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import { ellipse, triangle } from 'ionicons/icons';

const Settings: React.FC = () => {
  return (
    // <IonPage>
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/app/settings/tab1">
          <IonIcon icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/app/settings/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTitle>Settings</IonTitle>
      </IonTabBar>

      <IonRouterOutlet>
        <Route exact path="/app/settings">
          <Redirect to="/app/settings/tab1" />
        </Route>
        <Route path="/app/settings/tab1" component={Tab1} />
        <Route path="/app/settings/tab2" component={Tab2} />
      </IonRouterOutlet>
    </IonTabs>
    // </IonPage>
  );
};

export default Settings;
