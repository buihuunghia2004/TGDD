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

const X_ENTITY_NAME = args[0];
const Y_ENTITY_NAME = X_ENTITY_NAME.replace(X_ENTITY_NAME[0], X_ENTITY_NAME[0].toUpperCase());



//1.CONTENT

//1.1 GET CONTENT
let serice_content = fs.readFileSync(`${__dirname}/stuff/service.txt`, 'utf8');
let controller_content = fs.readFileSync(`${__dirname}/stuff/controller.txt`, 'utf8');
let repository_content = fs.readFileSync(`${__dirname}/stuff/repository.txt`, 'utf8');
let module_content = fs.readFileSync(`${__dirname}/stuff/module.txt`, 'utf8');
let entity_content = fs.readFileSync(`${__dirname}/stuff/entites/entity.txt`, 'utf8');
let create_req_dto_content = fs.readFileSync(`${__dirname}/stuff/dto/create.req.dto.txt`, 'utf8');
let update_req_dto_content = fs.readFileSync(`${__dirname}/stuff/dto/update.req.dto.txt`, 'utf8');
let list_req_dto_content = fs.readFileSync(`${__dirname}/stuff/dto/list.req.dto.txt`, 'utf8');
let res_dto_content = fs.readFileSync(`${__dirname}/stuff/dto/res.dto.txt`, 'utf8');

//1.2 SET CONTENT
serice_content = serice_content.replaceAll('xxx', X_ENTITY_NAME);
serice_content = serice_content.replaceAll('yxx', Y_ENTITY_NAME);
controller_content = controller_content.replaceAll('xxx', X_ENTITY_NAME);
controller_content = controller_content.replaceAll('yxx', Y_ENTITY_NAME);
repository_content = repository_content.replaceAll('xxx', X_ENTITY_NAME);
repository_content = repository_content.replaceAll('yxx', Y_ENTITY_NAME);
module_content = module_content.replaceAll('xxx', X_ENTITY_NAME);
module_content = module_content.replaceAll('yxx', Y_ENTITY_NAME);
entity_content = entity_content.replaceAll('xxx', X_ENTITY_NAME);
entity_content = entity_content.replaceAll('yxx', Y_ENTITY_NAME);
create_req_dto_content = create_req_dto_content.replaceAll('xxx', X_ENTITY_NAME);
create_req_dto_content = create_req_dto_content.replaceAll('yxx', Y_ENTITY_NAME);
update_req_dto_content = update_req_dto_content.replaceAll('xxx', X_ENTITY_NAME);
update_req_dto_content = update_req_dto_content.replaceAll('yxx', Y_ENTITY_NAME);
list_req_dto_content = list_req_dto_content.replaceAll('xxx', X_ENTITY_NAME);
list_req_dto_content = list_req_dto_content.replaceAll('yxx', Y_ENTITY_NAME);
res_dto_content = res_dto_content.replaceAll('xxx', X_ENTITY_NAME);
res_dto_content = res_dto_content.replaceAll('yxx', Y_ENTITY_NAME);


//2.PATH
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

//3.CREATE-FILE
//1. in main folder
createFile(path.join(main_folder_path, controller_file_name), controller_content);
createFile(path.join(main_folder_path, service_file_name), serice_content);
createFile(path.join(main_folder_path, repository_file_name), repository_content);
createFile(path.join(main_folder_path, module_file_name), module_content);

//2. in dto folder
createFile(path.join(dto_folder_path, create_req_dto_file_name), create_req_dto_content);
createFile(path.join(dto_folder_path, update_req_dto_file_name), update_req_dto_content);
createFile(path.join(dto_folder_path, list_req_dto_file_name), list_req_dto_content);
createFile(path.join(dto_folder_path, res_dto_file_name), res_dto_content);

//3. in entities folder
createFile(path.join(entities_folder_path, entities_file_name), entity_content);

