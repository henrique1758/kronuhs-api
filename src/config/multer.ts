import aws from "aws-sdk";
import { randomBytes } from "crypto";
import multer, { diskStorage, Options } from "multer";
import multerS3 from "multer-s3";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "temp");

export default {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileHash = randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  })
}

// export function uploadConfig(folder: string) {
//   const storageTypes = {
//     local: diskStorage({
//       destination: (request, file, callback) => {
//         callback(null, resolve(__dirname, '..', '..', 'temp', folder))
//       },
//       filename: (request, file, callback) => {
//         const hash = randomBytes(16).toString('hex');
//         const filename = `${hash}-${file.originalname}`;
  
//         return callback(null, filename);
//       }
//     }),
//     s3: multerS3({
//       s3: new aws.S3({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         region: process.env.AWS_BUCKET_REGION
//       }),
//       bucket: process.env.AWS_BUCKET,
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       acl: 'public-read',
//       key: (request, file, callback) => {
//         const hash = randomBytes(16).toString('hex');
//         const filename = `${hash}-${file.originalname}`;
  
//         return callback(null, filename);
//       }
//     })
//   }

//   const multerData = {
//     dest: resolve(__dirname, '..', '..', 'temp', folder),
//     storage: storageTypes["local"],
//     limits: {
//       fileSize: 2 * 1024 * 1024, // 4MB
//     },
//     fileFilter: (request, file, callback) => {
//       const formats = [
//         'image/jpeg',
//         'image/jpg',
//         'image/png'
//       ];
  
//       if (!formats.includes(file.mimetype)) {
//         callback(new Error("Invalid Format"))
//       }
      
//       callback(null, true);
//     }
//   } as Options;

//   return multerData
// }
