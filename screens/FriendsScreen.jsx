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

export default function FriendsScreen({ route, navigation }) {
  // 1. Redux storage
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  // 2. UseEffect, UseState, UseRef

  // Gère l'affichage de la modale
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalSuppVisible, setModalSuppVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [userSelected, setUserSelected] = useState([]);
  const [friendSelected, setFriendSelected] = useState([]);

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
  }, []);

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
  }, []);

  // 3. Functions

  // Fonction pour masquer le clavier lorsque l'utilisateur appuie en dehors du champ de saisie
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Fonction pour vérifier si le user peut etre renvoyer sur la page de modifications
  const handleModifFriend = async (boolean) => {
    // On annule l'action si la modale est affichée
    if (modalLoadingVisible) return;
    // On affiche la modale le temps du fetch
    setModalLoadingVisible(true);

    if (boolean) {
      setModifFriend(true);
    } else {
      setModifFriend(false);
    }
    try {
      // On envoie la donnée de connexion au backend
      const fetchFriendList = await fetch(`${BACK_URL}/users/updateFriends`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: user.token, tokenFriend: tokenFriend, modifFriend: modifFriend }),
      });
      const data = await fetchFriendList.json();
      // Si on a result false, on affiche un message à l'utilisateur
      if (!data.result) {
        setModalLoadingVisible(false);
        setTextError(data.error);
        return;
      }
      setModalVisible(false);
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
        handleModal={() => setModalAddVisible(false)}
        text={`Voulez-vous ajouter:`}
      />
      <AddBuddy
        modalVisible={modalSuppVisible}
        data={dataFriends}
        setBuddiesSelected={setFriendSelected}
        buddiesSelected={friendSelected}
        handleModif={() => handleModifFriend(false)}
        handleModal={() => setModalSuppVisible(false)}
        text={`Voulez-vous supprimer:`}
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

