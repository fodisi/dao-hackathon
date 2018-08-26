import React from 'react';
import { Menu, Modal, Icon } from 'semantic-ui-react';
import { AddRecord } from './AddRecord';
//import { AcceptDeclineContainer } from './AcceptDeclineContainer';
import { AddReferral } from './AddReferral';

export default () => {
    return (
        <div>
            <Menu style={{ marginTop: '10px' }}>
                <Menu.Item>SecretEvents</Menu.Item>

                <Menu.Menu position="right">
                    <Modal trigger={<Menu.Item><Icon name='add' />Add Event</Menu.Item>}>
                        <Modal.Header>Create Secret Event</Modal.Header>
                        <Modal.Content>
                            <AddRecord />
                        </Modal.Content>
                    </Modal>
                </Menu.Menu>
                <Menu.Menu>
                    <Modal trigger={<Menu.Item>Send Referral</Menu.Item>}>
                        <Modal.Header>Give Referrals to Your Friends</Modal.Header>
                        <Modal.Content>
                            <AddReferral />
                        </Modal.Content>
                    </Modal>
                </Menu.Menu>

            </Menu>
        </div>
    );
};
