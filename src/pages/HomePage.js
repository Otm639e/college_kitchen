import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/Navbar2';
import RecomendationCard from '../components/RecomendationCard';
import FoodCards from '../components/FoodCards';
//import Eggs from '../imgs/eggs.jpeg';
import Footer2 from '../components/Footer2';
import { useGoogleAuth } from '../components/GoogleAuthProvider';





// ############################## Important Note!!!!! ####################################################
// ###### Maybe we can do the stuff we just need once (get methods for all recipes) in the App.js!!! ######
// #######################################################################################################




function HomePage() {

    const { googleUser } = useGoogleAuth();
    const tokenID = googleUser.tokenId;

    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('Current Recipes');
    const [recipes, setRecipeInfo] = useState([]);
    const [allRecipes, setAllRecipes] = useState();



    //Trial of sending tokenId to backend
    useEffect(() => {
        if (tokenID !== undefined) {
            const sendIdToken = async () => {
                fetch(`/api/tokensignin`, {
                    method: 'POST',
                    body: JSON.stringify({token: tokenID, year: new Date().getUTCFullYear()}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
            sendIdToken();
        }
    }, [tokenID]);

    //Get all recipes
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('/api/recipes');
            const body = await result.json();
            setAllRecipes(body);
            setRecipeInfo(body);
            setCount(body.length);
        }
        fetchData();
    }, []);

    const [listCards, setListCards] = useState(<div></div>);

    useEffect(() => {
        let cards;
        if (recipes.length < 1) {
            cards = <p>No Results</p>;
        } else {
            cards = recipes.map((recipe) =>
                <FoodCards key={recipe._id} id={recipe._id} foodName={recipe.name} estimatedPrice={recipe.estimatedPrice}  ingredients={recipe.ingredients} steps={recipe.steps}/>
            );
        }
        setListCards(cards);
        

    }, [recipes]);
    

    return (
        <div id="homepage">
            <Navbar2 {...allRecipes} setRecipeInfo={setRecipeInfo} setCount={setCount} setSearch={setSearch}/>
            <div id="search-info">
                <h5>{count} recipes found for "{search}"</h5>
                <p>See Also:</p>
            </div>
            <div id="extra-eating-options">
                <RecomendationCard recomendation="Dinner" setRecipeInfo={setRecipeInfo} setCount={setCount}/>
                <RecomendationCard recomendation="Lunch" setRecipeInfo={setRecipeInfo} setCount={setCount}/>
                <RecomendationCard recomendation="Breakfast" setRecipeInfo={setRecipeInfo} setCount={setCount}/>
                <RecomendationCard recomendation="Dessert" setRecipeInfo={setRecipeInfo} setCount={setCount}/>
                <RecomendationCard recomendation="Snacks" setRecipeInfo={setRecipeInfo} setCount={setCount}/>
                <RecomendationCard recomendation="Drinks" setRecipeInfo={setRecipeInfo} setCount={setCount}/>
            </div>
            <div id="food-cards-container">
                {listCards}
            </div>
            <Footer2/>
        </div>
    );
}

export default HomePage;