

import React, {useState, useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold}
   from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';
import SignInput from '../../components/SignInput';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  const [userField, setUserField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignButtonClick = async () => {
    if (userField != '' && emailField != '' && passwordField != ''){
      let res = await Api.signUp(userField, emailField, passwordField);
      if (res.token){
        await AsyncStorage.setItem('token', res.token);

        userDispatch({
          type: 'setAvatar',
          payload:{
            avatar: res.data.avatar
          },
        });
        navigation.reset({
          router:[{name: 'MainTab'}]
        });
      } else {
        alert("Erro: " + res.error);
      }
    } else {
      alert("Preencha os campos");
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };


  return (
    <Container>
     <InputArea>
      <SignInput 
        IconSvg={PersonIcon}
        placeholder = "Digite seu nome"
        value = {userField}
        onChangeText = { t => setUserField(t)}
      />

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
         <CustomButtonText>CADASTRAR</CustomButtonText>
       </CustomButton>
       </InputArea>

       <SignMessageButton onPress={handleMessageButtonClick}>
         <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Entre</SignMessageButtonTextBold>
       </SignMessageButton>
    </Container>
  );
};
