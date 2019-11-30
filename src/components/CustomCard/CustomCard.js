import React from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

export default ({
    title,
    content,
    footer
}) => {
    return (
        <Card>

            <CardItem header>
                <Text>{title}</Text>
            </CardItem>

            <CardItem>
                <Body>
                    {content}
                </Body>
            </CardItem>

            <CardItem footer>
                {footer}
            </CardItem>
            
        </Card>
    );
  
}