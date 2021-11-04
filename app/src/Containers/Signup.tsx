import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, LogBox} from 'react-native';
import SnackBar from 'react-native-snackbar-component';

import { connect } from 'react-redux';
import { signUp } from '../Actions/signupActions';

import TextInputKU from '../Component/TextInputKU';
import ButtonKU from '../Component/ButtonKU';

LogBox.ignoreAllLogs(true)

interface SignupProps {
    navigation: any,
    signUp: Function,
    signupReducer: any
}

interface SignupState {
    email?: string,
    password?: string,
    confirmPassword?: string
}

class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleTextChange = (key: string, value: string) => {
        this.setState({
            [key]: value
        });
    }

    handleSignup = async () => {
        const { signUp, navigation } = this.props;
        const { email, password, confirmPassword } = this.state;

        let res = await signUp(email, password, confirmPassword);

        if (res === 0)
            navigation.navigate("GlobalMap");
    }

    handleLogin = () => {
        const { navigation } = this.props;

        navigation.navigate("Login");
    }

    render() {
        const { email, password, confirmPassword } = this.state;
        const { signupReducer } = this.props;

        return (
            <View style={styles.main}>
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/ku_logo.png')}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <TextInputKU title="Email" placeholder="kuvid@koreac.ac.kr" security={false}
                        onChange={(text: string) => this.handleTextChange('email', text)} value={email}/>
                        <TextInputKU title="Password" placeholder="******" security={true}
                        onChange={(text: string) => this.handleTextChange('password', text)} value={password}/>
                        <TextInputKU title="Confirm Password" placeholder="******" security={true}
                        onChange={(text: string) => this.handleTextChange('confirmPassword', text)} value={confirmPassword}/>
                    </View>
                    <View style={styles.subContainer}>
                        <ButtonKU
                        title="Create an account"
                        onPress={() => this.handleSignup()}
                        />
                        <TouchableOpacity style={styles.textButton} onPress={() => this.handleLogin()}>
                            <Text style={styles.text}>I already have an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SnackBar visible={signupReducer.error} textMessage={signupReducer.msg}/>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        signupReducer: state.signupReducer
    }
}
 
const styles = StyleSheet.create({
    main: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#CDCDCD'
    },
    container: {
        display: 'flex',
        height:'80%',
        width:'100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    subContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    textButton: {
        display: 'flex',
        marginTop: 20,
    },
    text: {
        textDecorationLine: 'underline'
    }
});
 
export default connect(mapStateToProps, { signUp })(Signup);