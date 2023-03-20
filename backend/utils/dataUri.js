const DatauriParser = require('datauri/parser')
const path = require('path')

const getDataUri = (files) => {
    // console.log(files)
    const parser = new DatauriParser()

    let dataARR = []
    let fileItem = {}

    for (let i in files) {
        fileItem.data = (parser.format(files[i].originalname, files[i].buffer))

        if (fileItem.data) {
            dataARR.push(fileItem.data.content)
            delete fileItem.data
        }
    }
    return dataARR

}

module.exports = getDataUri