import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { AuthContext } from '../../contexts/AuthContext.js';
import { RefreshContext } from '../../contexts/RefreshContext.js';
import { getUserName, getUserBalance } from '../../services/axiosServices.js';

//components


export default function Wallet() {

    const [username, setUsername] = useState('');
    const [userbalance, setUserbalance] = useState(0);
    const { usertoken } = useContext(AuthContext);
    const { refresh } = useContext(RefreshContext);

    useEffect(() => {
        getUserName(usertoken).then((res) => {
            setUsername(res.data);
        })
        .catch((res) => {
            console.log(res.data);
        });
    },[usertoken]);

    useEffect(() => {
        getUserBalance(usertoken).then((res) => {
            setUserbalance(res.data);
        })
        .catch((res) => {
            console.log(res.data);
        });
    },[usertoken, refresh]);

    return (
        <WalletContainer userbalance={userbalance}>
            <header>
                <p>Olá, {username}</p>
                <ion-icon name='log-out-outline' />
            </header>
            <div>
                {/* <TransactionsList /> */}               
                <h3><span>SALDO</span><strong>{userbalance}</strong></h3>
            </div>
            {/* <EntryButton />
            <EntryButton /> */}
        </WalletContainer>
    );
}

const WalletContainer = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
        width: 100vw;
        height: 78px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 24px 0px 24px;
        p {
            font-size: 26px;
            font-weight: 700;
            color: #FFFFFF;
        }
        ion-icon {
            font-size: 24px;
            color: #FFFFFF;
        }
    }
    div {
        background-color: #FFFFFF;
        width: 87vw;
        height: 446px;
        position: relative;
        border: 1px solid #FFFFFF;
        border-radius: 5px;
    }
    h3 {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px 0px 15px;
        font-size: 17px;
        color: #000000;
        font-weight: 700;
        position: absolute;
        bottom: 0px;
        left: 0px;
        strong {
            font-weight: 400;
            color: ${props => Number(props.userbalance)>=0? '#03AC00' : '#C70000'}
        }
    }
`;