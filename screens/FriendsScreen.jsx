import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { BACK_URL } from "@env";

// Import styles
import styles from "../styles/FriendsStyles";
import { globalsStyles, GLOBAL_COLOR } from "../styles/globals";

//Import components
import AddBuddy from "../components/AddBuddy";
import LoadingModal from "../components/LoadingModal";
import BuddyBubble from "../components/BuddyBubble";

//Import modules

// Import redux
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/reducers/user";

export default function FriendsScreen({ route, navigation }) {
  // 1. Redux storage
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  // 2. UseEffect, UseState, UseRef

  // Gère l'affichage de la modale
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalSuppVisible, setModalSuppVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [userSelected, setUserSelected] = useState("");
  const [friendSelected, setFriendSelected] = useState("");

  // États pour gérer les données des fetchs
  const [dataUsers, setDataUsers] = useState([]);
  const [dataFriends, setDataFriends] = useState([]);
  const [modifFriend, setModifFriend] = useState(false);

  // États pour gérer les valeurs des champs
  const [textError, setTextError] = useState("");

  // Permet de supprimer le message d'erreur dès que l'utilisateur tape un nouveau texte
  useEffect(() => {
    if (textError) setTextError(null);
  }, [userSelected, friendSelected]);

  // On récupère les données de tous friends du user au chargement de la page
  useEffect(() => {
    (async () => {
      try {
        const fetchFriends = await fetch(`${BACK_URL}/users/friendsList?token=${user.token}`);
        const data = await fetchFriends.json();
        // On traite les données pour l'envoyer au format necessaire à la liste des buddies
        const dataFriendMap = data.friends.map((obj) => {
          return { key: obj.tokenUser, value: `${obj.username} - ${obj.email}`, selected: true };
        });
        setDataFriends(dataFriendMap);
      } catch (error) {
        console.error("Erreur lors de la connexion au serveur :", error);
      }
    })().catch((err) => {
      console.error("Unhandled promise rejection:", err);
    });
  }, [textError]);

  // On récupère les données de tous utilisateurs au chargement de la page
  useEffect(() => {
    (async () => {
      try {
        const fetchUsers = await fetch(`${BACK_URL}/users/list?token=${user.token}`);
        const data = await fetchUsers.json();
        // On traite les données pour l'envoyer au format necessaire à la liste des buddies
        const dataUsersMap = data.users.map((obj) => {
          return { key: obj.tokenUser, value: `${obj.username} - ${obj.email}`, selected: true };
        });
        setDataUsers(dataUsersMap);
      } catch (error) {
        console.error("Erreur lors de la connexion au serveur :", error);
      }
    })().catch((err) => {
      console.error("Unhandled promise rejection:", err);
    });
  }, [textError]);

  // 3. Functions

  // Fonction qui gère l'affichage de la modale des buddies
  const handleModal = () => {
    setModalAddVisible(false);
    setModalSuppVisible(false);
  };
  // Fonction pour masquer le clavier lorsque l'utilisateur appuie en dehors du champ de saisie
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleModifFriend = (boolean) => {
    console.log("handleModifFriend called with:", boolean);
    if (boolean) {
      console.log(userSelected);
      handleAddFriend();
    } else {
      console.log(friendSelected);
      handleSuppFriend();
    }
  };
  // Fonction pour vérifier si le user peut etre renvoyer sur la page de modifications
  const handleAddFriend = async () => {
    console.log("token",user.token);
    console.log("friendSelected", friendSelected);
    try {
      // On envoie la donnée de connexion au backend
      const fetchFriendList = await fetch(`${BACK_URL}/users/updateFriends`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: user.token, tokenFriend: userSelected, modifFriend: true }),
      });
      const data = await fetchFriendList.json();
      console.log("data", data);
      // Si on a result false, on affiche un message à l'utilisateur
      if (!data.result) {
        setModalLoadingVisible(false);
        setModalAddVisible(false);
        setTextError(data.error);
        return;
      }
      dispatch(update({ friends: data.friends }));
      setTextError("réussite");
      setUserSelected("");
      setModalAddVisible(false);
      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);
      // Si on a une erreur au moment du fetch, on renvoie une erreur
      setTextError("Erreur dans l'ajout ou la supression d'un ami");
      console.error("Erreur lors de l'envoi au serveur :", error);
    }
  };

  // Fonction pour vérifier si le user peut etre renvoyer sur la page de modifications
  const handleSuppFriend = async () => {
    try {
      // On envoie la donnée de connexion au backend
      const fetchFriendList = await fetch(`${BACK_URL}/users/updateFriends`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: user.token, tokenFriend: friendSelected, modifFriend: false }),
      });
      const data = await fetchFriendList.json();
      console.log("data", data);
      // Si on a result false, on affiche un message à l'utilisateur
      if (!data.result) {
        setModalLoadingVisible(false);
        setModalSuppVisible(false);
        setTextError(data.error);
        return;
      }
      dispatch(update({ friends: data.friends }));
      setTextError("réussite");
      setFriendSelected("");
      setModalSuppVisible(false);
      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);
      // Si on a une erreur au moment du fetch, on renvoie une erreur
      setTextError("Erreur dans l'ajout ou la supression d'un ami");
      console.error("Erreur lors de l'envoi au serveur :", error);
    }
  };
  return (
    <>
      <StatusBar translucent={false} backgroundColor={GLOBAL_COLOR.PRIMARY} barStyle="light-content" />
      <SafeAreaView style={{ flex: 0, backgroundColor: GLOBAL_COLOR.PRIMARY }} />
      <LoadingModal visible={modalLoadingVisible} />
      <AddBuddy
        modalVisible={modalAddVisible}
        data={dataUsers}
        setBuddiesSelected={setUserSelected}
        buddiesSelected={userSelected}
        handleModif={() => handleModifFriend(true)}
        handleModal={handleModal}
        text={`Voulez-vous ajouter:`}
        textError={textError}
      />
      <AddBuddy
        modalVisible={modalSuppVisible}
        data={dataFriends}
        setBuddiesSelected={setFriendSelected}
        buddiesSelected={friendSelected}
        handleModif={() => handleModifFriend(false)}
        handleModal={handleModal}
        text={`Voulez-vous supprimer:`}
        textError={textError}
      />
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnHome} onPress={() => navigation.navigate("Profil")}>
            <BuddyBubble key={user.tokenUser} size={50} i={0} buddy={user} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Friends</Text>
          <View style={styles.btnHome}></View>
        </View>
        <View style={styles.content}>
          <View style={styles.gestionFriend}>
            <View style={styles.ajoutFriend}>
              <TouchableOpacity style={styles.btnBuddy} onPress={() => setModalAddVisible(!modalAddVisible)}>
                <Text style={styles.buddyText}>Ajouter un ami+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.supprFriend}>
              <TouchableOpacity style={styles.btnBuddy} onPress={() => setModalSuppVisible(!modalSuppVisible)}>
                <Text style={styles.buddyText}>Supprimer un ami-</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewLine}>
            <View style={styles.line}></View>
          </View>
        </View>
        <Text style={styles.textError}>{textError}</Text>
      </SafeAreaView>
    </>
  );
}
