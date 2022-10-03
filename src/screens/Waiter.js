import React, { useEffect, useState } from "react";
import Header from "../components/HeaderU";
import Order from "../components/Order";
import settings from "../core/settings.json";
import { StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native-web'

export default function Waiter({ navigation }) {
  const [orders, setOrders] = useState([]);
  useEffect( () => {
    const options = { method: "GET" };

    fetch("http://localhost:8080/api/orders", options)
      .then((response) => response.json())
      .then((response) => cargar(response))
      .catch((err) => console.error(err));
  }, []);

  const cargar=(response)=>{
    console.log(response)
    setOrders(bd)
  }

  const bd=[
    {
      "chef": {
        "id": 0
      },
      "date": "2022-10-03T18:06:10.885Z",
      "id": 0,
      "products": [
        {
          "amount": 0,
          "description": "string",
          "id": 0,
          "nameOrBrand": "string",
          "type": "string"
        }
      ],
      "table": {
        "capacity": 0,
        "id": 0,
        "number": "string"
      }
    }, {
        "chef": {
          "id": 1
        },
        "date": "2022-10-03T18:06:10.885Z",
        "id": 1,
        "products": [
          {
            "amount": 0,
            "description": "string",
            "id": 1,
            "nameOrBrand": "string",
            "type": "string"
          }
        ],
        "table": {
          "capacity": 0,
          "id": 1,
          "number": "string"
        }
      },{
        "chef": {
          "id": 1
        },
        "date": "2022-10-03T18:06:10.885Z",
        "id": 3,
        "products": [
          {
            "amount": 0,
            "description": "string",
            "id": 3,
            "nameOrBrand": "string",
            "type": "string"
          }
        ],
        "table": {
          "capacity": 0,
          "id": 3,
          "number": "string"
        }
      },{
        "chef": {
          "id": 4
        },
        "date": "2022-10-03T18:06:10.885Z",
        "id": 4,
        "products": [
          {
            "amount": 0,
            "description": "string",
            "id": 4,
            "nameOrBrand": "string",
            "type": "string"
          }
        ],
        "table": {
          "capacity": 0,
          "id": 4,
          "number": "string"
        }
      }
    
  ]
  const [id, setId] = useState(null); 

  function getId(id){
    setId(id)
    console.log(id)
  }

  const getContent = () => {
    if (id !=null) {
      return (
        <View style={styles.container}>
            <Text>  pedido{id}</Text>
        </View>
        
      );
   
   
    } else {
        <View style={styles.container}>
            <Text>  pedido{id}</Text>
        </View>
    ;
    }
  };

  return (
    <>
      <Header goBack={navigation.goBack}></Header>
      <Order orders={orders} setOrders={setOrders} getId={getId}></Order>
      {getContent()}
    </>
  );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FDFEFE',
        width: "100%",
        maxWidth: 340,
        height:"30%",
        alignSelf: "center",
        alignItems: "center",
        padding:10

      },
  
})