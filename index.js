const express = require('express')
const axios = require('axios')
const parser = require('xml2json')
const fastxml = require('fast-xml-parser')

const app = express()

app.use(express.json())

app.post('/convert/:numero', async (req, res) => {

   
    const request = {
        url: 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso',
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml'
        },
        data: `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <NumberToDollars xmlns="http://www.dataaccess.com/webservicesserver/">
              <dNum>${req.params.numero}</dNum>
            </NumberToDollars>
          </soap:Body>
        </soap:Envelope>`
    }

    const response = await axios(request)
    
    let json = parser.toJson(response.data)
    json = JSON.parse(json)
    
    console.log(json)
    resultado = json['soap:Envelope']['soap:Body']['m:NumberToDollarsResponse']['m:NumberToDollarsResult']
    return res.status(200).json(`converção de xml para json  resultado: ${resultado}`)
})



app.listen(3000, () => { console.log(' Serve  ON 3000...')})