const path = require('path')
const express = require('express')
const Web3 = require('web3')

const app = express()
const dirname = path.resolve()

const bodyParser = require('body-parser')

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/check', (req, res) => {
	if (!web3.isConnected()) {
		console.log('connected')
	} else {
		console.log('unconnected')
	}

	let transHash = req.body.transactionHash
	let transIndex = req.body.transactionIndex

	transHash = '0x41a5b0c54938b52d055fc875f8da18b2f1a96a5658f7614f229c104a12c22886'

	web3.eth.getTransaction(transHash, (transData) => {
		console.log(transData)
	})
})

app.use(express.static(path.join(dirname, '/frontend')))

app.get('*', (req, res) => res.sendFile(path.resolve(dirname, 'frontend', 'index.html')))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
