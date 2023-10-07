const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const getMatch = async (matchId) => {
    const response = await fetch('http://matchservice:4000/api/matches/' + matchId);
    const data = await response.json();
    return data.data.message;
};

const updateMatch = async (matchId, body) => {
    const response = await fetch('http://matchservice:4000/api/matches/' + matchId, {method: 'PUT', body: body});
    const data = await response.json();
    return data.data.message;
};

module.exports = {
    getMatch,
    updateMatch
};