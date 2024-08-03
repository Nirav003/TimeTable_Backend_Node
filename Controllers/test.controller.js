const getServerStatus = (req, res) => {
    res.send('Node server is up & healthy...')
}

module.exports = {
    getServerStatus,
};