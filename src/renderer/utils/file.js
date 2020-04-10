const { remote, app } = require('electron')
const fs = require('fs')
const APP = process.type === 'renderer' ? remote.app : app
const userPath = APP.getPath('userData')

// 本地文件检测（目录，文件）
const statFile = function (catalog, fileName) {
  return new Promise(function (resolve, reject) {
    fs.stat(`${userPath}\\${catalog || 'js'}${'\\' + fileName}`, function (error, data) {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

// 创建目录（目录名）
const creationMkdir = function (catalog) {
  return new Promise(function (resolve, reject) {
    fs.mkdir(`${userPath}\\${catalog || 'js'}`, function (error) {
      if (error) return reject(error)
      resolve()
    })
  })
}

// 创建文件或写入数据（目录,文件，数据）
const creationFile = function (catalog, fileName, data) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(`${userPath}\\${catalog || 'js'}\\${fileName}`, data, (error, v) => {
      if (error) return reject(error)
      resolve(v)
    })
  })
}

// 读取文件（目录，文件）
const readFile = function (catalog, fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(`${userPath}\\${catalog || 'js'}\\${fileName}`, function (error, data) {
      if (error) return reject(error)
      resolve(data)
    })
  })
}

export {statFile, creationMkdir, creationFile, readFile}
