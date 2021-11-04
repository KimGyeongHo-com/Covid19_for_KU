import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Autocomplete from 'react-native-autocomplete-input';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SnackBar from 'react-native-snackbar-component';

import { connect } from 'react-redux';
import { getFacilities } from '../Actions/facilitiesAction';

const screenHeight = Dimensions.get('window').height

interface GlobalProps {
	navigation: any,
	getFacilities: Function,
    facilitiesReducer: any,
    userReducer: any
}

interface GlobalState {
	facilityName?: string,
	loaded?: boolean
}

class GlobalMap extends Component<GlobalProps, GlobalState> {
    constructor(props: GlobalProps) {
        super(props);
        this.state = {
			facilityName: "",
			loaded: false
        };
	}
	
	componentDidMount = () => {
        this.loadFacilities();
    }

    loadFacilities = async () => {
        const { getFacilities, userReducer } = this.props;

        let res = await getFacilities(userReducer.token);

        if (res === 0) {
			this.setState({loaded: true});
		}
    }

	filterData = (data, facilityName) => {
		if (facilityName === '')
			return [];
		var find = data.filter((item) => {
			if (item.name.toLocaleLowerCase().search(facilityName.toLocaleLowerCase()) !== -1)
				 return true;
			return false;
		});

		return find.map((item) => {
			return (item.name);
		})
	}

	handleTextChange = (text) => {
		this.setState({facilityName: text});
	}

	handleNews = () => {
		const { navigation } = this.props;

        navigation.navigate("News");
	}

	handleFacility = () => {
		const { navigation, facilitiesReducer } = this.props;
		const { facilityName } = this.state;

        navigation.navigate("Facility", {
            facilityName: facilityName,
        });
	}

	render() {
		const { facilityName, loaded } = this.state;
		const { facilitiesReducer } = this.props;
		const data = this.filterData(facilitiesReducer.facilities, facilityName);

		return (
			loaded ? <SafeAreaView style={styles.container}>
				<View style={styles.search}>
					<TouchableOpacity onPress={() => this.handleNews()}>
						<Image style={styles.logo} source={require('../../assets/news.png')}/>
					</TouchableOpacity>
					<View style={styles.textInput}>
						<Autocomplete containerStyle={styles.autocompleteContainer}
							listContainerStyle={styles.listInput}
							data={data}
							defaultValue={facilityName}
							placeholder='Facility name'
							onChangeText={(text) => this.handleTextChange(text)}
							renderItem={({ item, i }) => (
								<TouchableOpacity key={i} onPress={() => this.handleTextChange(item)} style={styles.textAutocomplete}>
									<Text style={styles.text}>{item}</Text>
								</TouchableOpacity>
							)}
						/>
						<TouchableOpacity onPress={() => this.handleFacility()}>
							<Image style={styles.logo} source={require('../../assets/search.png')}/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.map}>
					<ScrollView horizontal={true}>
						<Image style={styles.mapImage} source={require('../../assets/map.jpg')}/>
					</ScrollView>
				</View>
			</SafeAreaView> : <SafeAreaView style={styles.container}>
                <View style={styles.subContainer}>
                    <ActivityIndicator size="large" color="#A72A1E"/>
                </View>
                <SnackBar visible={facilitiesReducer.error} textMessage={facilitiesReducer.msg}/>
            </SafeAreaView>
		)
	}
}

const mapStateToProps = (state: any) => {
    return {
        facilitiesReducer: state.facilitiesReducer,
        userReducer: state.userReducer
    }
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		width: '100%',
		height: '100%',
	},
	subContainer: {
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
	search: {
		display: 'flex',
		width: '100%',
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#A72A1E',
		zIndex: 1
	},
	logo: {
		width: 30,
		height: 30,
		resizeMode: 'contain'
	},
	textInput: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: "center",
		height: 60,
		width: '70%',
	},
	listInput: {
		display: 'flex',
		width: '100%',
		position: "absolute",
		top: 42,
		right: 0,
		left: 0,
	},
	autocompleteContainer: {
		display: "flex",
		width: "100%",
		marginRight: 15,
	},
	textAutocomplete: {
		display: "flex",
		width: "100%",
		justifyContent: "center",
		borderBottomWidth: 0.5,
		borderColor: "lightgrey",
		height: 30,
	},
	text: {
		marginLeft: 10
	},
	map: {
		display: 'flex',
		width: '100%',
		height: '100%',
		backgroundColor: '#CDCDCD'
	},
	mapImage: {
		display: 'flex',
		height: screenHeight - 80,
		width: 1958 * (screenHeight - 80) / 870,
		resizeMode: 'cover'
	}
});

export default connect(mapStateToProps, { getFacilities })(GlobalMap);
