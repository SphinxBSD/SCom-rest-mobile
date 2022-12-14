import React from "react";
import settings from "../core/settings.json";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native-web";

const ListFood = ({ item, setCont, cont, flagFood, id , orders}) => {
  const putData = async (dato) => {
    let url = settings.url + settings.puerto + "/api/orders/" + id;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dato),
    });

    const data = await response.json();
    console.log(data);
  };

  const addValue = (idm) => {
    console.log(id)
    if(id===null){
      Alert.alert("Delete Task", "Are you sure you want to delete the task", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: async () => {
            await deleteTask(id);
            await getUsers();
          },
        },
      ]);
    }else{
      let valor=0
      let datosFil = orders.filter(function (e) {
        return e.id === id;
      });
      let products=datosFil[0].products
      let datosFilt = products.filter(function (e) {
        return e.id.productId === idm;
      });
      if(datosFilt.length>0){
        valor=cont+datosFilt[0].amount
      }else{
        valor=cont;
      }
  
      let dato = {
        products: [
          {
            amount: valor,
            id: idm,
          },
        ],
      };
      putData(dato);
      setCont(0);
    }
 
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={item.urlImage}></Image>
      <View style={styles.containerDatos}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBotton: 10,
            color: "white",
          }}
        >
          {flagFood === "food" ? item.name : item.brand}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: 500, color: "white" }}>
          {" "}
          Precio: {item.price} Bs
        </Text>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => setCont(cont + 1)}>
            <Image
              style={styles.imageB}
              source={require("../assets/plus.svg")}
            ></Image>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 500, color: "white" }}>
            {cont}
          </Text>
          <TouchableOpacity onPress={() => setCont(cont - 1)}>
            <Image
              style={styles.imageB}
              source={require("../assets/minus.svg")}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => addValue(item.id)}>
            <Image
              style={styles.imageB}
              source={require("../assets/send.svg")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "85vw",
    flexDirection: "row",

    maxWidth: 340,
    borderRadius: 10,
    height: 150,
    margin: 5.2,
  },

  image: {
    width: "50%",
    height: "95%",
    borderRadius: 10,
    margin: 3,
  },
  containerDatos: {
    justifyContent: "center",
    textAlign: "center",
    width: "45%",
    height: "95%",

    //backgroundColor: "black",
    margin: 3,
  },
  imageB: {
    width: 30,
    height: 30,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5,
  },
});
export default ListFood;
