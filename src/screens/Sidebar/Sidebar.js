import { Body, Button, Col, Container, Content, Grid, Icon, Left, List, ListItem, Text, View } from "native-base";
import React, { Component } from "react";
import { Dimensions, Image, Linking, ImageBackground } from "react-native";
import AuthController from "../../controllers/AuthController";
import { colors } from "../../theme/colors";
import Routes, { images } from './routes';
import styles from "./style";
import { connect } from 'react-redux'; 



class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  Logout = () => {
    AuthController.loggout()
  };

  render() {
    return (
      <Container style={{backgroundColor: colors.primary.main}}>
        <ImageBackground source={images.background} style={{width: '100%', height: '100%'}}>
        <Content
          bounces={false}
          scrollEnabled={false}
          style={{ flex: 1, top: -1 }}
        >  
          <List style={{height: Dimensions.get('window').height*0.2, alignContent: 'center', justifyContent: 'center'}}>
            <ListItem noBorder>
                  
                    <Icon
                      active
                      name={"user-circle"}
                      type="FontAwesome"
                      style={{ color: 'white', fontSize: 50, width: 60}}
                    />
                 
                  <Body style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{...styles.text, textAlign: 'center'}}>
                      {this.props.user && this.props.user.user && this.props.user.user.name}
                    </Text>
                    <Text style={{...styles.textSmall, textAlign: 'center'}}>
                      {this.props.user && this.props.user.user && this.props.user.user.empresa && this.props.user.user.empresa.fantasia}
                    </Text>
                  </Body>   
              </ListItem>
          </List>
          <List>
              {Routes.map((data, idx) =>{
                  return(
                    <ListItem
                      key={data.name + idx}
                      button
                      noBorder
                      onPress={() => {data.link === undefined ? this.props.navigation.navigate(data.route, {reload: true}) : Linking.openURL(data.link)}}
                      style={ this.props.activeItemKey === data.route ||  this.props.activeItemKey === data.secondaryRoute ? 
                        { 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                          marginLeft: 0, 
                          paddingLeft: 17, 
                          borderRightWidth : 3, 
                          borderColor: colors.secondary.main
                        } : { backgroundColor: 'transparent'}}
                    >
                    <Left style={{width: 40}}>                  
                      <Image source={data.image} style={{width: 30, height: 30, resizeMode: 'center'}}/>
                      <Text style={styles.text}>
                        {data.name}
                      </Text>
                    </Left>
                  </ListItem>
                  )
              })}
                <ListItem
                    button
                    noBorder
                    onPress={this.Logout}
                    style={{ backgroundColor: 'transparent'}}
                  >
                    <Left>                  
                        <View style={{width: 30, height: 30}}>
                          <Icon
                            name={"close"}
                            type="MaterialIcons"
                            style={{ color: 'white', fontSize: 30}}
                          />
                        </View>
                      <Text style={styles.text}>
                        Sair
                      </Text>
                    </Left>                    
                  </ListItem>                  
          </List>
        </Content>
        <View style={{position: 'absolute', zIndex: 99, bottom: 0, width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10}}>
            <Grid>
              <Col style={{
                paddingLeft: 10,
                height: 50
              }}>
                <Button transparent iconLeft>
                    <Icon
                      name={"info"}
                      type="FontAwesome"
                      style={{ color: 'white'}}
                    />
                  <Text style={{color: 'white'}}>Sobre</Text>
                </Button>
              </Col>
              <Col style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
                height: 50
              }}>
                <Text style={{fontSize: 10, color: '#bdbdbd'}}>Versão 1.0.0</Text>
              </Col>
            </Grid>
        </View>
        </ImageBackground> 
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user.user
});  


export default connect(mapStateToProps)(SideBar);

