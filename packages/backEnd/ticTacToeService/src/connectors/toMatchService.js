const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))

const getMatch = async (matchId) => {
    try {
        const response = await fetch('http://matchservice:4000/api/matches/' + matchId);
        const data = await response.json();
        return data.data.message;
    } catch (err) {
        return null;
    }
};

const endMatch = async (matchId, body) => {
    try {
        const response = await fetch('http://matchservice:4000/api/matches/' + matchId + "/endMatch", {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data.data.message;
    } catch (err) {
        return null;
    }
};
            

module.exports = {
    getMatch,
    endMatch
};