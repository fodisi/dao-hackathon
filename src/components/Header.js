import React from 'react';
import { Menu, Modal, Icon } from 'semantic-ui-react';
import { AddRecord } from './AddRecord';

export default () => {
    return (
        <Menu style={{ marginTop:'10px' }}>
            <Menu.Item>SecretEvents</Menu.Item>

            <Menu.Menu position="right">
                <Modal trigger={<Menu.Item><Icon name='add' /></Menu.Item>}>
                    <Modal.Header>Create Secret Event</Modal.Header>
                    <Modal.Content>
                        <AddRecord />
                    </Modal.Content>
                </Modal>
            </Menu.Menu>
        </Menu>
    );
};