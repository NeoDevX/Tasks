import React, { Component } from "react";

export default class SearchItem extends Component {
    
    state = {
        searchWord: "" 
    };
    
    onSearchChange = (event) => {
        const searchWord = event.target.value;
        this.setState({ searchWord });
        this.props.onSearchChange(searchWord);
    } 

    render() {
        return (
            <input className="search" 
                placeholder="type to search"
                value={ this.state.searchWord }
                onChange={ this.onSearchChange } 
            />
        );
    }
}
