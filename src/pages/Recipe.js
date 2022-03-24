import React, {useEffect, useState} from 'react';
import Navbar2 from '../components/Navbar2';
import Footer2 from '../components/Footer2';
import { useParams } from "react-router-dom";

function Recipe() {

    let { id } = useParams();
    console.log(id);

    const [recipe, setRecipe] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/recipes/id/${id}`);
            const body = await result.json();
            setRecipe(body);
        }
        fetchData();
    }, [id]);

    if (!(recipe === undefined)) {
        let listedIngredients = "";
        let ing = recipe.ingredients;
        for (let num = 0; num < ing.length; num++) {
            if (num < (ing.length - 1)) {
                listedIngredients += (`${num+1}. ` + ing[num] + ", ");
            } else {
                listedIngredients += (`${num+1}. ` + ing[num]);
            }
        };

        let steps = recipe.steps;

        let listedSteps = steps.map((step, index) =>
            <p key={index}>{index+1}: {step}</p>
        );
        
        return (
            <div id="recipe-page">
                <Navbar2 willContainSearchBar={true}/>
                <div id="recipe-info">
                    <img src={""} alt="recipe pic"></img>
                    <div>
                        <h5>Name:</h5>
                        <p>{recipe.foodName}</p>
                        <h5>Ingredients:</h5>
                        <p>{listedIngredients}</p>
                        <h5>Steps:</h5>
                        {listedSteps}
                        <h5>Estimated Price:</h5>
                        <p>{recipe.estimatedPrice}</p>
                    </div>
                    <Footer2/>
                </div>
                
            </div>
        );
    } else {
        return (
            <div id="recipe-page">
                <Navbar2 willContainSearchBar={true}/>
                <div id="recipe-info">
                    <Footer2/>
                </div>
            </div>

        )
    }
    

    
}

export default Recipe;