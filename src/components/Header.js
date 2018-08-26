import React from 'react';
import { Menu, Modal, Icon } from 'semantic-ui-react';
import { AddRecord } from './AddRecord';
import { AddReferral } from './AddReferral';
import { AcceptDeclineContainer } from './AcceptDeclineContainer';
import { AcceptReferral } from './AcceptReferral';

export default () => {
    return (
        <div>
            <Menu style={{ marginTop: '10px' }}>
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

            <Menu style={{ marginTop: '10px', clear: 'both' }}>
                <Menu.Item>Refer Friends</Menu.Item>

                <Menu.Menu position="right">
                    <Modal trigger={<Menu.Item><Icon name='add' /></Menu.Item>}>
                        <Modal.Header>Refer a friend</Modal.Header>
                        <Modal.Content>
                            <AddReferral />
                        </Modal.Content>
                    </Modal>
                </Menu.Menu>
            </Menu>

            <Menu style={{ marginTop: '10px', clear: 'both' }}>
                <Menu.Item>Accept referral</Menu.Item>

                <Menu.Menu position="right">
                    <Modal trigger={<Menu.Item><Icon name='add' /></Menu.Item>}>
                        <Modal.Header>Accept | Decline Referral</Modal.Header>
                        <Modal.Content>
                            <AcceptDeclineContainer />
                        </Modal.Content>
                    </Modal>
                </Menu.Menu>
            </Menu>
        </div>
    );
};