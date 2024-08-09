const fs = require('fs');
const path = require('path');
const sharp = require('sharp');


const saveImage = async (base64Data, companyID, type) => {
    console.log(`Saving image for type: ${type}`);
    const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
    if (!matches || matches.length !== 2) {
      throw new Error('Invalid image data');
    }
    const ext = matches[1];
    const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/[a-zA-Z]*;base64,/, ''), 'base64');
  
    let uploadDir;
    switch (type) {
      case "img":
        uploadDir = path.join('./', 'assets', 'companies', 'img');
        break;
      case "coverImg":
        uploadDir = path.join('./', 'assets', 'companies', 'coverImg');
        break;
      default:
        throw new Error(`Unsupported image type: ${type}`);
    }
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  
    const fileName = `${companyID}.webp`;
    const filePath = path.join(uploadDir, fileName);
  
    await sharp(imageBuffer)
      .toFormat('webp')
      .toFile(filePath);
  
    return fileName;
  };

  module.exports = {
    saveImage
  }