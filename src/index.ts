const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;

const configFiles: any = {};
const configFolderPath = path.resolve(__dirname, "config");

async () => {
	const files = await readdir(configFolderPath).catch(console.log);

	for (let i of files) {
		const gitignoreName = i.split(".")[0];
		configFiles[gitignoreName] = path.join(configFolderPath, i);
	}

	const { language } = await inquirer.prompt([
		{
			type: "list",
			message:
				"Which Language do you want to generate the .gitignore for?",
			name: "language",
			choices: Object.keys(configFiles),
		},
	]);
};
