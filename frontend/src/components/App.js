import React, { useEffect, useCallback, useState } from 'react';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupWithForm } from './PopupWithForm';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import authApi from '../utils/AuthApi';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipSucces, setIsInfoTooltipSucces] = React.useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState("");
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick() {
    setIsDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSuccessPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    if (!isLiked) {
      api.like(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => c._id === card._id ? newCard : c)
          );
        })
        .catch((err) => console.log(err));
    } else {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => c._id === card._id ? newCard : c)
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id === card._id ? "" : newCard);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.editUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => { setIsLoading(false) });
  }

  function handleRegister(email, password) {
    setIsLoading(true);
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setIsInfoTooltipSucces(true);
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipSucces(false);
        console.log(err);
      })
      .finally(() => {
        setIsSuccessPopupOpen(true);
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setUserEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipSucces(false);
        setIsSuccessPopupOpen(true);
        console.log(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setUserEmail(data.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate])

  useEffect(() => {
    handleTokenCheck();
    isLoggedIn && 
    Promise.all([api.getCurrentUser(), api.getCards()])
    .then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    })
    .catch((err) => console.log(err));
  }, [isLoggedIn, handleTokenCheck])

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setIsLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={handleSignOut} userEmail={userEmail} />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path='/sign-up' element={<Register onRegister={handleRegister} isLoggedIn={isLoggedIn} isLoading={isLoading} />} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} isLoading={isLoading} />} />
          <Route path='/' element={isLoggedIn ? <NavLink to='/' /> : <NavLink to='/sign-in' />} />
          <Route path='*' element={<NavLink to='/' />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateUser}
        />
        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <PopupWithForm
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          title={"Вы уверены?"}
          buttonText={"Да"}
          name={"delete"}
        />
        <ImagePopup
          isOpen={selectedCard}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name={"success"}
          onClose={closeAllPopups}
          isOpen={isSuccessPopupOpen}
          isSuccess={isInfoTooltipSucces}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
