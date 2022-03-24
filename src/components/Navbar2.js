import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


function Navbar2(props) {

    const [allRecipe, setAllRecipe] = useState([]);

    useEffect (() => {
        let allRec = [];
        Object.entries(props).map(([key, value]) => 
            allRec.push(value.name)
        )
        setAllRecipe(allRec);
    }, [props]);

    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState("");


    const onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 2) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = allRecipe.sort().filter(v => regex.test(v));
            suggestions = [...new Set(suggestions)]; //deletes duplicates
        }
        setSuggestions(suggestions);
        setText(value);
    };

    const suggestionSelected = (value) => {
        setText(value);
        setSuggestions([]);
    }

    const [renderSuggestions, setRenderSuggestions] = useState(<div></div>);

    useEffect (() => {
        const renderSuggestion = () => {
            if (suggestions.length === 0) {
                return null;
            }
            return (
                //Here in suggestions are all the words that start with the inputed letters
                suggestions.map((recipes, key) => <div onClick={() => suggestionSelected(recipes)} key={key} className="dropdown-options" value={recipes}>{recipes}</div>)
            )
        };
        setRenderSuggestions(renderSuggestion);
    }, [suggestions]);

    const showSearchedCards = async () => {
        const result = await fetch(`/api/recipes/${text}`);
        const body = await result.json();
        props.setRecipeInfo(body);
        props.setCount(body.length);
        if (!text) {
            props.setSearch("Current Recipes");
        } else {
            props.setSearch(text);
        }
    }
    if (props.willContainSearchBar) {
        return (
            <div id="navbar2">
                <h1>College Kitchen</h1>
                
                <div id="home-chef-container">
                    <Link id="home" to="/Home" className="icon-hover"> </Link>
                    <Link id="chef" className="icon-hover" to={{
                        pathname: `/Profile`,
                        aboutProps: {
                            setRecipeInfo: props.setRecipeInfo
                        }
                    }}> </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div id="navbar2">
                <h1>College Kitchen</h1>
    
                <div id="search-bar">
                    <div>
                        <input value={text} onChange={onTextChanged} type="text" placeholder="Search.."></input>
                        <div id="search-dropdown">
                            {renderSuggestions}
                        </div>
                    </div>
                    <button type="submit" onClick={showSearchedCards}></button>
                </div>
                
                <div id="home-chef-container">
                    <Link id="home" to="/Home" className="icon-hover"> </Link>
                    <Link id="chef" className="icon-hover" to={{
                        pathname: `/Profile`,
                        aboutProps: {
                            setRecipeInfo: props.setRecipeInfo
                        }
                    }}> </Link>
                </div>
            </div>
        );

    }

    
}

export default Navbar2;