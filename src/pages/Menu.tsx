import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';
import {
  homeOutline,
  newspaperOutline,
  cogOutline,
  logOutOutline,
} from 'ionicons/icons';

const Menu: React.FC = () => {
  const paths = [
    { name: 'Home', path: '/app/list', icon: homeOutline },
    { name: 'Settings', path: '/app/settings', icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId="main" when="xl">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color={'primary'}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  color=""
                  routerLink={item.path}
                  routerDirection="none"
                  className="text-primary">
                  <IonIcon
                    icon={item.icon}
                    slot="start"
                    className="text-current"
                  />
                  <span className="flex items-center gap-2">{item.name}</span>
                </IonItem>
              </IonMenuToggle>
            ))}
            <IonMenuToggle autoHide={false}>
              <IonButton
                size="small"
                expand="block"
                color="secondary"
                routerLink="/"
                routerDirection="back">
                <IonIcon icon={logOutOutline} slot="start" />
                <span className="flex items-center gap-2">Logout</span>
              </IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main">
          <Route exact path="/app" component={List}>
            <Redirect to="/app/list" />
          </Route>
          <Route exact path="/app/list" component={List} />
          <Route path="/app/settings" component={Settings} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
