import { StyleSheet, Dimensions, BackHandler, ImageBackground } from "react-native";
import { GLOBAL_COLOR } from "./globals";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "40%",
    borderRadius: 5,
    borderWidth:2,
    borderColor: GLOBAL_COLOR.PRIMARY,
    backgroundColor: GLOBAL_COLOR.TERTIARY,
    alignItems: 'center',
    justifyContent: "center",
  },
  error: {
    height: "20%",
    width:"100%",
    alignItems: 'center',
    justifyContent:'flex-end',
  },
  textError: {
    height:"65%",
    width:"100%",
    textAlign: 'center',
    color: '#750000',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowRadius: 10,
  },
  input: {
    width: "80%",
    height: "50%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnModal: {
    width: "100%",
    height: "20%",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modifButton: {
    backgroundColor: GLOBAL_COLOR.PRIMARY,
    width: "55%",
    height: "65%",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  modifButtonText: {
    color:GLOBAL_COLOR.TERTIARY,
    fontWeight: 'bold',
    fontSize: 15,
  },
  //
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: GLOBAL_COLOR.PRIMARY,
  },
  btnHome: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 700,
  },
  content: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: GLOBAL_COLOR.TERTIARY,
  },
  imgContainer: {
    position: 'relative',
  },
  imgEdit: {
    position: 'absolute',
    zIndex: 100,
    bottom: 10,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: GLOBAL_COLOR.PRIMARY,
    borderRadius: 25,
  },
  infos: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  textContainerInnerLeft: {
    alignItems: 'flex-end',
  },
  textInfosBold: {
    color: GLOBAL_COLOR.PRIMARY,
    fontWeight: 700,
    fontSize: 16,
  },
  textInfos: {
    color: GLOBAL_COLOR.PRIMARY,
    fontSize: 17,
  },
  containerFriends: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "60%",
    height: 50,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: GLOBAL_COLOR.QUATERNARY,
    //borderWidth: 2,
    borderColor: GLOBAL_COLOR.PRIMARY,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 6, // Ajustez le rayon de l'ombre souhaité
  },
  textFriends: {
    fontSize: 20,
    color: GLOBAL_COLOR.TERTIARY,
    fontWeight: 700,
  },
  gestion : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    width: '100%',
    paddingBottom: 20,
  },
  containerGestion: {
    backgroundColor: GLOBAL_COLOR.PRIMARY,
    width: '40%',
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 6, // Ajustez le rayon de l'ombre souhaité
    elevation: 5, // Ajoutez la valeur d'élévation souhaitée
  },
  textGestion : {
    color: 'white',
    fontWeight: 700,
    textAlign: 'center'
  }
});
