import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { DialogContent } from 'react-native-popup-dialog';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const chartConfig = {
    backgroundColor: "CDCDCD",
    backgroundGradientFrom: "#CDCDCD",
    backgroundGradientTo: "#CDCDCD",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
};

interface DataVisualizationProps {
    name?: string
}

class DataVisualization extends Component<DataVisualizationProps> {

    render() {
        const data = {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [
              {
                data: [15, 20, 25, 23, 14],
                color: (opacity = 1) => `rgba(166, 41, 31, ${opacity})`,
                strokeWidth: 2
              }
            ],
            legend: ["100 people"]
        };

        return (
            <DialogContent style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Frequentation of {this.props.name}</Text>
                </View>
                <LineChart data={data}
                width={screenWidth * 0.8}
                height={screenHeight * 0.5}
                chartConfig={chartConfig}/>
            </DialogContent>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    titleContainer: {
        display: 'flex',
        width: screenWidth * 0.8,
        height: screenHeight * 0.24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CDCDCD'
    },
    title: {
        display: 'flex',
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 22
    },
    graph: {
        display: 'flex',
        flex: 1,
    }
});

export default DataVisualization;