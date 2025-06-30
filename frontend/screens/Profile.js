import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useDispatch, useSelector } from "react-redux";
import { setlogininfo } from '../brewStore/AppState'
import ErrorComponent from '../components/ErrorComponent'


export default function Profile() {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [password, setPassword] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState({});

    const ctlAttribute = useRef();

    const validate = GetValidation();
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const appState = useSelector((state) => state.appstate.login_info);
    const dispatch = useDispatch();
    function initiControl() {
        const ctl_array = [
            {
                /*Ctl:User name : 0*/
                arrayindex: 0,
                theme: {
                    placeholder: "User name",
                    id: "txt_username",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your Username",
                },
                inputvalue: appState.userName,
                validate: {
                    mandatory: true,
                    datatype: "username",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Email : 1*/
                arrayindex: 1,
                theme: {
                    placeholder: "Email",
                    id: "txt_email",
                    inputtype: "email-address",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your Email",
                },
                inputvalue: appState.mailID,
                validate: {
                    mandatory: true,
                    datatype: "email",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Phone no : 2*/
                arrayindex: 2,
                theme: {
                    placeholder: "Phone no",
                    id: "txt_email",
                    inputtype: "numeric",
                    length: 10,
                    isfocus: "",
                    securetext: false,
                    readonly: true,
                    sethint: false,
                    hinttext: "Enter your phone no",
                },
                inputvalue: appState.phone,
                validate: {
                    mandatory: true,
                    datatype: "phoneno",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {},
            {
                /*Ctl:password : 4*/
                arrayindex: 4,
                theme: {
                    placeholder: "Password",
                    id: "txt_password",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: true,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Password",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "Default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:Confirm password : 5*/
                arrayindex: 5,
                theme: {
                    placeholder: "Confirm Password",
                    id: "txt_password",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: true,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Confirm Password",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "Default",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
        ]

        ctlAttribute.current = ctl_array;
        setStartInit(false);
        setStartRender(true);
    }

    useEffect(() => {
        if (startInit == true) {
            initiControl();
        }
    }, [startInit])

    return (
        <>
            {startRender &&
                < View style={{ flex: 1, backgroundColor: "#303030" }}>
                    <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "white" }}>My profile</Text>
                    <View style={{ marginTop: 0 }} >
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[0]}
                        />
                    </View>
                    <View >
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[1]}
                        />
                    </View>
                    <View >
                        <TextBox
                            ctl_Attribute={ctlAttribute.current[2]}
                        />
                    </View>
                </View >
            }
        </>
    )
}