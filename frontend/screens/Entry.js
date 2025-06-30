import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import TextBox from '../components/TextBox'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useDispatch, useSelector } from "react-redux";
import { setlogininfo } from '../brewStore/AppState';
import ErrorComponent from '../components/ErrorComponent'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Entry({ navigation, route }) {
    const [slide, setSlide] = useState("Welcome");
    const [access, setAccess] = useState(null);
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
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
                //ctl : Students : 0
                arrayindex: 0,
                theme: {
                    id: "students",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { width: "95%", marginBottom: 20, backgroundColor: "white" }],
                    disable: false,
                    labelText: "Student's",
                    labelTextStyle: [bootstrap.textDark]
                },
                icon: {
                    setIcon: false,
                    name: "",
                    size: 0,
                    color: "",
                }
            },
            {},
            {
                //ctl : Staff : 2
                arrayindex: 2,
                theme: {
                    id: "staffs",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.noShadow, bootstrap.mhAuto, { width: "95%", marginBottom: 20, borderWidth: 2, borderColor: 'white', }],
                    disable: false,
                    labelText: "Staff's",
                    labelTextStyle: [bootstrap.textWhite]
                },
                icon: {
                    setIcon: false,
                    name: "",
                    size: 0,
                    color: "",
                }
            },
            {
                //ctl : Sign in : 3
                arrayindex: 3,
                theme: {
                    id: "signin",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgDanger, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Sign in",
                    labelTextStyle: [bootstrap.textSuccess]
                },
                icon: {
                    setIcon: false,
                    name: "",
                    size: 0,
                    color: "",
                }
            },
            {
                //ctl : Signup : 4
                arrayindex: 4,
                theme: {
                    id: "signup",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccess, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Sign up",
                    labelTextStyle: [bootstrap.textWhite]
                },
                icon: {
                    setIcon: false,
                    name: "",
                    size: 0,
                    color: "",
                }
            },
            {
                /*Ctl:password : 5*/
                arrayindex: 5,
                theme: {
                    placeholder: "Login id",
                    id: "txt_loginid",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Email or Phoneno",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "loginid",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:password : 6*/
                arrayindex: 6,
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
                //ctl : Sign in : 7
                arrayindex: 7,
                theme: {
                    id: "signinscreen",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccess, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Sign in",
                    labelTextStyle: [bootstrap.textWhite]
                },
                icon: {
                    setIcon: false,
                    name: "",
                    size: 0,
                    color: "",
                }
            },
            {
                /*Ctl:User name : 8*/
                arrayindex: 8,
                theme: {
                    placeholder: "User name",
                    id: "txt_username",
                    inputtype: "text",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Username",
                },
                inputvalue: "",
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
                /*Ctl:Email : 9*/
                arrayindex: 9,
                theme: {
                    placeholder: "Email",
                    id: "txt_email",
                    inputtype: "email-address",
                    length: 30,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your Email",
                },
                inputvalue: "",
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
                /*Ctl:Phone no : 10*/
                arrayindex: 10,
                theme: {
                    placeholder: "Phone no",
                    id: "txt_email",
                    inputtype: "numeric",
                    length: 10,
                    isfocus: "",
                    securetext: false,
                    readonly: false,
                    sethint: false,
                    hinttext: "Enter your phone no",
                },
                inputvalue: "",
                validate: {
                    mandatory: true,
                    datatype: "phoneno",
                },
                error: {
                    errorshow: false,
                    errormsg: "The field is mandatory",
                },
            },
            {
                /*Ctl:password : 11*/
                arrayindex: 11,
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
                /*Ctl:Confirm password : 12*/
                arrayindex: 12,
                theme: {
                    placeholder: "Confirm Password",
                    id: "txt_confirmpassword",
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
            {
                //ctl : Sign in : 13
                arrayindex: 13,
                theme: {
                    id: "signupscreen",
                    style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccess, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                    disable: false,
                    labelText: "Sign up",
                    labelTextStyle: [bootstrap.textWhite]
                },
                icon: {
                    setIcon: false,
                    name: "",
                    size: 0,
                    color: "",
                }
            },
        ]

        ctlAttribute.current = ctl_array;
        setStartInit(false);
        setStartRender(true);
    }

    function handlePress(id) {
        switch (id) {
            case "students":
                setSlide("Student's")
                break;
            case "admin":
                setSlide("Admin")
                break;
            case "staffs":
                setSlide("Staff's")
                break;
            case "welcome":
                setSlide("Welcome")
                setAccess(null)
                break;
            case "signin":
                makeitNormal([5, 6])
                setAccess("signin")
                break;
            case "signup":
                makeitNormal([8, 9, 10, 11, 12])
                setAccess("signup")
                break;
            case "signinscreen":
                validateSigninBtn()
                break;
            case "signupscreen":
                validateSignupBtn()
                break;
        }
    }

    function makeitNormal(array) {
        array.map(num => {
            ctlAttribute.current[num].inputvalue = ""
            ctlAttribute.current[num].theme.sethint = false
            ctlAttribute.current[num].error.errorshow = false
        })
    }
    async function validateSigninBtn() {
        const result = await loopingValidation([5, 6]);
        if (result) {
            let _getSigninAuth = {
                loginID: ctlAttribute.current[5].inputvalue.toLowerCase(),
                password: ctlAttribute.current[6].inputvalue,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_getSigninAuth),
                apiUrl: "/api/v1/signin",
                apikey: "SIGNIN"
            };
            serverRequest(serverRequestParam);
        }
    }

    async function validateSignupBtn() {
        const result = await loopingValidation([8, 9, 10, 11, 12]);
        if (result) {
            if (checkPassword(11, 12) == true) {
                let _getSignupAuth = {
                    userName: ctlAttribute.current[8].inputvalue,
                    mailID: ctlAttribute.current[9].inputvalue.toLowerCase(),
                    phone: ctlAttribute.current[10].inputvalue,
                    password: ctlAttribute.current[11].inputvalue,
                    userType: "User",
                }
                console.log(_getSignupAuth)
                let serverRequestParam = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(_getSignupAuth),
                    apiUrl: "/api/v1/signup",
                    apikey: "SIGNUP"
                };
                serverRequest(serverRequestParam);
            }
        }
    }
    function fnSigninResult() {
        const _value = responseData.value
        if (responseData.isAuth === true) {
            dispatch(setlogininfo({
                ...appState,
                isAuth: responseData.isAuth,
                _id: _value._id,
                mailID: _value.mailID,
                phone: _value.phone,
                userName: _value.userName,
                userType: _value.userType,
            }));
            navigation.navigate("myprofile")
        } else {
            setError({
                isAuth: true,
                haeder: "Error",
                body: responseData.errormsg
            })
            console.log(responseData)
        }
    }
    function fnSignupResult() {
        const _value = responseData.value
        if (responseData.isAuth === true) {
            dispatch(setlogininfo({
                ...appState,
                isAuth: responseData.isAuth,
                _id: _value._id,
                mailID: _value.mailID,
                phone: _value.phone,
                userName: _value.userName,
                userType: _value.userType,
            }));
            navigation.navigate("myprofile")
        } else {
            console.log(responseData.errormsg)
            setError({
                isAuth: true,
                haeder: "Error",
                body: responseData.errormsg
            })
        }
    }

    async function loopingValidation(array) {
        let canFormSubmit = true;
        let l_validate = [];
        const err = await array.map(num => validate(ctlAttribute.current[num]));
        err.forEach((item, index) => {
            if (item.founderror === true) {
                canFormSubmit = false;
                ctlAttribute.current[array[index]].error.errorshow = true;
                ctlAttribute.current[array[index]].theme.sethint = true;
                ctlAttribute.current[array[index]].error.errormsg = item.errmsg;
                l_validate.push(item);
            }
        });

        if (canFormSubmit === false) {
            ctlAttribute.current[l_validate[0].arrayindex].theme.isfocus.focus();
            setRerender(!rerender);
            return false;
        }
        return true;
    }
    function checkPassword(p1, p2) {
        if (ctlAttribute.current[p1].inputvalue !== ctlAttribute.current[p2].inputvalue) {
            ctlAttribute.current[p2].error.errorshow = true;
            ctlAttribute.current[p2].theme.sethint = true;
            ctlAttribute.current[p2].error.errormsg = "Password mismatch";
            setRerender(!rerender);
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (startInit == true) {
            initiControl();
        } else {
            if (isLoadingApi == true) {
                switch (apiKey) {
                    case "SIGNUP":
                        fnSignupResult();
                        break;
                    case "SIGNIN":
                        fnSigninResult();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi])

    return (
        <>
            {startRender &&
                <View style={{ width: "100%", height: "100%", backgroundColor: "#212121", display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <View style={{ marginTop: 100 }}>
                        <TouchableOpacity
                            onPress={() => handlePress("welcome")}
                        >
                            <Image
                                source={require("../assets/img/logo.png")}
                                style={{ width: 250, borderRadius: 20, resizeMode: "contain", marginHorizontal: "auto" }}
                            />
                        </TouchableOpacity>
                        <View style={{ width: "100%", marginBottom: 35, marginLeft: 15, }}>
                            <Text style={[bootstrap.h2, bootstrap.textWhite]}>
                                {slide}
                            </Text>
                            <Text style={[bootstrap.textWhite]}>
                                Welcome! Please register or log in to continue.
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: "50%" }}>
                        {slide == "Admin" ?
                            <>
                                <TextBox
                                    ctl_Attribute={ctlAttribute.current[5]}
                                />
                                <TextBox
                                    ctl_Attribute={ctlAttribute.current[6]}
                                />
                                <LocalButton
                                    handlePress={handlePress}
                                    ctl_Attribute={ctlAttribute.current[7]}
                                />
                            </>
                            :
                            <>
                                {access === null ?
                                    <>
                                        <LocalButton
                                            handlePress={handlePress}
                                            ctl_Attribute={ctlAttribute.current[3]}
                                        />
                                        <LocalButton
                                            handlePress={handlePress}
                                            ctl_Attribute={ctlAttribute.current[4]}
                                        />
                                    </>
                                    : access === "signin" ?
                                        <>
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[5]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[6]}
                                            />
                                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginBottom: 10 }}>
                                                <Text style={{ fontSize: 14, color: "white" }}>Don't have an account yet? </Text>
                                                <TouchableOpacity onPress={() => handlePress("signup")}>
                                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#007bff" }}>Sign up here 🚀</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <LocalButton
                                                handlePress={handlePress}
                                                ctl_Attribute={ctlAttribute.current[7]}
                                            />

                                        </>
                                        :
                                        <>
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[8]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[9]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[10]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[11]}
                                            />
                                            <TextBox
                                                ctl_Attribute={ctlAttribute.current[12]}
                                            />
                                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginBottom: 10 }}>
                                                <Text style={{ fontSize: 14, color: "white" }}>Already have an account? </Text>
                                                <TouchableOpacity onPress={() => handlePress("signin")}>
                                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#007bff" }}>Sign in here 🚀</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <LocalButton
                                                handlePress={handlePress}
                                                ctl_Attribute={ctlAttribute.current[13]}
                                            />
                                        </>
                                }
                            </>
                        }
                    </View>
                    {error.isAuth &&
                        <ErrorComponent
                            header={error.header}
                            body={error.body}
                            setError={setError}
                        />}
                    <TouchableOpacity
                        onPress={() => handlePress("admin")}
                        style={{ position: "absolute", top: 90, right: 20, backgroundColor: "#01aa85", width: 45, height: 45, justifyContent: "center", alignItems: "center", borderRadius: 25, paddingLeft: 5 }}>
                        <MaterialIcons name="accessibility" size={30} color="white" style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                </View>}
        </>

    )
}