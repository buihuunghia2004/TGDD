const fs = require('fs');
const path = require('path');

/**
 * Creates a folder at the specified path.
 * @param folderPath - The path of the folder to create.
 */
function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder created at: ${folderPath}`);
  } else {
    console.log(`Folder already exists at: ${folderPath}`);
  }
}

/**
 * Creates a file with the specified content.
 * @param filePath - The path of the file to create.
 * @param content - The content to write into the file.
 */
function createFile(filePath, content = '') {
  const folderPath = path.dirname(filePath);

  // Ensure the folder exists before creating the file
  createFolder(folderPath);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`File created at: ${filePath}`);
  } else {
    console.log(`File already exists at: ${filePath}`);
  }
}



const args = process.argv.slice(2);

const main_folder_path = path.join(__dirname, `${args[0]}`);
const dto_folder_path = path.join(__dirname, `${args[0]}/dto`);
const entities_folder_path = path.join(__dirname, `${args[0]}/entities`);

const controller_file_name = `${args[0]}.controller.ts`;
const service_file_name = `${args[0]}.service.ts`;
const repository_file_name = `${args[0]}.repository.ts`;
const module_file_name = `${args[0]}.module.ts`;
const entities_file_name = `${args[0]}.entity.ts`;
//dto
const create_req_dto_file_name = `create-${args[0]}.req.dto.ts`;
const update_req_dto_file_name = `update-${args[0]}.req.dto.ts`;
const list_req_dto_file_name = `list-${args[0]}.req.dto.ts`;
const res_dto_file_name = `${args[0]}.res.dto.ts`;

//create folders
createFolder(main_folder_path);
createFolder(dto_folder_path);
createFolder(entities_folder_path);

//create files
//1. in main folder
createFile(path.join(main_folder_path, controller_file_name));
createFile(path.join(main_folder_path, service_file_name));
createFile(path.join(main_folder_path, repository_file_name));
createFile(path.join(main_folder_path, module_file_name));

//2. in dto folder
createFile(path.join(dto_folder_path, create_req_dto_file_name));
createFile(path.join(dto_folder_path, update_req_dto_file_name));
createFile(path.join(dto_folder_path, list_req_dto_file_name));
createFile(path.join(dto_folder_path, res_dto_file_name));

//3. in entities folder
createFile(path.join(entities_folder_path, entities_file_name));
