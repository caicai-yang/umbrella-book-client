function toBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('文件不存在')
    } else if (!/image\/\w+/.test(file.type)) {
      reject('文件类型只能是图片')
    } else {
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = function () {
        const base = this.result
        const res = base.slice(base.indexOf(',') + 1)
        resolve({
          image: encodeURIComponent(res),
          base
        })
      }
    }
  })
}


export {
  toBase64
}

