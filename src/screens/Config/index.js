import { Container, Content } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import ConfigList from './ConfigList';
import { styles } from './styles';

function Config({ ...props }) {

    React.useEffect(() => {

    }, []);


    return (
        <Container style={styles.root}>
            <CustomHeader
                title={"Configurações APP"}
                navigation={props}
            />
            <Content>
                <ConfigList />
            </Content>
        </Container>
    );
}

const mapStateToProps = store => ({
    // 
});


export default connect(
    mapStateToProps,
)(Config);
