var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Text, View } from 'react-native';
class Movie {
    constructor(poster_path) {
        this.poster_path = poster_path;
    }
    getPath() {
        return this.poster_path;
    }
}
class App extends Component {
    constructor(props) {
        super(props);
    }
    setPosterPath(item) {
        this.state.poster = `https://image.tmdb.org/t/p/w185${item.getPath()}`;
    }
    getPosterPath() {
        return this.state.poster;
    }
    componentDidMount() {
        this.searchMovies('Star wars');
    }
    onPress() {
        this.searchMovies(this.state.text);
    }
    searchMovies(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://api.themoviedb.org/3/search/movie?api_key=47a7085127ae49a25727d14a6a229052&language=en-US&query=' +
                searchTerm);
            const json = yield response.json();
            this.setState({ data: json.results });
            return json;
        });
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, null, "Hello")));
    }
}
export default App;
//# sourceMappingURL=App.js.map