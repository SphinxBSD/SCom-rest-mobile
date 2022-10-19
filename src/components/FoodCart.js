import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import settings from "../core/settings.json";
import { Button as PaperButton } from "react-native-paper";
import CantButton from "./CantButton";

export default function FoodCart(props) {
  const [desc, setDesc] = useState("Descripcion temporal del plato");
  const [cant, setCant] = useState(0);

  const oper = (id, op) => {
    for (var i = 0; i < lista.length; i++) {
      if (id == lista[i].id) {
        setCant(lista[i].amount);
        if (op == "+") {
          lista[i].amount = lista[i].amount + 1;
          map.set(lista[i].id, lista[i].amount);
        } else {
          if (lista[i].amount > 0) {
            lista[i].amount = lista[i].amount - 1;
            map.set(lista[i].id, lista[i].amount);
          }
        }
      }
    }
  };

  const Item = ({ name, url, price, id }) => (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: url }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}> {name}</Text>
        <Text style={styles.infoText}> {price}</Text>
        <Text>{desc}</Text>
        <CantButton
          id={id}
          oper={oper}
          lista={lista}
          cant={cant}
          map={map}
        ></CantButton>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      url={item.urlImage}
      price={item.price}
      id={item.id}
    />
  );

  const p = settings.puerto;
  const u = settings.url;
  const [menuP, setMenuP] = useState([]);
  const [lista, setLista] = useState([]);
  const [map, setMap] = useState(new Map());

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data2 = await fetch(u + p + "/api/foods");

    let platosP = await data2.json();
    platosP = platosP.filter((elem) => elem.available);
    setMenuP(platosP);

    const aux = [];
    const mapaux = new Map();
    for (var i = 0; i < platosP.length; i++) {
      const par = { id: platosP[i].id, amount: 0 };
      aux.push(par);
      mapaux.set(platosP[i].id, 0);
    }

    setMap(mapaux);

    if (props.comida.length == aux.length) {
      console.log("Seteando la comida al array original");
      setLista(props.comida);
    } else {
      setLista(aux);
      props.setComidas(aux);
      console.log("Seteando comidas nuevas");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuP}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 4,
  },
  container: {
    margin: 2,
    flexDirection: "row",
    alignItems: "stretch",
  },
  infoText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  selecc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
