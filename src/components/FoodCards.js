import React from 'react';
import {Link} from 'react-router-dom';

function FoodCards({ id, foodName, estimatedPrice, image, ingredients, steps}) {

    //For the ingredients
    let listedIngredients = "";
    for (let num = 0; num < ingredients.length; num++) {
        if (num < (ingredients.length - 1)) {
            listedIngredients += (ingredients[num] + ", ");
        } else {
            listedIngredients += ingredients[num];
        }
    };

    //For the Steps
    let listedSteps = "";
    for (let num = 0; num < steps.length; num++) {
        if (num < (steps.length - 1)) {
            listedSteps += (`${num + 1}: ` + steps[num] + ". ");
        } else {
            listedSteps += (`${num + 1}: ` + steps[num]);
        }
    }

    return (

        <div id="food-cards">
            <div id="flip-card">
                <div id="card-front">
                    <div id="food-cards-name">
                        <p>{foodName}</p>
                    </div>
                    <div id="food-cards-image">
                        <img src={image} alt="recipe pic"></img>
                    </div>
                    <div id="food-cards-price">
                        <p>{estimatedPrice}</p>
                    </div>
                </div>

                <div id="card-back">
                    <div>
                        <h5>Ingredients</h5>
                        <p>{listedIngredients.substring(0, 30)}...</p>
                    </div>
                    <div>
                        <h5>Steps</h5>
                        <p>{listedSteps.substring(0, 90)}...</p>
                    </div>
                    <Link to={{
                        pathname: `/Recipe/${id}`,
                        aboutProps: {
                            foodName: foodName,
                            estimatedPrice: estimatedPrice,
                            image: image,
                            ingredients: ingredients,
                            steps: steps
                        }
                    }}> View </Link>
                </div>
            </div>
        </div>
    );
}

export default FoodCards;