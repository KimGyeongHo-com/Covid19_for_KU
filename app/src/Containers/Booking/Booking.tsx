import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton
} from 'react-native-modals';

import { Dimensions } from 'react-native';
import EventCalendar from 'react-native-events-calendar'
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { IState } from './IState';
import { connect } from 'react-redux';
import { bookFacility } from '../../Actions/bookingAction';

let { width } = Dimensions.get('window');


class Booking extends Component<NavigationInjectedProps, IState> {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            visible: false,
            timePicker: {
                visible: false,
                picking: "",
                value: new Date(0)
            },
            booking: {
                date: "",
                startTime: "01:00:00",
                endTime: "02:00:00",
                disabled: false
            }
        };
    }

    public componentDidMount() {
        this.setState({events: (this.props as any).route.params.booked});
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topbar}>
                <TouchableOpacity
                    style={styles.topbar_content}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/back_arrow.png')}
                    />
                    <Text style={styles.topbar_text}>Go back</Text>
                </TouchableOpacity>
                </View>
                <EventCalendar
                    eventTapped={this.onEventClick.bind(this)}
                    onPressHour={this.onScheduleClick.bind(this)}
                    events={this.state.events}
                    width={width}
                    initDate={this.createDateFromObject(new Date(Date.now()))}
                    upperCaseHeader
                    uppercase
                    scrollToFirst={true}
                    size={14}
                    />
                <Modal
                    width={0.9}
                    visible={this.state.visible}
                    rounded
                    useNativeDriver={true}
                    actionsBordered
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                    modalTitle={
                        <ModalTitle
                            title="Book a facility"
                            align="center"
                            style={styles.text}
                        />
                    }
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="Cancel"
                                bordered
                                onPress={() => {
                                    this.setState({ visible: false });
                                }}
                                key="button-1"
                            />
                            <ModalButton
                                disabled={this.state.booking.disabled}
                                text="Book"
                                bordered
                                onPress={() => this.handleBookButton()}
                                key="button-2"
                            />
                        </ModalFooter>
                    }
                >
                    <ModalContent
                        style={{ backgroundColor: '#fff' }}
                    >
                        <Text style={styles.text}>The {this.state.booking.date}</Text>
                        <TouchableOpacity
                            onPress={() => this.handleStartDateButton()}
                        >
                        <Text style={styles.text}>From: {this.state.booking.startTime}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.handleEndDateButton()}
                        >
                        <Text style={styles.text}>To: {this.state.booking.endTime}</Text>
                        </TouchableOpacity>
                        {this.state.timePicker.visible && <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.timePicker.value}
                            mode={"time"}
                            is24Hour={true}
                            display="default"
                            minuteInterval={30}
                            onChange={this.onChange.bind(this)}
                        />}
                    </ModalContent>
                </Modal>
            </SafeAreaView>
        );
    }

    /**
     * Fired when a click is detect on an hour on the calendar
     * @param data
     */
    private onScheduleClick(data) {
        const date = new Date(data.date);
        const formattedDate = this.createDate(date.getFullYear(), date.getMonth() + 1, date.getDate());

        this.setState({
            booking: {
                date: formattedDate,
                startTime: this.createTime(data.hour, data.minute),
                endTime: this.createTime(data.hour + 1, data.minute),
                disabled: false
            },
            visible: true
        });
    }

    /**
     * Fired when a new time has been chosen via the time selector
     * @param event
     * @param selectedDate
     */
    private onChange(event, selectedDate) {
        const date = new Date(selectedDate);
        const formattedTime = this.createTime(date.getHours(), date.getMinutes());

        this.state.timePicker.value.setHours(date.getHours());
        this.state.timePicker.value.setMinutes(date.getMinutes());

        const newStartTime = (this.state.timePicker.picking === "start") ? formattedTime : this.state.booking.startTime;
        const newEndTime = (this.state.timePicker.picking === "end") ? formattedTime : this.state.booking.endTime;

        this.setState({ booking: {
            date: this.state.booking.date,
            startTime: newStartTime,
            endTime: newEndTime,
            disabled: (this.compareTime(newStartTime, newEndTime) ? true : false)
        }});
    };

    /**
     * Fired when the user clicks on the book button
     */
    private handleBookButton() {
        const { bookFacility } = this.props as any;
        const fullStartDate = `${this.state.booking.date} ${this.state.booking.startTime}`;
        const fullEndDate = `${this.state.booking.date} ${this.state.booking.endTime}`;

        this.setState({ visible: false });
        bookFacility(
            (this.props as any).route.params.facility,
            fullStartDate.slice(0, -3),
            fullEndDate.slice(0, -3),
            (this.props as any).userReducer.token
        )
        .then((data: number) => {
            this.setState({ events: [...this.state.events, {
                start: fullStartDate,
                end: fullEndDate,
                title: (this.props as any).route.params.facility,
                summary: ''
            }]});
        })
        .catch((err) => {
            console.error("Error");
            console.log(err);
        });
    }

    /**
     * Fired when the user click on the start date
     */
    private handleStartDateButton() {
        const date = new Date(0);
        date.setHours(parseInt(this.state.booking.startTime.split(":")[0]), 10);
        date.setMinutes(parseInt(this.state.booking.startTime.split(":")[1]), 10);

        this.setState({ timePicker: {
            value: date,
            picking: "start",
            visible: !this.state.timePicker.visible
        }});
    }

    /**
     * Fired when the user click on the end date
     */
    private handleEndDateButton() {
        const date = new Date(0);
        date.setHours(parseInt(this.state.booking.endTime.split(":")[0]), 10);
        date.setMinutes(parseInt(this.state.booking.endTime.split(":")[1]), 10);

        this.setState({ timePicker: {
            value: date,
            picking: "end",
            visible: !this.state.timePicker.visible
        }});
    }

    /**
     * Fired when a click is detected on an event
     * @param event
     */
    private onEventClick(event) {
        alert(JSON.stringify(event));
    }

    /**
     * Create a formatted date
     * @param year in number
     * @param month in number
     * @param day in number
     */
    private createDate(year: number, month: number, day: number) {
        let result = `${year}-`;

        result += (month < 10) ? `0${month}-` : `${month}-`;
        result += (day < 10) ? `0${day}` : `${day}`;
        return result;
    }

    /**
     * Create a formatted date from date object
     * @param date date object
     */
    private createDateFromObject(date: Date) {
        return this.createDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    /**
     * Create a formatted time
     * @param hours in number
     * @param minutes in number
     */
    private createTime(hours: number, minutes: number) {
        let result = ``;

        result += (hours < 10) ? `0${hours}:` : `${hours}:`;
        result += (minutes < 10) ? `0${minutes}:00` : `${minutes}:00`;
        return result;
    }

    /**
     * Check if timeA is later than timeB
     * @param timeA formatted time
     * @param timeB formatted time
     */
    private compareTime(timeA: string, timeB: string) {
        if (timeA === timeB)
            return true;
        const timeAArray = timeA.split(":");
        const timeBArray = timeB.split(":");

        if (parseInt(timeAArray[0], 10) > parseInt(timeBArray[0], 10))
            return true;
        if (parseInt(timeAArray[0], 10) === parseInt(timeBArray[0], 10)
            && parseInt(timeAArray[1], 10) > parseInt(timeBArray[1], 10))
            return true;
        return false;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
      fontSize: 20
    },
    topbar: {
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 10,
        paddingRight: 10
    },
    logo: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    topbar_content: {
        flexDirection: "row"
    },
    topbar_text: {
        fontSize: 17
    }
});


const mapStateToProps = (state: any) => {
    return {
        userReducer: state.userReducer
    }
}

export default withNavigation(connect(mapStateToProps, {bookFacility})(Booking));
