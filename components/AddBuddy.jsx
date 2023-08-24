import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Modal, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { GLOBAL_COLOR } from "../styles/globals";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { MultipleSelectList } from "react-native-dropdown-select-list";
import { SelectList } from "react-native-dropdown-select-list";

export default function AddBuddy(props) {
  // Trouver l'objet correspondant à la clé buddiesSelected dans dataUsers
  const selectedUser = props.data.find((item) => item.key === props.buddiesSelected);

  // Extraire le username de l'objet trouvé
  const selectedUsername = selectedUser ? selectedUser.value.split(" - ")[0] : "";
  
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={props.modalVisible} statusBarTranslucent={false}>
        <StatusBar translucent={false} backgroundColor={GLOBAL_COLOR.PRIMARY} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: GLOBAL_COLOR.PRIMARY }} />
        <View style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.arrow} onPress= {props.handleModal} activeOpacity={0.8}>
              <FontAwesome name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Liste de tes buddies :</Text>
            <View style={styles.fakeView}></View>
          </View>
          <View style={styles.body}>
            <SelectList
              setSelected={(value) => props.setBuddiesSelected(value)}
              data={props.data}
              save="key"
              search={true}
              placeholder="Sélectionne tes buddies"
              searchPlaceholder="recherche"
              notFoundText="aucun buddy trouvé"
              label="Buddies"
              boxStyles={[styles.boxStyles, {}]}
              inputStyles={[styles.inputStyles, {}]}
              dropdownStyles={[styles.dropdownStyles, {}]}
              dropdownItemStyles={styles.dropdownItemStyles}
              badgeStyles={styles.badgeStyles}
            />
            <View style={styles.viewText}>
              <Text style={styles.text}>{props.text}</Text>
              <Text style={styles.buddySelec}>{selectedUsername}</Text>
            </View>
            <TouchableOpacity style={styles.btnSave} onPress={props.handleModif}>
              <Text style={styles.textSave}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: GLOBAL_COLOR.TERTIARY,
  },
  header: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: GLOBAL_COLOR.PRIMARY,
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
  headerTitle: {
    color: GLOBAL_COLOR.TERTIARY,
    fontSize: 20,
    fontWeight: "bold",
  },
  fakeView: {
    width: 60,
    height: 60,
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: "10%",
    paddingBottom: 20,
  },
  boxStyles: {
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 0,
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 4, // Ajustez le rayon de l'ombre souhaité
  },
  dropdownStyles: {
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 0,
  },
  inputStyles: {
    height: 26,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: GLOBAL_COLOR.SECONDARY,
  },
  dropdownItemStyles: {
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 4, // Ajustez le rayon de l'ombre souhaité
  },
  textList: {
    fontSize: 16,
  },
  badgeStyles: {
    backgroundColor: GLOBAL_COLOR.PRIMARY,
  },
  viewText: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderWidth: 2,
    borderColor: GLOBAL_COLOR.PRIMARY,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GLOBAL_COLOR.PRIMARY
  },
  buddySelec: {
    fontSize: 18,
  },
  btnSave: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: GLOBAL_COLOR.PRIMARY,
    shadowOffset: { width: 0, height: 3 }, // Ajustez l'offset souhaité
    shadowOpacity: 0.2, // Ajustez l'opacité souhaitée
    shadowRadius: 4, // Ajustez le rayon de l'ombre souhaité
  },
  textSave: {
    fontSize: 20,
    fontWeight: "bold",
    color: GLOBAL_COLOR.TERTIARY,
  },
});
