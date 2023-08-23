import { StyleSheet, Dimensions, BackHandler, ImageBackground } from "react-native";
import { GLOBAL_COLOR } from "./globals";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GLOBAL_COLOR.TERTIARY,
  },
  //
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: GLOBAL_COLOR.PRIMARY,
  },
  btnHome: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontWeight: 700,
  },
  ///

  content: {
    flex: 1,
    // paddingVertical: '5%',
  },
  gestionFriend: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
  },
  ajoutFriend: {
    width: '50%',
    height: '100%',
    alignItems: "center",
    justifyContent: 'center',
  },
  supprFriend: {
    width: '50%',
    height: '100%',
    alignItems: "center",
    justifyContent: 'center',
  },
  btnBuddy: {
    padding : 10,
    // width: "60%",
    // height: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: GLOBAL_COLOR.PRIMARY,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 6, // Ajustez le rayon de l'ombre souhaité
  },
  buddyText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  btnAdd: {
    padding : 10,
    width: "80%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: GLOBAL_COLOR.QUATERNARY,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 6, // Ajustez le rayon de l'ombre souhaité
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  viewLine: {
    alignItems: "center",
  },
  line: {
    width: "85%",
    borderBottomColor: GLOBAL_COLOR.PRIMARY,
    borderBottomWidth: 2,
  },
  textError: {
    height: 30,
    marginBottom: 10,
    textAlign: "center",
    color: "#750000",
    fontSize: 20,
    fontWeight: 700,
    textShadowColor: "white",
    textShadowRadius: 10,
  },
});
