const axios = require('axios')
export const uploadFile = function (fileList, url) {
  const formData = new FormData()
  for (let i = 0; i < fileList.length; i++) {
    formData.append('file' + i, fileList[i])
  }
  return axios({
    method: 'POST',
    url: url,
    data: formData
  })
}
