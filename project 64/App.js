import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Header } from "react-native-elements";
import dictionary from "./localdb";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      word: "",
      wordReturned: "",
      lexicalCategory: "",
      definition: "",
      isButtonPressed: false,
      word:''
    };
  }

  getWord = (text) => {
    var Text = text.toLowerCase().trim()
    try {
      var word = dictionary[Text]["word"];
      var lexicalCategory = dictionary[Text]["lexicalCategory"];
      var definition = dictionary[Text]["definition"];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
      console.log("hi from try");
    } catch (err) {
      alert("Sorry this word is not available please try something else");
      this.setState({
        text: "",
        isButtonPressed: false,
        lexicalCategory:'',
        definition:'',
        word:''
      });
      console.log(err);
    }
  };

  render() {
    var text = this.state.text;
    var word = this.state.word;

    return (
      <SafeAreaProvider>
        <Header
          leftComponent={{ icon: "menu" }}
          centerComponent={{
            text: "Dictionary",
            style: { fontWeight: "bold", fontSize: 20 },
          }}
        />

        <TextInput
          placeholder="Enter a word..."
          placeholderTextColor="cadetblue"
          value={this.state.text}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
          style={{
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "cornflowerblue",
            alignSelf: "center",
            marginTop: 250,
            paddingLeft: 20,
            paddingVertical: 15,
            paddingRight: 140,
          }}
        />

        <TouchableOpacity
          style={{
            padding: 10,
            alignItems: "center",
            backgroundColor: "darkslateblue",
            marginHorizontal: 800,
            borderRadius: 8,
            borderWidth: 2,
            marginTop:15
          }}
          onPress={() => {
            this.setState({
              word: text,
              wordReturned: word,
              isButtonPressed: true,
            });
            this.getWord(this.state.text);
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={{ marginRight: 10 }}>
              <AntDesign name="search1" size={30} color="white" />
            </View>
            <Text style={{ fontSize: 24, color: "white" }}>Search</Text>
          </View>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Word: {this.state.word}
          </Text>
        </View>

        <View style={{ marginVertical: 5, marginLeft: 5 }}>
          <Text style={{ fontSize: 24 }}>
            Type: {this.state.lexicalCategory}
          </Text>
          <Text style={{ fontSize: 24 }}>
            Definition: {this.state.definition}
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
