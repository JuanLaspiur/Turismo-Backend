const Company = require('../models/Company');
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

const createCompany = async (companyData) => {
  const company = new Company(companyData);
  await company.save();

  if (companyData.img && typeof companyData.img === 'string') {
    const imgFileName = await saveImage(companyData.img, company._id, "img");
    company.img = imgFileName;
    await company.save();
  }

  if (companyData.coverImg && typeof companyData.coverImg === 'string') {
    const coverImgFileName = await saveImage(companyData.coverImg, company._id, "coverImg");
    company.coverImg = coverImgFileName;
    await company.save();
  }

  return company;
};

const updateCompany = async (companyId, companyData) => {
  const company = await Company.findByIdAndUpdate(companyId, companyData, { new: true });
  if (!company) {
    throw new Error('Company not found');
  }

  if (companyData.img && typeof companyData.img === 'string') {
    const imgFileName = await saveImage(companyData.img, company._id, "img");
    company.img = imgFileName;
    await company.save();
  }

  if (companyData.coverImg && typeof companyData.coverImg === 'string') {
    const coverImgFileName = await saveImage(companyData.coverImg, company._id, "coverImg");
    company.coverImg = coverImgFileName;
    await company.save();
  }

  return company;
};

const getCompanies = async () => {
  return await Company.find();
};

const getCompanyById = async (companyId) => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw new Error('Company not found');
  }
  return company;
};

const deleteCompany = async (companyId) => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw new Error('Company not found');
  }
  await Company.findByIdAndDelete(companyId);
};

module.exports = {
  createCompany,
  updateCompany,
  getCompanies,
  getCompanyById,
  deleteCompany
};
