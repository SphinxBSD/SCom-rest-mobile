import React, { useEffect, useState } from "react";
import Header from "../components/HeaderU";
import Order from "../components/Order";
import settings from "../core/settings.json";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Alert,
} from "react-native-web";
import FoodOrder from "../components/FoodOrder";

export default function Waiter({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [flag, setFlag] = useState(true);
  const [flagFood, setflagFood] = useState(true);
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [cont, setCont] = useState(0);

  const handleOnClickdropOrder = (id) => {
    console.log(rest);
    console.log("id" + id);
  };

  const getDatas = async () => {
    const options = { method: "GET" };
    let url = settings.url + settings.puerto + "/api/orders";
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

  useEffect(() => {
    getDatas();
    getFoods();
    getDrinks();
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
      console.log(datosFil)
      return <Text> pedido{id}</Text>;
      
    } 
  };
  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.containerPhone}>
        <View style={styles.containerButon}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../assets/update.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>PEDIDOS</Text>
        <Order
          orders={orders}
          setOrders={setOrders}
          getId={getId}
          setFlag={setFlag}
          flag={true}
          handleOnClick={handleOnClickdropOrder}
        ></Order>
        <View style={styles.containerButon}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require("../assets/update.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>PEDIDOS CONFIRMADOS</Text>
        <Order
          orders={orders}
          setOrders={setOrders}
          getId={getId}
          setFlag={setFlag}
          flag={false}
        ></Order>
        <View style={styles.container}>
          <View style={styles.containerPedido}>
            <Text style={styles.title}>CATEGORIA</Text>
            <TouchableOpacity onPress={() => setflagFood(!flagFood)}>
              <Image
                style={styles.imageP}
                source={require("../assets/food.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setflagFood(!flagFood)}>
              <Image
                style={styles.imageP}
                source={require("../assets/drink.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.containerOrder}>
            <FoodOrder foods={foods} drinks={drinks} flagFood={flagFood} setCont={setCont} cont={cont}/>
          </View>
        </View>

        <View style={styles.containerPro} >{getContent()}</View>
      </View>
    </>
  );
} 
const styles = StyleSheet.create({
  containerPhone: {
    backgroundColor: "#FDFEFE",
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    padding: 5,
    height: "93%",
  },
  container: {
    backgroundColor: "#FDFEFE",
    width: "100%",
    maxWidth: 340,
    height: "30%",
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
    backgroundColor: "#24252A",
    borderRadius: 10,

  },
  containerPro:{
    height: "25%",
    backgroundColor: "#FDFEFE",
  },
});
