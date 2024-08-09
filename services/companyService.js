const Company = require('../models/Company');
const { saveImage } = require('../helpers/saveImageFunction');


const createCompany = async (companyData) => {
  const company = new Company(companyData);
  await company.save();

  if (companyData.img && typeof companyData.img === 'string') {
    const imgFileName = await saveImage(companyData.img, company._id, "company-img");
    company.img = imgFileName;
    await company.save();
  }

  if (companyData.coverImg && typeof companyData.coverImg === 'string') {
    const coverImgFileName = await saveImage(companyData.coverImg, company._id, "company-coverImg");
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
    const imgFileName = await saveImage(companyData.img, company._id, "company-img");
    company.img = imgFileName;
    await company.save();
  }

  if (companyData.coverImg && typeof companyData.coverImg === 'string') {
    const coverImgFileName = await saveImage(companyData.coverImg, company._id, "company-coverImg");
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
