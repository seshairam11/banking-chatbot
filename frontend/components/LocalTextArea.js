import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const LocalTextArea = ({ value, onChangeText, placeholder, readonly, t_styles, numberOfLines = 4, v_styles }) => {
  return (
    <View style={[styles.container, v_styles]}>
      <TextInput
        style={[styles.textArea, t_styles]}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        readOnly={readonly}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    margin: 15,
  },
  textArea: {
    padding: 10,
    fontSize: 16,
    color: "black"
  },
});

export default LocalTextArea;
