const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.status(200).send('Yes! it is running')
})

app.listen(5000, () => console.log('Yes it is running'))
