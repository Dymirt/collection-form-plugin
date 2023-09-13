import React from 'react'

const CollectionForm = () => {
    const Client = require('node-regon');

    let gus = Client.createClient({
        key: "ae27223ef7cf4439b68c",
        birVersion: '1.1', // by default 1
        captcha: {
            autofill: false,
            apiKey: "ANTIGATE_API"
        }
    });

    const empty_client_obj = {
        name: null,
        regon: null,
        krs: null,
        workingAddress: null,
        registrationLegalDate: null
    }

    const [client_nip, setClientNip] = React.useState('');
    const [client_data, setClientData] = React.useState(empty_client_obj)
    const [client_message, setClientMessage] = React.useState('')


    const [debtor_nip, setDebtorNip] = React.useState('');
    const [debtor_data, setDebtorData] = React.useState(empty_client_obj)
    const [debtor_message, setDebtorMessage] = React.useState('')


    function getNipDetail(nip) {
        return fetch(`https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=2023-08-29`)
                .then(async response => {
                    return await response;
                });
    }

    async function checkResponse(response){
        const response_json = await response.json();
        if (!response.ok){
            return [empty_client_obj, response_json.message];
        } else {
            return [response_json.result.subject, ''];
        }

    }

    function isValidNip(nip) {
        if(typeof nip !== 'string')
            return false;

        nip = nip.replace(/[\ \-]/gi, '');

        let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        let sum = 0;
        let controlNumber = parseInt(nip.substring(9, 10));
        let weightCount = weight.length;
        for (let i = 0; i < weightCount; i++) {
            sum += (parseInt(nip.substr(i, 1)) * weight[i]);
        }

        return sum % 11 === controlNumber;
    }


    function checkNip(nip) {
        if (isValidNip(nip)){
            return [true, ""];
        } else {
            const nip_length = nip.length;

            switch (nip_length) {
                case (0):
                    return [false, "Pole 'NIP' nie może być puste."];
                case (10):
                    return [false, "Nieprawidłowy 'NIP'"];
                default:
                    return [false, "Pole 'NIP' ma nieprawidłową długość. Wymagane 10 znaków."];
            }
        }
    }
    async function getClientNipDetail(nip) {

        const [is_valid_nip, nip_message] = checkNip(nip);

        if (is_valid_nip) {
            const [subject, message] = await getNipDetail(nip).then(response => checkResponse(response));
            setClientData(subject !== null ? subject : empty_client_obj);
            setClientMessage(subject !== null ? message : `Nie znaleziono nip: ${nip}`);
        } else {
            setClientData(empty_client_obj);
            setClientMessage(nip_message);
        }
    }

    async function getDebtorNipDetail(nip) {
        const [is_valid_nip, nip_message] = checkNip(nip);

        if (is_valid_nip) {
            const [subject, message] = await getNipDetail(nip).then(response => checkResponse(response));
            setDebtorData(subject !== null ? subject : empty_client_obj);
            setDebtorMessage(subject !== null ? message : `Nie znaleziono nip: ${nip}`);
        } else {
            setDebtorData(empty_client_obj);
            setDebtorMessage(nip_message);
        }
    }

    React.useEffect(() => {
        getClientNipDetail(client_nip);
    }, [client_nip]);

    React.useEffect(() => {
        getDebtorNipDetail(debtor_nip);
    }, [debtor_nip]);

    function detailView(obj) {
        return (<>
            <p>Nazwa: <br/>{obj.name}</p>
            <p>REGON: <br/>{obj.regon}</p>
            <p>KRS: <br/>{obj.krs}</p>
            <p>Adres: <br/>{obj.workingAddress}</p>
            <p>Data rozpoczęcia działalności: <br/>{obj.registrationLegalDate}</p>
        </>);
    }

    return (
        <div className='row'>
            <div className='col'>
                <label>Twój NIP</label>
                <input
                    type='text'
                    value={client_nip}
                    onChange={(e) => setClientNip(e.target.value)}
                />
                <div className='error-message'>
                    {client_message !== '' && client_message}
                </div>
                <div>
                    {client_data.name !== null && detailView(client_data)}
                </div>
            </div>
            <div className='col'>
                <label>NIP Dłużnika</label>
                <input
                    type='text'
                    value={debtor_nip}
                    onChange={(e) => setDebtorNip(e.target.value)}
                />
                <div className='error-message'>
                    {debtor_message !== '' && debtor_message}
                </div>
                <div>{debtor_data.name !== null && detailView(debtor_data)}</div>
            </div>
        </div>
    );
}

export default CollectionForm;