import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Order from "../components/Order";
import FoodOrder from "../components/FoodOrder";
import settings from "../core/settings.json";
import Header from "../components/HeaderU";
import AsyncStorage from "@react-native-async-storage/async-storage";
import update from "../assets/update.png";
import food from "../assets/food.png";
import drink from "../assets/drink.png";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Alert,
} from "react-native";

export default function Waiter({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [flag, setFlag] = useState(true);
  const [flagFood, setflagFood] = useState("food");
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [foodP, setFoodP] = useState([]);
  const [cont, setCont] = useState(0);

  const deleteData = async (id) => {
    let url = settings.url + settings.puerto + "/api/orders/" + id;
    const response = await fetch(url, {
      method: "DELETE",
    });

    const data = await response.json();
    console.log(data);
  };
  const handleOnClickdropOrder = (id) => {
    Alert.alert("Alerta", "¿Estás seguro de eliminar el pedido " + id + " ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteData(id);
          getDatas();
        },
      },
    ]);
  };

  const fetchPatchRequest = async (url) => {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(null),
    });
    return response.json();
  };

  const handleOnClickdelivered = (id) => {
    let url =
      settings.url +
      settings.puerto +
      "/api/orders/" +
      id +
      "?flag=delivered&value=true";

    Alert.alert("Alerta", "¿Estás seguro de entregar el pedido " + id + " ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => fetchPatchRequest(url) },
    ]);
  };

  const handleOnClickConfirOrder = (id) => {
    let url =
      settings.url +
      settings.puerto +
      "/api/orders/" +
      id +
      "?flag=confirmed&value=true";
    Alert.alert("Alerta", "¿Estás seguro de confirmar el pedido " + id + " ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          fetchPatchRequest(url);
          setFlag(true);
        },
      },
    ]);
  };

  const getDatas = async () => {
    const options = { method: "GET" };
    let url =
      settings.url + settings.puerto + "/api/waiters/" + 16 + "/orders/pending";
    console.log(url);
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    setOrders(data);
  };

  const getFoods = async () => {
    const options = { method: "GET" };
    let url = settings.url + settings.puerto + "/api/foods";
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    setFoods(data);
  };

  const getDrinks = async () => {
    const options = { method: "GET" };
    let url = settings.url + settings.puerto + "/api/drinks";
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    setDrinks(data);
  };

  const getFoodP = async () => {
    const options = { method: "GET" };
    let url =
      settings.url +
      settings.puerto +
      "/api/waiters/" +
      16 +
      "/orders/all-prepared";
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
    setFoodP(data);
  };

  useEffect(() => {
    getDatas();
    getFoods();
    getDrinks();
    getFoodP();
  }, []);

  const [id, setId] = useState(null);

  function getId(id) {
    setId(id);
    console.log(id);
  }

  const getContent = () => {
    if (id != null) {
      let datosFil = orders.filter(function (e) {
        return e.id === id;
      });
      console.log(datosFil);
      return <Text> pedido{id}</Text>;
    }
  };
  return (
    <View style={styles.containerPhone}>
      <Header navigation={navigation}></Header>
      <View style={styles.containerButon}>
        <TouchableOpacity onPress={() => getDatas()}>
          <Image style={styles.image} source={update} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>PEDIDOS</Text>
      <Order
        orders={orders}
        setOrders={setOrders}
        getId={getId}
        setFlag={setFlag}
        flag={true}
        handleOnClick={handleOnClickConfirOrder}
        handleOnClickdropOrder={handleOnClickdropOrder}
      ></Order>

      <View style={styles.container}>
        <View style={styles.containerPedido}>
          <Text style={styles.title}>PEDIDO {id}</Text>
          <TouchableOpacity
            onPress={() => {
              setflagFood("food");
            }}
          >
            <Image style={styles.imageP} source={food}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setflagFood("drink")}>
            <Image style={styles.imageP} source={drink}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {getDrinks();getFoods()}}>
            <Image style={styles.image} source={update} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerOrder}>
          <FoodOrder
            foods={foods}
            drinks={drinks}
            flagFood={flagFood}
            id={id}
            orders={orders}
          />
        </View>
        <View style={styles.containerButon}>
          <TouchableOpacity onPress={() => getFoodP()}>
            <Image style={styles.image} source={update}></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>PEDIDOS A ENTREGAR</Text>
        <Order
          orders={foodP}
          setOrders={setFoodP}
          getId={getId}
          setFlag={setFlag}
          flag={false}
          handleOnClickdelivered={handleOnClickdelivered}
        ></Order>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerPhone: {
    backgroundColor: "#FDFEFE",
    width: "100%",
    alignSelf: "center",
    paddingTop: 15,
    height: "100%",
    flex: 1,
    maxWidth: 400,
  },
  container: {
    backgroundColor: "#FDFEFE",
    width: "100%",
    maxWidth: 400,
    height: "35%",
    padding: 5,
    marginTop: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  containerButon: {
    backgroundColor: "#FDFEFE",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 5,
  },
  containerPedido: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageP: {
    width: 30,
    height: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBotton: 10,
    marginTop: 10,
    textAling: "center",
  },
  containerOrder: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#24252A",
    borderRadius: 10,
    height: 165,
    alignSelf: "center",
    alignItems: "center",
  },
});
