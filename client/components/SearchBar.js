import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { setSearchQuery, applySearch, setSuggestions } from '../store';
import Autosuggest from 'react-autosuggest';

// my list to autosuggest is this.props.allProducts

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);

    }

    handleSearch(event) {
        // when button is click, form is submitted and search is applied based off of the state
        event.preventDefault();
        // event.target is the <form> element, .searchBar is the name of the <input>, .value is what is typed in the search-bar
        const query = event.target.searchBar.value;
        this.props.history.push(`/products?query=${query}`);
        this.props.dispatchApplySearch();
    }

    handleSearchChange(event, { newValue }) {
        // anytime the user types anything, the state is updated with that search query
        const query = newValue; // Handle some weird Autosuggest behavior because they use this function differently. newValue needs to be named the same because it's the key in the object autosuggest passes in. event.target is the suggestion div so we can't pull the value off of it(see bottom)
        this.props.dispatchSearchQuery(query);
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.allProducts.filter(product => {
            return product.name.toLowerCase().includes(inputValue)
        });
    }
    // this function determines what the autosuggestions will be
    onSuggestionsFetchRequested({ value }) {
        const suggestions = this.getSuggestions(value);
        this.props.dispatchSetSuggestions(suggestions);
    }

    onSuggestionsClearRequested() {
        this.props.dispatchSetSuggestions([]);
    }

    // when result is clicked, send user to singleproduct page of that product
    onSuggestionSelected(event, { suggestion }) {
        this.props.dispatchSearchQuery('');
        this.props.history.push(`/products/${suggestion.id}`);
    }

    render() {
        const value = this.props.searchQuery; // ? this.props.searchQuery : '';
        const suggestions = this.props.searchSuggestions;

        const inputProps = {
            placeholder: ' "pothos" ',
            value: value,
            onChange: this.handleSearchChange,
            name: 'searchBar'
        };

        const { isLoggedIn, isAdmin } = this.props
        return (
            <div id="whole-search-bar">
                <div id="search-bar-form">
                    <form onSubmit={this.handleSearch}>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} //'this' bc inside component
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            onSuggestionSelected={this.onSuggestionSelected}
                        />
                    </form>
                </div>
                <div>
                    <button id="search-bar-button" type="submit" form="search-form">Search</button>
                </div>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        searchQuery: state.product.searchQuery,
        allProducts: state.product.allProducts,
        searchSuggestions: state.product.searchSuggestions
    }
}

const mapDispatch = (dispatch) => {
    return {
        dispatchSearchQuery(search) {
            dispatch(setSearchQuery(search));
        },
        dispatchApplySearch() {
            dispatch(applySearch());
        },
        dispatchSetSuggestions(suggestions) {
            dispatch(setSuggestions(suggestions));
        }
    }
}

// aux functions

const getSuggestionValue = suggestion => {
    return suggestion.name;
};

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);


export default withRouter(connect(mapState, mapDispatch)(SearchBar));
