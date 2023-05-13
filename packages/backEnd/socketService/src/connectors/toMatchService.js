const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const getMatch = async (matchId) => {
    const response = await fetch('http://matchservice:4000/match/' + matchId);
    const data = await response.json();
    return data;
};

module.exports = {
    getMatch
};