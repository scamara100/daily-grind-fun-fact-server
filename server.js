import express, { response } from "express"
import axios from "axios"

const app = express()
const port = 3000

app.get('/api/fun-fact', async (req, res) => {
    try{
        const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random')
        res.json(response.data)
    } catch(error){
        if(response.data){
            console.log("API Error:", error.response.status, error.response.data)
            res.status(error.response.status).json({ message : 'Error fetching data from external API.'})
        } else{
            console.log('Network Error: ', error.message)
            res.status(500).json({ message : 'A network error occurred'})
        }
    }
})

app.listen(port, () => {
    console.log("Server is listening on port: " + port)
})