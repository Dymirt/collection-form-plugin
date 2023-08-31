import React from 'react'
const CollectionForm = () => {

    const empty_client_obj = {
        name: null,
        statusVat: null,
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


    function checkNip(nip) {
        const nip_length = nip.length

        switch (nip_length) {
            case (0):
                return [false, "Pole 'NIP' nie może być puste."];
            case (10):
                return [true, ""];
            default:
                return [false, "Pole 'NIP' ma nieprawidłową długość. Wymagane 10 znaków."];
        }
    }
    async function getClientNipDetail(nip) {

        const [is_valid_nip, nip_message] = checkNip(nip);

        if (is_valid_nip) {
            const [subject, message] = await getNipDetail(nip).then(response => checkResponse(response));
            setClientData(subject);
        } else {
            setClientData(empty_client_obj);
        }

        setClientMessage(nip_message);

    }

    async function getDebtorNipDetail(nip) {
        const [subject, message] = await getNipDetail(nip).then(response => checkResponse(response));
        setDebtorData(subject);
        setDebtorMessage(message);
    }

    React.useEffect(() => {
        getClientNipDetail(client_nip);
    }, [client_nip]);

    React.useEffect(() => {
        getDebtorNipDetail(debtor_nip);
    }, [debtor_nip]);

    function detailView(obj) {
        return (<>
            <p>{obj.name}</p>
            <p>REGON: {obj.regon}</p>
            <p>KRS: {obj.krs}</p>
            <p>Adres: {obj.workingAddress}</p>
            <p>Data rozpoczęcia działalności {obj.registrationLegalDate}</p>
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
                <div>
                    {client_message !== ''
                        ? client_message
                        : client_data !== null
                            ? detailView(client_data)
                            : `Nie znaleziono nip: ${client_nip}`
                    }
                </div>
            </div>
            <div className='col'>
                <label>NIP Dłużnika</label>
                <input
                    type='text'
                    value={debtor_nip}
                    onChange={(e) => setDebtorNip(e.target.value)}
                />
                <div>
                    {debtor_message !== ''
                        ? debtor_message
                        : debtor_data !== null
                            ? detailView(debtor_data)
                            : `Nie znaleziono nip: ${debtor_nip}`
                    }
                </div>
            </div>
        </div>
    );
}

export default CollectionForm;