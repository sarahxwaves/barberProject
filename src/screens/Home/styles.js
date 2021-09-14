import React, {useState} from "react";
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #63C2D1;
    

`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;

`;

export const HeaderArea = styled.View`
    flex-direction: row;
     justify-content: space-between;
    align-items: center;

`;
export const HeaderTitle = styled.Text`
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    width: 250px;

`;
export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;

`;
export const LocationArea = styled.View`
    width: 100%;
    height: 60px;
    align-items: center;
    background-color:#4EADBE ;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 30px;

`;

export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #fff;

`;

export const LocationFinder = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ListArea = styled.View`
    margin-top: 20px

`;



