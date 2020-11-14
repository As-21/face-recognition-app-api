const Clarifai = require('clarifai');
/*
This is done before i knew about environment variables.
I know that it still can be accessed after removing the key with commit history and you shouldn't commit code with your private API key.
Lesson learned and i started implementing API keys with environment variables with future projects.
*/
const app = new Clarifai.App({
    apiKey: 'c0c8f75ca388453d8904998e14174b97'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where({ id: id }).increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0]);
            } else {
                res.status(400).json('User not found');
            }
        })
        .catch(err => res.status(400).json('unable to get count'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}