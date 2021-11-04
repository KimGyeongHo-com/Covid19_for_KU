import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Surface } from 'react-native-paper';
import SnackBar from 'react-native-snackbar-component';

import { connect } from 'react-redux';
import { getNews } from '../Actions/newsActions';

import NewsPaper from '../Component/NewsPaper'; 

interface NewsProps {
    navigation: any,
    getNews: Function,
    newsReducer: any,
    userReducer: any
}

interface NewsState {
    loaded?: boolean
}

class News extends Component<NewsProps, NewsState> {
    constructor(props: NewsProps) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount = () => {
        this.loadNews();
    }

    loadNews = async () => {
        const { getNews, userReducer } = this.props;

        let res = await getNews(userReducer.token);

        if (res === 0)
            this.setState({loaded: true});
    }

    render() {
        const { loaded } = this.state;
        const { newsReducer } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <Surface style={styles.head}>
                    <Text style={styles.title}>News</Text>
                </Surface>
                {loaded ? <ScrollView style={styles.board}>
                    {newsReducer.news.map((value: any, index: number) => {
                        return <NewsPaper title={value.title} date={value.date_created} description={value.description} key={index}/>
                    })}
                </ScrollView>
                : <View style={styles.subContainer}>
                    <ActivityIndicator size="large" color="#A72A1E"/>
                </View>}
                <SnackBar visible={newsReducer.error} textMessage={newsReducer.msg}/>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        newsReducer: state.newsReducer,
        userReducer: state.userReducer
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: "space-around",
        backgroundColor: "#CDCDCD"
    },
    subContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    head: {
        display: 'flex',
        width: '100%',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#A72A1E',
        elevation: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#FFFFFF",
    },
    board: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#CDCDCD'
    }
});

export default connect(mapStateToProps, { getNews })(News);