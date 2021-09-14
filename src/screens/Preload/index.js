

import React, {useEffect, useContext} from 'react';

import {Container, LoadingIcon} from './styles';
import BarberLogo from '../../assets/barber.svg'; // posso fazer isso por causa do svg transformer
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';

export default () => {
  const navigation = useNavigation();
  const {dispatch: userDispatch} = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token'); //para pegar o token do usuario
      if (token) {
        let res = await Api.checkToken(token);
        if(res.token){
          await AsyncStorage.setItem('token', res.token);

          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: res.data.avatar
            }
          });

          navigation.reset({
            routes:[{name: 'MainTab'}]
          });

        } else{
          navigation.navigate('SignIn');
        }
        
      } else {
        navigation.navigate('SignIn'); //se nao tem token manda pra tela de login
      }
    };
    checkToken();
  }, []);

  return (
    <Container>
      <BarberLogo width="90%" heigth="160" />
      <ActivityIndicator margin-top="50" size="large" color="#ffffff" />
      <LoadingIcon />
    </Container>
  );
};
