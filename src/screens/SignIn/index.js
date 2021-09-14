

import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold}
   from './styles';

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignButtonClick = async () => {
    if (emailField != '' && passwordField != ''){
      let json = await Api.signIn(emailField, passwordField);

      if ( json.token){
        await AsyncStorage.setItem('token', json.token); // salvei no asyncstorage meu token

        userDispatch({
          type: 'setAvatar',
          payload:{
            avatar: json.data.avatar
          },
        });

        navigation.reset({
          routes:[{name:'MainTab'}]
        });
        
      } else {
        alert("Email ou senha incorretos");
      }

    } else {
      alert("Preencha os campos");
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };


  return (
    <Container>

     {/* <BarberLogo width="90%" heigth="20px"/> */}
     <InputArea>
      <SignInput 
        IconSvg={EmailIcon}
        placeholder = "Digite seu email"
        value = {emailField}
        onChangeText = { t => setEmailField(t)}

      />
      <SignInput
        IconSvg={LockIcon}
        placeholder = "Digite sua senha"
        value = {passwordField}
        onChangeText = { t => setPasswordField(t)}
        password = {true}
       />
       <CustomButton onPress = {handleSignButtonClick}>
         <CustomButtonText>LOGIN</CustomButtonText>
       </CustomButton>
       </InputArea>

       <SignMessageButton onPress={handleMessageButtonClick}>
         <SignMessageButtonText>Ainda nao possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
       </SignMessageButton>
    </Container>
  );
};
