import { Body, Left, ListItem, Right, Text } from 'native-base';
import React from 'react';

const ListItemDefault = ({ item, action }) => {

    return (
        <ListItem thumbnail>
            <Left>

            </Left>
            <Body>
                <Text>{item && item.title}</Text>
                <Text note>{item && item.desc}</Text>
            </Body>
            <Right>
                {action}
            </Right>
        </ListItem>
    )
}


export default ListItemDefault;