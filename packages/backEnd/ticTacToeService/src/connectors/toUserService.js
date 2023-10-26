const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))

const updateStats = async (userId, isWin) => {
    const response = await fetch('http://userservice:4000/api/users/' + userId + '/updateStats', {
        method: 'PATCH',
        body: JSON.stringify({
            isWin
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data.data.message;
};

module.exports = {
    updateStats
};