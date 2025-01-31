// import process from 'node:process';
// import { createProject } from '@cmtlyt/create-origin';
// import gitDown from '@cmtlyt/git-down';
// import { Command, program } from 'commander';
/**
 * 命令行
 *
 * 程序 命令 [参数] --配置 --配置=xxx
 *
 * 程序 [参数] --配置 --配置=xxx --配置 xxx
 *
 */
// split
// program.parse(process.argv);

// import colors from 'yoctocolors';

// console.log(colors.yellow(colors.bold('Yo!')));
// import { createColorize } from 'colorize-template';

// let colorize = createColorize(colors);
// const text = 123;
// console.log(colorize`{red.bold full {yellow ${text}}}`);

// function func(...args: any[]) {
// 	const [strArr, ...param] = args as [string[], ...any];
// 	let str: string = strArr[0];
// 	param.forEach((item, idx) => {
// 		str += item.toString();
// 		str += strArr[idx + 1] || '';
// 	});
// 	return str;
// }

// console.log(func`{red.bold full ${text}{yellow ${text}}}`);

// gitDown(
// 	'https://github.com/un-pany/v3-admin-vite/blob/main/src/common/assets/images/layouts/logo-text-2.png',
// );

// const a: any = {};
// const b = { a };
// a.b = b;

// JSON.stringify(a);

// polyfill
// babel
function zip(...arrs) {
	const padding = arrs.pop();
	const result = [];
	let idx = 0;
	while (true) {
		if (arrs.every((item) => item.length <= idx)) {
			return result;
		}
		const itemArr = arrs.map((arr) => (arr.length > idx ? arr[idx] : padding));
		result.push(itemArr);
		idx++;
	}
}
// const persons = [{}, {}];
// const idx = ['a', 1];

// li.textContent;
// li.id;

// console.log(zip(persons, idx, null));

// arr.map((item, idx) => {});
