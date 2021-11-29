import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';

const HomeScreen = ({ navigation }) => {
  const [lista, setLista] = useState([]);
  const [ciudad, setCiudad] = useState('');
  const [location, setLocation] = useState([]);
  const [temp, setTemp] = useState([]);
  const [consultado, setConsultado]= useState(false);

  const buscar = (ciudad) => {
    const key = 'fda8224083c71ec08e37978736b6b381';
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&units=metric`;
    if(ciudad == ""){
      console.log("Vacio")
    }
    else{
      fetch(api_url)
        .then(data => {
            return data.json();
        }).then(resultado => {
         console.log(resultado);
         console.log(resultado.message)
         if(resultado.message ==="Sin resultados"){
          setConsultado(false);
         }
         else{
          setConsultado(true);
          let tempcoord = 0;
          let temptemp =0;
          let temploc = 0;
          tempcoord = resultado.coord;
          temptemp = resultado.main;
          temploc = resultado.sys;
          let temparreglotemp = [];
          temparreglotemp.push(temptemp.temp);
          temparreglotemp.push(temptemp.temp_max);
          temparreglotemp.push(temptemp.temp_min);
          let temparreglocoord = [];
          temparreglocoord.push(tempcoord.lon);
          temparreglocoord.push(tempcoord.lat);
          let temparregloloc = [];
          temparregloloc.push(temploc.country)
          temparregloloc.push(resultado.name)
          setLista(temparreglotemp);
          setTemp(temparregloloc);
          setLocation(temparreglocoord);
         }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign: "center", fontWeight: "bold",  fontSize: 30}}> Clima </Text>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputStyle={{ backgroundColor: '#E6F3F4' }}
        onChangeText={(texto) => {
          setCiudad(texto)
          buscar(texto);
        }}
        onClear={() => {
          setLista([]);
          setCiudad("")
          setConsultado(false);
        }}
        value={ciudad}
        placeholder="Busca una ciudad..."
      />
      <View>
        {
          consultado 
          ?
          <View>
            <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 23}}> Actual: {lista[0]} c°</Text>
            <Text style={{textAlign: "center", fontWeight: "bold",  fontSize: 23}}> Máxima: {lista[1]} c°</Text>
            <Text style={{textAlign: "center", fontWeight: "bold",  fontSize: 23}}> Mínima: {lista[2]} c°</Text>
            <Button 
                title="Pronostico" 
                onPress={()=>navigation.navigate('DetailScreen',{nombre:temp[1],lon:location[0],lat:location[1]})}
                color='#74727A'
            />
          </View>
          :
          <Text style={{textAlign: "center", fontSize: 23}}>Realiza una busqueda</Text>
        }
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});