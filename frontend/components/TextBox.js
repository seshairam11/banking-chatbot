import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { GetValidation } from "../function/GetValidation";



const TextBox = ({ ctl_Attribute }) => {
  const [l_rerender, l_setRerender] = useState(false)

  const validate = GetValidation();

  function handleOnchangeText(text) {
    ctl_Attribute.error.errorshow = false;
    ctl_Attribute.inputvalue = text;
    l_setRerender(!l_rerender);
  }

  function handleOnFocus() {
    ctl_Attribute.theme.sethint = true;
    l_setRerender(!l_rerender);
  }

  function handleOnBlur() {
    let err = validate(ctl_Attribute);
    if (err.founderror == true) {
      ctl_Attribute.error.errormsg = err.errmsg;
      ctl_Attribute.error.errorshow = true;
    } else {
      ctl_Attribute.theme.sethint = false;
    }
    l_setRerender(!l_rerender);
  };
  return (
    <View style={localStyle.container}>
      <TextInput
        style={[
          localStyle.textinput,
          ctl_Attribute.error.errorshow ? { borderColor: "red" } : { borderColor: "gray" },
        ]}
        ref={(el) => {
          ctl_Attribute.theme.isfocus = el
        }}
        secureTextEntry={ctl_Attribute.theme.securetext}
        maxLength={ctl_Attribute.theme.length}
        readOnly={ctl_Attribute.theme.readonly}
        keyboardType={ctl_Attribute.theme.inputtype}
        placeholder={ctl_Attribute.theme.placeholder}
        placeholderTextColor={'gray'}
        value={ctl_Attribute.inputvalue}
        onChangeText={(text) => handleOnchangeText(text)}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
      />
      {ctl_Attribute.theme.sethint &&
        < Text style={[
          localStyle.msg,
          ctl_Attribute.error.errorshow ? { color: "red" } : { color: "white" },
        ]} >
          {ctl_Attribute.error.errorshow ? ctl_Attribute.error.errormsg : ctl_Attribute.theme.hinttext}
        </Text>
      }
    </View >
  );
};


const localStyle = StyleSheet.create({
  container: {
    height: 80,
    display: "flex",
  },
  textinput: {
    height: 50,
    width: "auto",
    borderWidth: 1,
    backgroundColor: "#303030",
    color: 'white',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  msg: {
    fontSize: 11,
    marginLeft: 15
  }
})

export default TextBox;
