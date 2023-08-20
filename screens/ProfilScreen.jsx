import { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, Image, Modal } from "react-native";
import { BACK_URL } from "@env";

// Import styles
import { globalsStyles, GLOBAL_COLOR } from "../styles/globals";
import styles from "../styles/ProfilStyles";

//Import components
import BuddyBubble from "../components/BuddyBubble";
import SvgArrow from "../components/svg/SvgArrow";
import SvgHome from "../components/svg/SvgHome";
import InputComponent from "../components/Input";
import LoadingModal from "../components/LoadingModal";

//Import modules
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Import redux
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../redux/reducers/user";

export default function ProfilScreen({ navigation }) {
  // 1. Redux storage
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  // 2. UseEffect, UseState, UseRef

  // Gère l'affichage de la modale
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);

  // Gère l'affichage du message d'erreur
  const [errorFetch, setErrorFetch] = useState(null);

  // Gère les infos dans les input de la Modal
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Permet de supprimer le message d'erreur dès que l'utilisateur tape un nouveau texte
  useEffect(() => {
    if (errorFetch) setErrorFetch(null);
  }, [email, password]);

  // 3. Functions

  // fonction pour se Deconnecter
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Signin");
  };

  //Fonction qui gère la mise à jour des états en fonction du name renvoyé
  const handleInputChange = (name, value) => {
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  //fonction pour gérer la Modal
  const handleModalVisible = () => {
    setModalVisible(false);
    setErrorFetch(null);
  };
  // Boutton de la modal
  const ModalButton = ({ onPress, text }) => (
    <TouchableOpacity style={styles.modifButton} onPress={onPress}>
      <Text style={styles.modifButtonText}>{text}</Text>
    </TouchableOpacity>
  );

  // Fonction pour vérifier si le user peut etre renvoyer sur la page de modifications
  const handleModifications = async () => {
    // On annule l'action si la modale est affichée
    if (modalLoadingVisible) return;
    // On affiche la modale le temps du fetch
    setModalLoadingVisible(true);

    // On vérifie si les inputs ne sont pas vides
    if (!(email !== "" && password !== "")) {
      setErrorFetch("Empty fields");
      setModalLoadingVisible(false);
      return;
    }
    try {
      // On envoie la donnée de connexion au backend
      const fetchLogin = await fetch(`${BACK_URL}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await fetchLogin.json();
      // Si on a result false, on affiche un message à l'utilisateur
      if (!data.result) {
        setModalLoadingVisible(false);
        setErrorFetch(data.error);
        return;
      }
      // Si tout est bon on reset les inputs et on redirige sur le ModifProfilScreen du user
      setPassword("");
      setEmail("");
      await navigation.navigate("ModifProfil");
      setModalVisible(false);
      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);
      // Si on a une erreur au moment du fetch, on renvoie une erreur
      setErrorFetch("Mauvais email ou mot de passe");
      console.error("Erreur lors de l'envoi au serveur :", error);
    }
  };

  // 4. Return Component

  return (
    <>
      <StatusBar translucent={false} backgroundColor={GLOBAL_COLOR.PRIMARY} barStyle="light-content" />
      <SafeAreaView style={{ flex: 0, backgroundColor: GLOBAL_COLOR.PRIMARY }} />
      <LoadingModal visible={modalLoadingVisible} />
      <SafeAreaView style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <TouchableOpacity style={styles.modalContainer} onPress={handleModalVisible} activeOpacity={1}>
            <View style={styles.modalContent}>
              <View style={styles.error}>
                <Text style={styles.textError}>{errorFetch}</Text>
              </View>
              <View style={styles.input}>
                <InputComponent
                  key="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onInputChange={handleInputChange}
                  value={email}
                  placeholderTextColor="#a9a9a9"
                />
                <InputComponent
                  key="password"
                  name="password"
                  type="current-password"
                  placeholder="Mot de passe"
                  onInputChange={handleInputChange}
                  value={password}
                  placeholderTextColor="#a9a9a9"
                />
              </View>
              <View style={styles.btnModal}>
                <ModalButton onPress={handleModifications} text="Modifier Profil" />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnHome} onPress={() => navigation.navigate("Home")}>
            <SvgHome width={40} height={40} fill="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Profil</Text>
          <View style={styles.btnHome}></View>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.imgContainer} activeOpacity={1}>
            <BuddyBubble size={Dimensions.get("window").width / 2} i={0} buddy={user} />
            <TouchableOpacity style={styles.imgEdit} activeOpacity={0.8}>
              <FontAwesome name="edit" size={30} color={GLOBAL_COLOR.SECONDARY} />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={globalsStyles.lines} />
          <View style={styles.infos}>
            <View style={styles.textContainer}>
              <View style={styles.textContainerInnerLeft}>
                <Text style={styles.textInfosBold}>Username :</Text>
                <Text style={styles.textInfosBold}>Email :</Text>
                <Text style={styles.textInfosBold}>Password :</Text>
              </View>
              <View style={styles.textContainerInnerRight}>
                <Text style={styles.textInfos}>{user.username}</Text>
                <Text style={styles.textInfos}>{user.email}</Text>
                <Text style={styles.textInfos}>***********</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.imgEdit} onPress={() => setModalVisible(!modalVisible)}>
              <FontAwesome name="edit" size={30} color={GLOBAL_COLOR.SECONDARY} />
            </TouchableOpacity>
          </View>
          <View style={globalsStyles.lines} />
          <TouchableOpacity style={styles.containerFriends}>
            <Text style={styles.textFriends}>Liste d'amis</Text>
            <SvgArrow width={40} height={40} fill={GLOBAL_COLOR.TERTIARY} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerFriends}>
            <Text style={styles.textFriends}>Archives</Text>
            <SvgArrow width={40} height={40} fill={GLOBAL_COLOR.TERTIARY} />
          </TouchableOpacity>
          <View style={styles.gestion}>
            <TouchableOpacity style={styles.containerGestion}>
              <Text style={styles.textGestion}>Supprimer Compte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()} style={styles.containerGestion}>
              <Text style={styles.textGestion}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
