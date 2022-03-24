import React, { useState } from 'react';
import Navbar2 from '../components/Navbar2';
import { Link } from 'react-router-dom';
import { useGoogleAuth } from '../components/GoogleAuthProvider';

function AddRecipeForm() {

    const { googleUser } = useGoogleAuth();
    const tokenID = googleUser.tokenId;

    const [name, setName] = useState('');
    const [ingredientsText, setIngredientsText] = useState([]);
    const [stepsText, setStepsText] = useState([]);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('');

    const [ingredientsCount, setIngredientsCount] = useState(0);

    //##############################  Adding/Deleting more input lists to add more ingredients  ##################################//
    const [ingredients, setIngredients] = useState([<textarea key={ingredientsCount} className="input-style" rows="1" cols="50" value={ingredientsText[0]} onChange={(event) => setIngredientsText( [event.target.value, ...ingredientsText.slice()] )} />]);
    const addIngredient = () => {  
        const num = ingredientsCount + 1;
        setIngredients([...ingredients, <textarea key={ingredientsCount + 1} className="input-style" rows="1" cols="50" value={ingredientsText[num]} onChange={(event) => { 
                                                                                                                                                            let arr1 = ingredientsText;
                                                                                                                                                            arr1[num] = event.target.value;
                                                                                                                                                            setIngredientsText([...arr1]) }}
                                                                                                                                                            />]);
        setIngredientsCount(ingredientsCount + 1);
    }

    const deleteIngredient = () => {
        if (ingredients.length > 1) {
            let arr = ingredients;
            arr.pop();
            setIngredients([...arr]);
            setIngredientsCount(ingredientsCount - 1);
        }
       
    }
    //###################################################################################################################//

    //######################################  Adding/Deleting more input lists to add more steps  ##################################//
    const [stepsCount, setStepsCount] = useState(0);
    const [steps, setSteps] = useState([<textarea key={stepsCount} className="input-style" rows="4" cols="50" value={stepsText[0]} onChange={(event) => setStepsText( [event.target.value, ...stepsText.slice()] )}/>]);
    const addStep = () => {
        const num = stepsCount + 1;
        setSteps([...steps, <textarea key={stepsCount + 1} className="input-style" rows="4" cols="50" value={stepsText[num]} onChange={(event) => { 
                                                                                                                                        let arr1 = stepsText;
                                                                                                                                        arr1[num] = event.target.value;
                                                                                                                                        setStepsText([...arr1]) }}/> ]);
        setStepsCount(stepsCount + 1);
    }

    const deleteStep = () => {
        if (steps.length > 1) {
            let arr = steps;
            arr.pop();
            setSteps([...arr]);
            setStepsCount(stepsCount - 1);
        }
    }
    //###################################################################################################################//

    const addRecipe = async() => {
            fetch(`/api/profile/post`, {
                method: 'post',
                body: JSON.stringify({name, estimatedPrice: price, ingredients: ingredientsText, steps: stepsText, eatingTime: type, tokenID}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setName("");
            setIngredientsText([]);
            setStepsText([]);
            setPrice(0);
            setType("");
    }

    return (
        <div id="add-recipe-form">
            <Navbar2 willContainSearchBar={true}/>
            <h3>Recipe Creation</h3>
            <div id="form">
                <label>
                    Name:
                    <input className="input-style" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </label>
                <label>
                    Ingredients:
                    {ingredients}
                </label>
                <div>
                    <div className="adding-text-area icon-hover" onClick={()=> addIngredient()}></div>
                    <div className="deleting-text-area icon-hover" onClick={()=> deleteIngredient()}></div>
                </div>
                
                <label>
                    Steps:
                    {steps}
                    {/* <textarea className="input-style" rows="4" cols="50" value={stepsText} onChange={(event) => setStepsText(stepsText.push(event.target.value))}/> */}
                </label>
                <div>
                    <div className="adding-text-area icon-hover" onClick={()=> addStep()}></div>
                    <div className="deleting-text-area icon-hover" onClick={()=> deleteStep()}></div>
                </div>
                
                <label>
                    Estimated Price:
                    <input className="input-style" type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)}/>
                </label>
                <label>
                    Type:
                    <select className="input-style" type="text" value={type} onChange={(event) => setType(event.target.value)}>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Breakfast</option>
                        <option>Dessert</option>
                        <option>Snacks</option>
                        <option>Drinks</option>
                    </select>
                </label>
                <Link onClick={addRecipe} to="/Profile"> Add Recipe </Link> 
            </div>
        </div>
    )
    
}

export default AddRecipeForm;