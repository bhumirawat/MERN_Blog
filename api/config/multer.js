import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})

function fileFilter (req, file, cb) {

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error('Only images are allowed.'), false)
  } else {
    cb(null, true)
  }

}

const upload = multer({ storage: storage, fileFilter: fileFilter })

export default upload