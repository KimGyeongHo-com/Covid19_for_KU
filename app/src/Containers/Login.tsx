import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, LogBox} from 'react-native';
import SnackBar from 'react-native-snackbar-component';

import { connect } from 'react-redux';
import { logIn } from '../Actions/loginActions';

import TextInputKU from '../Component/TextInputKU';
import ButtonKU from '../Component/ButtonKU';

LogBox.ignoreAllLogs(true)

interface LoginProps {
    navigation: any,
    logIn: Function,
    loginReducer: any
}

interface LoginState {
    email?: string,
    password?: string
}

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleTextChange = (key: string, value: string) => {
        this.setState({
            [key]: value
        });
    }

    handleLogin = async () => {
        const { logIn, navigation } = this.props;
        const { email, password } = this.state;

        let res = await logIn(email, password);

        if (res === 0)
            navigation.navigate("GlobalMap");
    }

    handleSignup = () => {
        const { navigation } = this.props;

        navigation.navigate("Signup");
    }

    render() {
        const { email, password } = this.state;
        const { loginReducer } = this.props;

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
                    </View>
                    <View style={styles.subContainer}>
                        <ButtonKU
                        title="Connection"
                        onPress={() => this.handleLogin()}
                        />
                        <TouchableOpacity style={styles.textButton} onPress={() => this.handleSignup()}>
                            <Text style={styles.text}>I don't have an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SnackBar visible={loginReducer.error} textMessage={loginReducer.msg}/>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loginReducer: state.loginReducer
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

export default connect(mapStateToProps, { logIn })(Login);