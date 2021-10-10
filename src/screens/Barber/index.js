import React, {useState, useEffect} from 'react';
import { 
    Container,
    Scroller,
    FakeSwiper,
    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,
    SwipeDot,
    SwipeDotActive,
    SwipeImage,
    SwipeItem,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,
    BackButton,
    LoadingIcon,
    ServiceName,
    ServiceInfo,
    ServicesTitle,
    ServiceItem,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText
} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg'

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });
   
    const [loading, setLoading] = useState(false);
    //setLoading(true);

    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true);
            let json = await Api.getBarber(userInfo.id);
            if(json.error == ''){
               setUserInfo(json.data);
            } else {
                alert("Erro: "+ json.error);
            }
            setLoading(false);
           
        }
        getBarberInfo();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }
    
    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                    style={{height: 240}}
                    dot={<SwipeDot/>}
                    activeDot={<SwipeDotActive/>}
                    paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                    autoplay={true}
                    >
                        {userInfo.photos.map((item, key) => (
                            <SwipeItem key = {key}>
                                <SwipeImage source={{uri: item.url}} resizeMode="cover"/>
                            </SwipeItem>
                        ))}

                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri: userInfo.avatar}}/>
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}/>

                        </UserInfo>
                        <UserFavButton>
                            <FavoriteIcon width="24" height="24" fill="#F00"/>
                        </UserFavButton>

                    </UserInfoArea>

                    {loading && <LoadingIcon size="large" color="#000"/>}

                    {userInfo.services &&
                    <ServiceArea>

                        <ServicesTitle>Lista de serviços</ServicesTitle>

                            {userInfo.services.map((item, key) => (
                                
                                <ServiceItem key={key}>
                                <ServiceInfo>
                                    <ServiceName>{item.name}</ServiceName>
                                    <ServicePrice>R$ {item.price}</ServicePrice>
                                </ServiceInfo>

                                <ServiceChooseButton>
                                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                </ServiceChooseButton>
                                </ServiceItem>
                            ))} 

                    </ServiceArea>
                }

                {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                    <TestimonialArea>
                        <Swiper>
                            
                        </Swiper>

                    </TestimonialArea>
                }

                </PageBody>

            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#fff"/>
            </BackButton>
        </Container>
    );
}