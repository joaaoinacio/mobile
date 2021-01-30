import { ListItem, Text } from 'native-base';
import React from 'react';

const ListItemTitle = ({ item }) => {

    return (
        <ListItem itemDivider>
            <Text>{item && item.title}</Text>
        </ListItem>
    )
}


export default ListItemTitle;