import React from 'react';

function RecomendationCard({ recomendation, setRecipeInfo, setCount }) {

    const showPickedCards = async () => {
        const result = await fetch(`/api/recipes/type/${recomendation}`);
        const body = await result.json();
        setRecipeInfo(body);
        setCount(body.length);
    }

    return (
        <div id="recomendation-cards" onClick={() => showPickedCards()}>
            <p>{ recomendation }</p>
        </div>
    );
}

export default RecomendationCard;