import React, { useState, useEffect } from 'react';
import FoodCards from '../components/FoodCards';
import Navbar2 from '../components/Navbar2';
import { useGoogleAuth } from '../components/GoogleAuthProvider';
import { Link } from 'react-router-dom';
import ProfilePersonolize from '../components/ProfilePersonolize';

function ProfilePage() {

    const { googleUser } = useGoogleAuth();
    const tokenID = googleUser.tokenId;
    const [recipes, setRecipeInfo] = useState([]);
    const [num, setNum] = useState(0);
    const [listCards, setListCards] = useState(<div></div>);
    const [userInformation, setUserInformation] = useState('');
    const [yearJoined, setYearJoined] = useState('2021');
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [name, setName] = useState();

    

    //Get all profile info
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/profile/info/${tokenID}`);
            const body = await result.json();
            setUserInformation(body.bioInfo);
            setYearJoined(body.yearJoined);
            setName(body.name);
        }
        fetchData();
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/userID/${tokenID}`);
            const body = await result.json();
            setRecipeInfo(body);
            setNum(body.length);
        }
        fetchData();
    }, [tokenID]);

    useEffect(() => {
        let cards;
        if (recipes.length < 1) {
            cards = <p>No Resipes</p>;
        } else {
            cards = recipes.map((recipe) =>
                <FoodCards key={recipe._id} id={recipe._id} foodName={recipe.name} estimatedPrice={recipe.estimatedPrice}  ingredients={recipe.ingredients} steps={recipe.steps}/>
            );
        }
        setListCards(cards);
        

    }, [recipes]);

    useEffect(() => {
        if (showProfileSettings) {
            setSettingsIcon(<ProfilePersonolize setShowProfileSettings={setShowProfileSettings}/>);
        } else {
            setSettingsIcon(<div id="setting-icon" className="icon-hover" onClick={() => setShowProfileSettings(true)}></div>);
        }
        
    }, [showProfileSettings]);

    const [settingsIcon, setSettingsIcon] = useState();



    return (
        <div id="profile-page">
            <Navbar2 willContainSearchBar={true}/>
            <div id="profile-info">
                <div id="div-container1">
                    <h1>{name}</h1>
                    {settingsIcon}
                </div>
                <p>{userInformation}</p>
                <a href="https://youtube.com"> Visit Website </a>
            </div>
            <div id="profile-contributed-cards">
                <div id="div-container2">
                    <p>Contributed {num} recipes since {yearJoined}</p>
                    <Link id="add-icon" className="icon-hover" to="/Recipe-Creation"> </Link> 
                </div>
                <div id="food-cards-container">
                    {listCards}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
