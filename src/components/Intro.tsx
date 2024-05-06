import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

import './Intro.css';

import Intro1Svg from '../assets/intro/1.svg';
import Intro2Svg from '../assets/intro/2.svg';
import Intro3Svg from '../assets/intro/3.svg';

interface ContainerProps {
  onFinish: () => void;
}

const SwipperButtonNext = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  return (
    <>
      <Swiper className="h-screen w-screen">
        <SwiperSlide className="flex flex-col gap-4 items-center justify-center">
          <img src={Intro1Svg} alt="Intro 1" className="h-[40vh]" />
          <IonText>
            <h3>Build awesome Apps with Ionic UI components</h3>
          </IonText>
          <SwipperButtonNext>Next</SwipperButtonNext>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col gap-4 items-center justify-center">
          <img src={Intro2Svg} alt="Intro 2" className="h-[40vh]" />
          <IonText>
            <h3>Create powerful native apps with Capacitor</h3>
          </IonText>
          <SwipperButtonNext>Next</SwipperButtonNext>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col gap-4 items-center justify-center">
          <img src={Intro3Svg} alt="Intro 3" className="h-[40vh]" />
          <IonText>
            <h3>Enjoy learning to code!</h3>
          </IonText>
          <IonButton onClick={onFinish}>Finish</IonButton>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Intro;
