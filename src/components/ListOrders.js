import React, { useEffect, useState } from "react";
import settings from "../core/settings.json";
import send from "../assets/send.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";

function ListOrders({ item, flagFood, id, orders }) {
  const [cont, setCont] = useState(0);
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
    console.log(id);
    if (id === null) {
        Alert.alert(
            "Error",
            "debe seleccionar un pedido",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    } else {
      let valor = 0;
      let datosFil = orders.filter(function (e) {
        return e.id === id;
      });
      let products = datosFil[0].products;
      let datosFilt = products.filter(function (e) {
        return e.id.productId === idm;
      });
      if (datosFilt.length > 0) {
        valor = cont + datosFilt[0].amount;
      } else {
        valor = cont;
      }

      let dato = {
        products: [
          {
            amount: valor,
            id: idm,
          },
        ],
      };
      if(cont>0){
        Alert.alert(
            "Alerta",
            "¿Estás seguro de  adicionar productos al pedido "+id+" ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => { putData(dato);setCont(0);} }
            ]
          );
      }else{
        Alert.alert(
            "Alerta",
            "No debe existir numeros negativos",
            [

              { text: "OK", onPress: () => console.log("Cancel Pressed")}
            ]
          );
      }
      
      
    }
  };

  const getContent=()=>{
    if(item.available){
        return(
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.urlImage }}></Image>
                <View style={styles.containerDatos}>
                    <Text style={styles.title}>
                    {flagFood === "food" ? item.name : item.brand}
                    </Text>
                    <Text style={styles.title}>Precio: {item.price} Bs</Text>
                    <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => setCont(cont + 1)}>
                        <Image style={styles.imageB} source={plus}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, color: "white" }}>{cont}</Text>
                    <TouchableOpacity onPress={() => setCont(cont - 1)}>
                        <Image style={styles.imageB} source={minus}></Image>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => addValue(item.id)}>
                        <Image style={styles.imageB} source={send}></Image>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
  }

  return (<>
    {getContent()}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 350,
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
  title: {
    fontSize: 18,
    color: "white",
  },
});

export default ListOrders;
