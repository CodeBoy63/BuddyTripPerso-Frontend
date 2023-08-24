import { useState, useEffect } from "react";
import { View, ScrollView, Text, StatusBar, TouchableOpacity, SafeAreaView, Keyboard, Modal } from "react-native";
import { BACK_URL } from "@env";

// Import styles
import styles from "../styles/ModifProfilStyles";
import { globalsStyles, GLOBAL_COLOR } from "../styles/globals";

//Import components
import HeaderNav from "../components/HeaderNewTrip";
import InputComponent from "../components/Input";
import LoadingModal from "../components/LoadingModal";

//Import modules

// Import redux
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/reducers/user";

export default function ModifProfilScreen({ route, navigation }) {
  // 1. Redux storage
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // 2. UseEffect, UseState, UseRef
  // États pour gérer les valeurs des champs
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [textError, setTextError] = useState("");
  // Gère l'affichage de la modale
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);

  // Permet de supprimer le message d'erreur dès que l'utilisateur tape un nouveau texte
  useEffect(() => {
    if (textError) setTextError(null);
  }, [username, email, password]);

  // 3. Functions

  // Fonction pour masquer le clavier lorsque l'utilisateur appuie en dehors du champ de saisie
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  //Fonction qui gère la mise à jour des états
  const handleInputChange = (name, value) => {
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  //Fonction gèrer l'affichage de la Modal
  const handleModalVisible = () => {
    if (!(email !== "" && username !== "")) {
      setTextError("Empty fields: username or email");
      return;
    }
    // On vérifie que les passwords matchent
    if (password !== confirmPassword) {
      setTextError("Wrong password confirmation");
      return;
    }
    setModalVisible(true);
  };

  // Boutton de la modal
  const ModalButton = ({ onPress, text }) => (
    <TouchableOpacity style={styles.modifButton} onPress={onPress}>
      <Text style={styles.modifButtonText}>{text}</Text>
    </TouchableOpacity>
  );

  // Fonction de modification du Profil pour renvoyer sur la page de modifications
  const handleModifications = async () => {
    // On annule l'action si la modale est affichée
    if (modalLoadingVisible) return;
    // On affiche la modale le temps du fetch
    setModalLoadingVisible(true);

    try {
      // On envoie les nouvelles donnnées au backend
      const fetchNewDataUser = await fetch(`${BACK_URL}/users/updateInfos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token, username, email }),
      });
      const data = await fetchNewDataUser.json();
      console.log("Data", data);

      // Si on a result false, on affiche un message à l'utilisateur
      if (!data.result) {
        setTextError(data.error);
        setModalLoadingVisible(false);
        return;
      }
      // Si tout est bon on reset les inputs et on redirige sur le ModifProfilScreen du user
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      setEmail("");
      //On modifie les informations dans le reducer user
      dispatch(update({ username: data.userData.username, email: data.userData.email }));
      //On navigate ensuite vers le ProfilScreen
      await navigation.navigate("Profil");
      setModalVisible(false);
      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);
      // Si on a une erreur au moment du fetch, on renvoie une erreur
      setTextError("Erreur lors de l'enregistrement des modifications");
      console.error("Erreur lors de l'envoi au serveur :", error);
    }
  };

  return (
    <>
      <StatusBar translucent={false} backgroundColor={GLOBAL_COLOR.PRIMARY} barStyle="light-content" />
      <SafeAreaView style={{ flex: 0, backgroundColor: GLOBAL_COLOR.PRIMARY }} />
      <SafeAreaView style={styles.screen}>
      <LoadingModal visible={modalLoadingVisible} />
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisible(!modalVisible)}
            activeOpacity={1}
          >
            <View style={styles.modalContent}>
              <Text style={styles.textModal}>Voulez vous appliquer les modifications faites?</Text>
              <View style={styles.btnModal}>
                <ModalButton onPress={handleModifications} text="OUI" />
                <ModalButton onPress={() => setModalVisible(!modalVisible)} text="NON" />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={dismissKeyboard}>
          <HeaderNav title={"Mettre à jour le Profil"} navigation={navigation} />
          <ScrollView style={styles.content}>
            <InputComponent
              key="username"
              name="username"
              placeholder="Username"
              onInputChange={handleInputChange}
              value={username}
            />
            <InputComponent
              key="email"
              name="email"
              placeholder="Email"
              onInputChange={handleInputChange}
              value={email}
            />
            <InputComponent
              key="password"
              name="password"
              type="new-password"
              placeholder="Nouveau mot de passe"
              onInputChange={handleInputChange}
              value={password}
            />
            <InputComponent
              key="confirmPassword"
              name="confirmPassword"
              type="current-password"
              placeholder="Confirmer votre mot de passe"
              onInputChange={handleInputChange}
              value={confirmPassword}
            />
            <Text style={styles.textError}>{textError}</Text>
            <TouchableOpacity style={styles.btnRegister} onPress={handleModalVisible}>
              <Text style={styles.btnText}>Enregistrer les modifications</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

