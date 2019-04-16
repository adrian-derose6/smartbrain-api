const handleProfile = (req, res, database) => {
    const { id } = req.params;
    database.select('*').from('users').where({ id })
    .then(users => {
        if (users.length) {
            res.json(users[0])
        }
        else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleProfile
};