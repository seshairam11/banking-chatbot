import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const DropDown = ({ label, value, onChange, options, isReadOnly }) => {

    const handleOnChange = (itemValue) => {
        onChange(itemValue);
    };


    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer }>
                <Picker
                    selectedValue={value}
                    onValueChange={handleOnChange}
                    enabled={!isReadOnly}
                >
                    <Picker.Item label={label} value="" />
                    {options.map((item, index) => (
                        <Picker.Item key={index} label={item.keylistvalue} value={item.keylistvalue} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: 65,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "white",
        height: 55,
    },
});


//  {
//                     /*txt: Select the Driver : 0*/
//                     arrayindex: 0,
//                     theme: {
//                         labletext: "Select the Driver",
//                         style: [],
//                         id: "sel_driver",
//                         readonly: false,
//                         hinttext:
//                             "Select the driver",
//                     },
//                     inputvalue: "",
//                     validate: {
//                         mandatory: true,
//                         datatype: "dropdown",
//                     },
//                     error: {
//                         errorshow: false,
//                         errormsg: "The field is mandatory",
//                     },
//                     dropdata: driversList,
//                 },