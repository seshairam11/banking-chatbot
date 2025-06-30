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
import LocalTextArea from '../components/LocalTextArea'
import { DropDown } from '../components/DropDown'


export default function Passage({ navigation }) {

    const [startInit, setStartInit] = useState(false);
    const [error, setError] = useState({});
    const [passage, setPassage] = useState("");
    const [question, setQuestion] = useState("");

    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();

    function handlePress(id) {
        switch (id) {
            case "submit":
                fnsubmit();
                break;
            case "View passage":
                navigation.navigate("listpassage")
                break;
        }
    }

    async function fnsubmit() {
        if (passage === "") {
            setError({
                isAuth: true,
                haeder: "Mandatory",
                body: "The passage must not be empty."
            })
        } else if (question === "") {
            setError({
                isAuth: true,
                haeder: "Mandatory",
                body: "The Question must not be empty."
            })
        } else {
            let _createpassage = {
                question: question,
                answer: passage,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_createpassage),
                apiUrl: "/api/v1/createpassage",
                apikey: "SETPASS"
            };
            serverRequest(serverRequestParam);
            setStartInit(true);
            setPassage("");
            setQuestion("");
        }
    }

    function fnResponseSetPassage() {
        console.log(responseData);
        setError({
            isAuth: true,
            header: "Massage",
            body: responseData.errormsg
        });
        setStartInit(false);
    }

    useEffect(() => {
        if (startInit == true) {
            if (isLoadingApi == true) {
                switch (apiKey) {
                    case "SETPASS":
                        fnResponseSetPassage();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi])


    return (
        <>
            < View style={{ flex: 1, backgroundColor: "#e3f7f3" }}>
                <Text style={{ fontSize: 33, margin: 10, fontWeight: 500, color: "black" }}>Passage</Text>
                <LocalTextArea
                    value={question}
                    onChangeText={setQuestion}
                    placeholder="Enter your Question..."
                    t_styles={{ height: 80 }}
                    numberOfLines={7}
                    v_styles={{ backgroundColor: "white" }}
                />
                <LocalTextArea
                    value={passage}
                    onChangeText={setPassage}
                    placeholder="Enter your Passage..."
                    t_styles={{ height: 150 }}
                    numberOfLines={7}
                    v_styles={{ backgroundColor: "white" }}
                />
                <View style={{ marginHorizontal: 15 }}>
                    <LocalButton
                        ctl_Attribute={{
                            theme: {
                                id: "submit",
                                style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccess, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                                disable: false,
                                labelText: "Submit",
                                labelTextStyle: [bootstrap.textWhite]
                            },
                            icon: {
                                setIcon: false,
                                name: "",
                                size: 0,
                                color: "",
                            }
                        }}
                        handlePress={handlePress}
                    />
                    <LocalButton
                        ctl_Attribute={{
                            theme: {
                                id: "View passage",
                                style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccess, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                                disable: false,
                                labelText: "View passage",
                                labelTextStyle: [bootstrap.textWhite]
                            },
                            icon: {
                                setIcon: false,
                                name: "",
                                size: 0,
                                color: "",
                            }
                        }}
                        handlePress={handlePress}
                    />
                </View>
                {error.isAuth &&
                    <ErrorComponent
                        header={error.header}
                        body={error.body}
                        setError={setError}
                    />}
            </View >
        </>
    )
}