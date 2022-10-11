import React, { useEffect, useState } from "react";
import Header from "../components/HeaderU";
import Order from "../components/Order";
import settings from "../core/settings.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [foodP, setFoodP] = useState([]);
  const [cont, setCont] = useState(0);



  const deleteData = async (id ) =>{
    let url = settings.url + settings.puerto + "/api/orders/"+id;
    const response = await fetch(url, {
        method: 'DELETE'
    });
 
   const data = await response.json( );
    console.log(data);

 };
  const handleOnClickdropOrder = (id) => {
    
    deleteData(id);
    (async()=>{
      await getDatas();
    })();
    console.log("id" + id);
  };

  const fetchPatchRequest = async (url) => {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(null),
    });
    return response.json();
}


const handleOnClickdelivered = (id) => {
  let url = settings.url + settings.puerto + "/api/orders/"+id+"?flag=delivered&value=true";
  fetchPatchRequest(url);
};

  const handleOnClickConfirOrder = (id) => {
    let url = settings.url + settings.puerto + "/api/orders/"+id+"?flag=confirmed&value=true";
    fetchPatchRequest(url);
    console.log("hola");
    console.log("id" + id);
    setFlag(true)

  };

  const getDatas = async () => {
    const options = { method: "GET" };
    let url = settings.url + settings.puerto + "/api/waiters/"+16+"/orders/pending";
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
    let url = settings.url + settings.puerto + "/api/waiters/"+16+"/orders/all-prepared";
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
      console.log(datosFil)
      return <Text> pedido{id}</Text>;
      
    } 
  };
  return (
    <>
      <Header navigation={navigation}></Header>
      <View style={styles.containerPhone}>
        <View style={styles.containerButon}>
          <TouchableOpacity onPress={() => getDatas()}>
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
          handleOnClick={handleOnClickConfirOrder}
          handleOnClickdropOrder={handleOnClickdropOrder}
        ></Order>


        <View style={styles.container}>

          <View style={styles.containerPedido}>

            <Text style={styles.title}>PEDIDO {id}</Text>
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
            <FoodOrder foods={foods} drinks={drinks} flagFood={flagFood} setCont={setCont} cont={cont}  id={id}/>
          </View>
        </View>
        <View style={styles.containerButon}>
          <TouchableOpacity onPress={() => getFoodP()}>
            <Image
              style={styles.image}
              source={require("../assets/update.png")}
            ></Image>
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
    backgroundColor: "#24252A",
    borderRadius: 10,

  },

});
