import { StyleSheet, Dimensions } from "react-native";
import { globalsStyles, GLOBAL_COLOR } from "../styles/globals";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GLOBAL_COLOR.TERTIARY,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: "10%",
    paddingBottom: 20,
  },
  textError: {
    height: "10%",
    width: "100%",
    textAlign: "center",
    color: "#750000",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowRadius: 10,
  },
  btnRegister: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: GLOBAL_COLOR.QUATERNARY,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 6, // Ajustez le rayon de l'ombre souhaité
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  //Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "40%",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: GLOBAL_COLOR.SECONDARY,
    backgroundColor: GLOBAL_COLOR.TERTIARY,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GLOBAL_COLOR.PRIMARY,
    textAlign: 'center',
  },
  btnModal: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    flexDirection:'row',
    justifyContent: "space-evenly",

  },
  modifButton: {
    backgroundColor: GLOBAL_COLOR.PRIMARY,
    width: "35%",
    height: "65%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  modifButtonText: {
    color: GLOBAL_COLOR.TERTIARY,
    fontWeight: "bold",
    fontSize: 15,
  },
  //
});
