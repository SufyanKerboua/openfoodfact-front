import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import './Autocomplete.css'

function Autocomplete(props) {
    const {
        placeHolder,
        filterSuggestions,
        displaySuggestionInList,
        displaySuggestionInInput,
        getCurrentSuggestion
    } = props

    // The active selection's index
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    // The suggestions list that match the user's input
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // Whether or not the suggestion list is shown
    const [showSuggestions, setShowSuggestions] = useState(false);
    // What the user has entered
    const [userInput, setUserInput] = useState('');
    // Which Element user has selected
    const [suggestionSelected, setSuggestionSelected] = useState(null);

    const [suggestionsListComponent, setSuggestionsListComponent] = useState(null);

    const onChange = e => {
        setFilteredSuggestions(filterSuggestions(e.currentTarget.value));
        setActiveSuggestion(0);
        setShowSuggestions(true);
        setUserInput(e.currentTarget.value);
        setSuggestionSelected(null);
    };

    const onClick = e => {
        const indexSugg = filteredSuggestions.findIndex(sugg => sugg.name === e.currentTarget.innerText);
        setActiveSuggestion(indexSugg);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setSuggestionSelected(filteredSuggestions[indexSugg]);
    };

    const onKeyDown = e => {
        // User pressed the enter key
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setSuggestionSelected(filteredSuggestions[activeSuggestion]);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                setActiveSuggestion(filteredSuggestions.length - 1);
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                setActiveSuggestion(0);
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };

    useEffect(() => {
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                setSuggestionsListComponent(
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            const data = displaySuggestionInList(suggestion);
                            if (index === activeSuggestion)
                                className = "suggestion-active";
                            return (
                                <li className={className} key={suggestion+index} onClick={onClick}>
                                    {data}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                setSuggestionsListComponent(
                    <div className="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        } else {
            setSuggestionsListComponent(null);
        }
    }, [userInput, activeSuggestion, showSuggestions]);


    useEffect(() => {
        if (suggestionSelected) {
            getCurrentSuggestion(suggestionSelected);
        }
    }, [suggestionSelected]);

    return (
        <Fragment>
            <div className='autocomplete-container-'>
                <input
                    className='autocomplete-input'
                    type="text"
                    placeholder={placeHolder}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={suggestionSelected ? displaySuggestionInInput(suggestionSelected) : userInput}
                />
                <div className='autocomplete-suggestions-container--open-'>
                    {suggestionsListComponent}
                </div>
            </div>
        </Fragment>
    );
}

Autocomplete.propTypes = {
    placeHolder: PropTypes.instanceOf(String),
    suggestions: PropTypes.instanceOf(Array),
    filterSuggestions: PropTypes.instanceOf(Function),
    displaySuggestionInList: PropTypes.instanceOf(Function),
    displaySuggestionInInput: PropTypes.instanceOf(Function),
    getCurrentSuggestion: PropTypes.instanceOf(Function)
};

Autocomplete.defaultProps = {
    placeHolder: 'Input to replace',
    suggestions: [],
    filterSuggestions: value => {
        return this.suggestions.filter(suggestion =>
            suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
    },
    displaySuggestionInList: suggestion => suggestion,
    displaySuggestionInInput: suggestion => suggestion,
    getCurrentSuggestion: suggestion => { return null }
};

export default Autocomplete;
