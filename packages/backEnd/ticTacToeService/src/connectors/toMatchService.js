const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))

const getMatch = async (matchId) => {
    const response = await fetch('http://matchservice:4000/api/matches/' + matchId);
    const data = await response.json();
    return data.data.message;
};

const endMatch = async (matchId, body) => {
    const response = await fetch('http://matchservice:4000/api/matches/' + matchId + "/endMatch", {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data.data.message;
};
            

module.exports = {
    getMatch,
    endMatch
};