const getServerStatus = (re, res) => {
    res.send('Node server is up & healthy...')
}

module.exports = {
    getServerStatus,
};