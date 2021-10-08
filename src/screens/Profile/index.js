import React from "react";
import { Container } from "./styles";
import { Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api";

export default () => {
    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes:[{name:'SignIn'}]
        });


    }

return (
    <Container>
        <Text>PROFILE</Text>
        <Button title="sair" onPress={handleLogoutClick}/>
    </Container>
);

}