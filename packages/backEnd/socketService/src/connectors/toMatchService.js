const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const getMatch = async (matchId) => {
    const response = await fetch('http://matchservice:4000/api/matches/' + matchId);
    const data = await response.json().data.message;
    return data;
};

module.exports = {
    getMatch
};