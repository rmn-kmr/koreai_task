const getAllPassenger = async (req, res) => {
    try {
        // url = "https://api.artic.edu/api/v1/agents/search";
        url = "https://api.instantwebtools.net/v1/passenger"
        let agentsData = await require('../helper/utils').fetchAllDataOfApi(url);
        res.status(200).send({data:agentsData})
    } catch (error) {
        res.status(400).send({status: false, errorMessage: error.message})
    }
}
module.exports = {getAllPassenger}