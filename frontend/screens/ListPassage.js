import { View, Text } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LocalButton from '../components/LocalButton'
import { bootstrap } from '../assets/css/bootstrap'
import { GetValidation } from '../function/GetValidation'
import useFetch from '../function/GetAPI'
import { useSelector } from "react-redux";
import ErrorComponent from '../components/ErrorComponent'
import { TouchableTable } from '../components/TouchableTable'
import LocalTextArea from '../components/LocalTextArea'

export default function ListPassage() {

    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
    const [readonly, setReadonly] = useState(true);
    const [rerender, setRerender] = useState(false);
    const [error, setError] = useState({});
    const [passage, setPassage] = useState("");
    const [question, setQuestion] = useState("");

    const ctlAttribute = useRef();
    const tbl_passage = useRef();

    const validate = GetValidation();
    const { responseData, isLoadingApi, apiKey, fetchError, serverRequest } = useFetch();
    const appState = useSelector((state) => state.appstate.login_info);

    function fnViewPassageRequest() {
        let _getBody = {
            referId: null
        }
        let serverRequestParam = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(_getBody),
            apiUrl: "/api/v1/listpassage",
            apikey: "VIEWPASS"
        };
        serverRequest(serverRequestParam);
        setStartInit(false);
        setPassage("");
        setQuestion("");
    }

    function initiControl() {
        console.log(responseData);
        if (responseData.isAuth) {

            const ctl_array = [
                {
                    //ctl : Update : 0
                    arrayindex: 0,
                    theme: {
                        id: "Update",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgSuccessLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Update",
                        labelTextStyle: [bootstrap.textDark]
                    },
                    icon: {
                        setIcon: false,
                        name: "",
                        size: 0,
                        color: "",
                    }
                },
                {
                    //ctl : Delete : 1
                    arrayindex: 1,
                    theme: {
                        id: "delete",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgDangerLight, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Delete",
                        labelTextStyle: [bootstrap.textDark]
                    },
                    icon: {
                        setIcon: false,
                        name: "",
                        size: 0,
                        color: "",
                    }
                },
                {
                    //ctl : Cancel : 2
                    arrayindex: 2,
                    theme: {
                        id: "cancel",
                        style: [bootstrap.btnSm, bootstrap.btn, bootstrap.bgWhite, bootstrap.noShadow, bootstrap.mhAuto, { width: "98%", marginBottom: 20 }],
                        disable: false,
                        labelText: "Cancel",
                        labelTextStyle: [bootstrap.textDark]
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
            fnBuildDriverList(responseData.value);
            setStartRender(true);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.errormsg,
            })
        }
    }

    function fnBuildDriverList(resTableData) {

        const passagelist = resTableData
            .map(item => ({
                rowid: item._id,
                showrow: true,
                table_value: [
                    {
                        t_key: 0,
                        t_value: item.question,
                    },
                    {
                        t_key: 1,
                        t_value: item.answer,
                    },
                ]
            }))

        let l_tbl_passage = {
            tablename: "tbl_passagelist",
            tableindex: null,
            tabledataid: null,
            colMetaData: [
                {
                    h_colindex: 0,
                    h_name: "Question",
                    h_width: "150",
                    h_txtalign: "left",
                },
                {
                    h_colindex: 1,
                    h_name: "Passage",
                    h_width: "43",
                    h_txtalign: "left",
                },

            ],
            tableData: passagelist,
        };
        tbl_passage.current = l_tbl_passage
    }

    function handlePress(id) {
        switch (id) {
            case "Update":
                fnUpdate();
                break;
            case "cancel":
                setPassage("");
                setQuestion("");
                setReadonly(true);
                break;
            case "delete":
                fnDelete();
                break;

        }
    }
    async function fnUpdate() {
        if (passage !== "" && question !== "") {
            let _updatePassageList = {
                _id: tbl_passage.current.tabledataid,
                question: question,
                answer: passage,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_updatePassageList),
                apiUrl: "/api/v1/updatepassage",
                apikey: "UPDATEPASS"
            };
            serverRequest(serverRequestParam);
            setError({});
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: "Question and Answer want to be fulled"
            })
        }
    }

    function fnDelete() {
        if (passage !== "" && question !== "") {
            let _deletePassage = {
                _id: tbl_passage.current.tabledataid,
            }
            let serverRequestParam = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(_deletePassage),
                apiUrl: "/api/v1/deletepassage",
                apikey: "DELETEPASS"
            };
            serverRequest(serverRequestParam);
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: "Question and Answer want to be fulled"
            })
        }
    }

    function handleClickTable(index) {
        const driverDetial = tbl_passage.current.tableData[index];
        tbl_passage.current.tableindex = index;
        tbl_passage.current.tabledataid = driverDetial.rowid;
        setQuestion(driverDetial.table_value[0].t_value)
        setPassage(driverDetial.table_value[1].t_value)
        setReadonly(false);
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
    function removeErrors(array) {
        array.map(num => {
            ctlAttribute.current[num].theme.sethint = false
            ctlAttribute.current[num].error.errorshow = false
        })
    }
    function makeitNormal(array) {
        array.map(num => {
            ctlAttribute.current[num].inputvalue = ""
            ctlAttribute.current[num].theme.sethint = false
            ctlAttribute.current[num].error.errorshow = false
        })
    }
    function modifyReadOnly(arr, bool) {
        arr.forEach(num => {
            ctlAttribute.current[num].theme.readonly = bool;
        })
    }

    function fnResponseDeletePassage() {
        if (responseData.isAuth) {
            tbl_passage.current.tableData.splice(tbl_passage.current.tableindex, 1);
            setPassage("");
            setQuestion("");
        } else {
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.value
            })
        }
    }

    function fnResponseUpadtePassage() {
        console.log(responseData.value._id)
        console.log(tbl_passage.current.tableindex)
        if (responseData.isAuth) {
            tbl_passage.current.tableData.splice(tbl_passage.current.tableindex, 1, {
                rowid: responseData.value._id,
                showrow: true,
                table_value: [
                    { t_key: "0", t_value: responseData.value.question },
                    { t_key: "1", t_value: responseData.value.answer },

                ],
            });
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.value
            })

        } else {
            console.log(responseData.errormsg)
            setError({
                isAuth: true,
                header: "Error",
                body: responseData.errormsg
            })
        }
    }


    useEffect(() => {
        if (startInit === true) {
            fnViewPassageRequest();
        } else {
            if (isLoadingApi) {
                switch (apiKey) {
                    case "VIEWPASS":
                        initiControl();
                        break;
                    case "DELETEPASS":
                        fnResponseDeletePassage();
                        break;
                    case "UPDATEPASS":
                        fnViewPassageRequest();
                        break;
                }
            }
        }
    }, [startInit, isLoadingApi]);

    return (
        <>
            {startRender &&
                < View style={{ flex: 1 }}>
                    <LocalTextArea
                        value={question}
                        readonly={readonly}
                        onChangeText={setQuestion}
                        placeholder="Enter your Question..."
                        t_styles={{ height: 80 }}
                        numberOfLines={7}
                        v_styles={{ backgroundColor: "white" }}
                    />
                    <LocalTextArea
                        value={passage}
                        readonly={readonly}
                        onChangeText={setPassage}
                        placeholder="Enter your Passage..."
                        t_styles={{ height: 150 }}
                        numberOfLines={7}
                        v_styles={{ backgroundColor: "white" }}
                    />
                    <LocalButton
                        ctl_Attribute={ctlAttribute.current[0]}
                        handlePress={handlePress}
                    />
                    <LocalButton
                        ctl_Attribute={ctlAttribute.current[1]}
                        handlePress={handlePress}
                    />
                    <LocalButton
                        ctl_Attribute={ctlAttribute.current[2]}
                        handlePress={handlePress}
                    />
                    <TouchableTable
                        tableData={tbl_passage.current.tableData}
                        colMetaData={tbl_passage.current.colMetaData}
                        handleClickTable={handleClickTable}
                    />

                    {error.isAuth &&
                        <ErrorComponent
                            header={error.header}
                            body={error.body}
                            setError={setError}
                        />}
                </View >
            }
        </>
    )
}