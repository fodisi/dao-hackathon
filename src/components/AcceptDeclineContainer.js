import React from 'react';
import { AcceptReferral } from './AcceptReferral';
import { DeclineReferral } from './DeclineReferral';

export const AcceptDeclineContainer = () => {
    return (
        <div>
            <AcceptReferral />
            <DeclineReferral />
        </div>
    );
};