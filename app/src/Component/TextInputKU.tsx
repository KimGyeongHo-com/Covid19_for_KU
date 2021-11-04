import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

interface TextInputKUProps {
    title: string,
    placeholder: string,
    security: boolean,
    onChange: any,
    value?: string
}

class TextInputKU extends Component<TextInputKUProps> {

    render() {
        const { title, placeholder, security, onChange, value } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                <TextInput
                    placeholder= {placeholder}
                    secureTextEntry={security}
                    style={styles.textInput}
                    onChangeText={onChange}
                    value={value}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '80%',
    },
    text: {
        marginVertical: 10
    },
    textInput: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 2,
        paddingLeft: 10
    }
});

export default TextInputKU;