import { Dimensions, Image, Text, TouchableOpacity, Pressable, View, Animated } from 'react-native';
import { styles } from '../assets/css/style';
import { bootstrap } from '../assets/css/bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setlogininfo } from '../brewStore/AppState';

export default function Header({ cleanChat, setCleanChat }) {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [visibleBackDrop, setVisibleBackDrop] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);
    const [screenSize, setScreenSize] = useState(Dimensions.get('window'));

    const opacity = useRef(new Animated.Value(0)).current;
    const ctlAttribute = useRef([]);
    const navigation = useNavigation();
    const appState = useSelector((state) => state.appstate.login_info);
    const dispatch = useDispatch();

    function initControl() {
        let ctl_array = [
            {
                /*Ctl: X : 0*/
                arrayindex: 0,
                theme: {
                    id: "profileCross",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.btnDanger, bootstrap.noShadow],
                    disable: false,
                    labelText: null,
                },
                icon: {
                    setIcon: true,
                    name: "close",
                    size: 14,
                    color: "white",
                }
            },
            {
                /*Ctl: logout : 1*/
                arrayindex: 1,
                theme: {
                    id: "logout",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.btnSuccess, bootstrap.mt1],
                    disable: false,
                    labelText: "Logout",
                    labelTextStyle: [{ color: "white" }]
                },
                icon: {
                    setIcon: true,
                    name: "logout",
                    size: 19,
                    color: "white",
                }
            },
        ]
        ctlAttribute.current = ctl_array;
        setStartRender(true);
        setStartInit(false);
    }
    function handlePress(id) {
        console.log(id);
        switch (id) {
            case 'home':
                if (appState.userType === "Admin") {
                    navigation.navigate('passage');
                } else {
                    navigation.navigate('home');
                }
                break;
            case 'clear':
                setCleanChat(!cleanChat);
                break;
            case 'profile':
                setVisibleBackDrop(true);
                setVisibleProfile(true);
                break;
            case 'profileCross':
            case 'backDrop':
                console.log("backDrop")
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case "logout":
                dispatch(setlogininfo({}));
                navigation.navigate('entry');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case "myprofile":
                navigation.navigate('myprofile');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            case 'settings':
                navigation.navigate('settings');
                setVisibleBackDrop(false);
                setVisibleProfile(false);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        const updateSize = () => {
            setScreenSize(Dimensions.get('window')); // Always get latest window size
        };
        const subscription = Dimensions.addEventListener('change', updateSize);
        return () => subscription?.remove(); // Clean up listener
    }, []);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: visibleBackDrop ? 1 : 0, // 1 for visibleBackDrop, 0 for hidden
            duration: 150, // 150ms
            useNativeDriver: true, // Optimize animation
        }).start();
    }, [visibleBackDrop]);

    useEffect(() => {
        if (startInit === true) {
            initControl();
        }
    }, [startInit]);
    return (
        (startRender && (
            <View>
                {/* Header Container */}
                <View style={styles.header}>
                    {/* Left Section - home Button */}
                    <View style={styles.headerLeft}>
                        <TouchableOpacity style={styles.headerImageContainer} onPress={() => handlePress('home')}>
                            <Image source={require('../assets/img/header.png')} style={styles.headerImage} />
                        </TouchableOpacity>
                    </View>

                    {/* Right Section - Notification & Profile */}
                    <View style={styles.headerRight}>
                        <View style={{ height: 50, marginRight: 15, marginBottom: 5 }}>
                            <TouchableOpacity style={styles.profile} onPress={() => handlePress('profile')}>
                                <MaterialIcons name="menu" size={45} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Backdrop with Animated Opacity */}
                {
                    visibleBackDrop && (
                        <Animated.View style={[{
                            width: screenSize.width,
                            height: screenSize.height + 60,
                            opacity
                        }, styles.backDrop]}>
                            <Pressable style={{ flex: 1 }} onPress={() => handlePress("backDrop")} />
                        </Animated.View>
                    )
                }
                <View style={[styles.menuContainer, visibleProfile ? bootstrap.transformShow : bootstrap.hideRight]}>
                    <View style={{ borderBottomWidth: 1, borderColor: "white", flexDirection: "row", paddingVertical: 10, paddingLeft: 8 }}>
                        <Image source={require('../assets/img/profile.png')} style={{ width: 65, height: 65, borderRadius: 32, resizeMode: "contain" }} />
                        <View style={{ paddingHorizontal: 20, width: "100%", paddingVertical: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", margin: 2, marginTop: 10 }}>{appState.userName}</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: "white", paddingVertical: 10 }}>
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => handlePress("myprofile")}>
                            <Icon name='person-outline' size={25} style={{ padding: 7 }} color={"white"} />
                            <Text style={{ color: "white", paddingHorizontal: 7, paddingVertical: 10 }}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => handlePress("settings")}>
                            <Icon name='settings' size={25} style={{ padding: 7 }} color={"white"} />
                            <Text style={{ color: "white", paddingHorizontal: 7, paddingVertical: 10 }}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => handlePress("about")}>
                            <MaterialIcons name='info-outline' size={25} style={{ padding: 7 }} color={"white"} />
                            <Text style={{ color: "white", paddingHorizontal: 7, paddingVertical: 10 }}>About</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => handlePress("logout")}>
                            <MaterialIcons name='logout' size={25} style={{ padding: 7 }} color={"white"} />
                            <Text style={{ color: "white", paddingHorizontal: 7, paddingVertical: 10 }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        ))

    );
}
