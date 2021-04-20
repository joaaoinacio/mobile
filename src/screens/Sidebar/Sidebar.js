import { Body, Button, Col, Container, Content, Grid, Icon, Left, List, ListItem, Text, View, Row } from "native-base";
import React, { Component } from "react";
import { Dimensions, Image, Linking, ImageBackground, Alert } from "react-native";
import AuthController from "../../controllers/AuthController";
import { colors } from "../../theme/colors";
import Routes, { images } from './routes';
import styles from "./style";
import { connect } from 'react-redux';
import Loader from "../../components/Loader";


function SideBar(props) {
  const [loader, setLoader] = React.useState(false);

  function Logout() {
    Alert.alert(
      "Você tem certeza que deseja sair da sua conta?",
      "",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sair", onPress: () => AuthController.loggout() }
      ],
      { cancelable: false }
    );


  };

  async function executeAction(action) {
    try {
      props.navigation.toggleDrawer();
      setLoader(true);
      await action();
    }
    catch (err) {
      //
    }
    finally {
      setLoader(false)
    }
  }

  return (
    <Container style={{ backgroundColor: colors.primary.main }}>
      <Loader isVisible={loader} />
      <ImageBackground source={images.background} style={{ width: '100%', height: '100%' }}>
        <Content
          bounces={false}
          scrollEnabled={false}
          style={{ flex: 1, top: -1 }}
        >
          <List style={{ height: Dimensions.get('window').height * 0.2, alignContent: 'center', justifyContent: 'center' }}>
            <ListItem noBorder>

              <Icon
                active
                name={"user-circle"}
                type="FontAwesome"
                style={{ color: 'white', fontSize: 50, width: 60 }}
              />

              <Body style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{ ...styles.text, textAlign: 'center' }}>
                  {props.user && props.user.user && props.user.user.name}
                </Text>
                <Text style={{ ...styles.textSmall, textAlign: 'center' }}>
                  {props.user && props.user.user && props.user.user.empresa && props.user.user.empresa.fantasia}
                </Text>
              </Body>
            </ListItem>
          </List>
          <List>
            {Routes.map((data, idx) => {
              return (
                <ListItem
                  key={data.name + idx}
                  button
                  noBorder
                  onPress={() => {
                    data.link ?
                      Linking.openURL(data.link) :
                      data.action ?
                        executeAction(data.action) :
                        props.navigation.navigate(data.route, { reload: true })
                  }}
                  style={props.activeItemKey === data.route || props.activeItemKey === data.secondaryRoute ?
                    {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      marginLeft: 0,
                      paddingLeft: 17,
                      borderRightWidth: 3,
                      borderColor: colors.secondary.main
                    } : { backgroundColor: 'transparent' }}
                >
                  <Left style={{ width: 40 }}>
                    {data.icon ?
                      <Icon type={data.icon.type} name={data.icon.name} style={{ fontSize: 25, width: 30, color: 'white' }} /> :
                      <Image source={data.image} style={{ width: 30, height: 30 }} resizeMode="contain" />
                    }
                    <Text style={styles.text}>
                      {data.name}
                    </Text>
                  </Left>
                </ListItem>
              )
            })}
          </List>
        </Content>
        <View style={{ position: 'absolute', zIndex: 99, bottom: 0, width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 }}>
          <Grid>
            <Row style={{ width: '100%' }}>
              <Col>
                <List>
                  <ListItem
                    button
                    noBorder
                    onPress={Logout}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Left>
                      <View style={{ width: 30, height: 30 }}>
                        <Icon
                          name={"close"}
                          type="MaterialIcons"
                          style={{ color: 'white', fontSize: 30 }}
                        />
                      </View>
                      <Text style={styles.text}>
                        Sair
                      </Text>
                    </Left>
                  </ListItem>
                </List>
              </Col>
            </Row>
            <Row style={{ height: 50, width: '100%' }}>
              <Col style={{
                paddingLeft: 12,
                height: 50
              }}>
                <Button transparent iconLeft>
                  {/* <Icon
                    name={"info"}
                    type="FontAwesome"
                    style={{ color: 'white' }}
                  />
                  <Text style={{ color: 'white' }}>Sobre</Text> */}
                </Button>
              </Col>
              <Col style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
                height: 50
              }}>
                <Text style={{ fontSize: 10, color: '#bdbdbd' }}>Versão 1.0.5</Text>
              </Col>
            </Row>
          </Grid>
        </View>
      </ImageBackground>
    </Container>
  )
}

const mapStateToProps = store => ({
  user: store.user.user
});


export default connect(mapStateToProps)(SideBar);

