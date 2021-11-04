import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ActivityIndicator } from 'react-native';
import Dialog from 'react-native-popup-dialog';
import SnackBar from 'react-native-snackbar-component';

import { connect } from 'react-redux';
import { getFacility } from '../Actions/facilityActions';

import DataVisualization from '../Component/DataVisualization';
import ButtonKU from '../Component/ButtonKU';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FacilityProps {
    navigation: any,
    route: any,
    getFacility: Function,
    facilityReducer: any,
    userReducer: any
}

interface FacilityState {
    dataVisualization?: boolean,
    loaded?: boolean
}

class Facility extends Component<FacilityProps, FacilityState> {
    constructor(props: FacilityProps) {
        super(props);
        this.state = {
            dataVisualization: false,
            loaded: false
        }
    }

    componentDidMount = () => {
        this.loadFacility();
    }

    loadFacility = async () => {
        const { getFacility, userReducer, route } = this.props;
        const { facilityName } = route.params;

        let res = await getFacility(facilityName, userReducer.token);

        if (res === 0)
            this.setState({loaded: true});
    }

    getStatusColor = (status: string) => {
        switch (status) {
            case "Open": return ("green");
            case "Close": return ("red");
            case "Maintenance": return ("orange");
            default: return ("red");
        }
    }

    dismissPopup = () => {
        this.setState({dataVisualization: false});
        return true;
    }

    handleDataVisualization = () => {
        this.setState({dataVisualization: !this.state.dataVisualization});
    }

    handleBooking = () => {
        const { navigation, facilityReducer } = this.props;

        navigation.navigate("Booking", {
            facility: facilityReducer.facility.name,
            booked: facilityReducer.facility.booked
        });
    }

    render() {
        const { facilityReducer } = this.props;
        const { loaded } = this.state;

        return (
            loaded ? <SafeAreaView style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: facilityReducer.facility.image}}
                />
                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{facilityReducer.facility.name}</Text>
                        <View style={styles.statusContainer}>
                            <View style={{...styles.circle, backgroundColor: this.getStatusColor(facilityReducer.facility.status)}}/>
                            <Text style={styles.status}>{facilityReducer.facility.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{facilityReducer.facility.description}</Text>
                </View>
                <View style={styles.subContainer}>
                    <ButtonKU
                        title="Data Visualization"
                        onPress={() => this.handleDataVisualization()}
                        buttonStyle={{marginBottom: 18}}
                    />
                    {facilityReducer.facility.bookable &&
                    <ButtonKU
                        title="Booking"
                        onPress={() => this.handleBooking()}
                    />}
                </View>
                <Dialog width={0.8} height={0.8}
                    visible={this.state.dataVisualization}
                    onTouchOutside={() => this.dismissPopup()}
                    onHardwareBackPress={() => this.dismissPopup()}>
                    <DataVisualization name={facilityReducer.facility.name}/>
                </Dialog>
            </SafeAreaView>
            : <SafeAreaView style={styles.container}>
                <View style={styles.subContainer}>
                    <ActivityIndicator size="large" color="#A72A1E"/>
                </View>
                <SnackBar visible={facilityReducer.error} textMessage={facilityReducer.msg}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        facilityReducer: state.facilityReducer,
        userReducer: state.userReducer
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#CDCDCD'
    },
    image: {
        display: "flex",
        flex: 1.25,
        width: '100%',
        height: '100%'
    },
    textContainer: {
        display: 'flex',
        flex: 1.5,
        height: '100%',
        width: '100%',
        justifyContent: 'space-around',
    },
    subContainer: {
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        display: "flex",
        alignSelf: "flex-end",
        marginRight: "10%",
    },
    statusContainer: {
        display: "flex",
        alignSelf: "flex-end",
        alignItems: "center",
        flexDirection: 'row'
    },
    title: {
        marginBottom: 15,
        fontWeight: "bold",
        fontSize: 22
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
    status: {
        marginLeft: 8,
        fontStyle: "italic",
        fontSize: 18
    },
    description: {
        marginHorizontal: '5%'
    }

});

export default connect(mapStateToProps, { getFacility })(Facility);