import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonKUProps {
    title: string,
    onPress: Function,
    buttonStyle?: object
}

class ButtonKU extends Component<ButtonKUProps> {

    handlePress = () => {
        const { onPress } = this.props;

        onPress();
    }

    render() {
        const { title, buttonStyle } = this.props;

        return (
            <TouchableOpacity onPress={() => this.handlePress()} style={{ ...styles.container, ...buttonStyle}}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '50%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#A72A1E",
        borderRadius: 10
    },
    text: {
        color: "#FFFFFF"
    }
});

export default ButtonKU;