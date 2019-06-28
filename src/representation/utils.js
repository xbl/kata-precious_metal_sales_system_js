import fs from 'fs';
import { promisify } from 'util';

// 格式化日期
export const formatDate = (date, formatStr) => {
  if (!date) return formatStr;
	let str = formatStr;
	const weeks = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/yyyy|YYYY/, date.getFullYear());
	str = str.replace(/yy|YY/, (date.getYear() % 100).toString().padStart(2, '0'));
	str = str.replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0'));
	str = str.replace(/M/g, (date.getMonth() + 1));
	str = str.replace(/w|W/g, weeks[date.getDay()]);
	str = str.replace(/dd|DD/, date.getDate().toString().padStart(2, '0'));
	str = str.replace(/d|D/g, date.getDate());
	str = str.replace(/hh|HH/, date.getHours().toString().padStart(2, '0'));
	str = str.replace(/h|H/g, date.getHours());
	str = str.replace(/mm/, date.getMinutes().toString().padStart(2, '0'));
	str = str.replace(/m/g, date.getMinutes());
	str = str.replace(/ss|SS/, date.getSeconds().toString().padStart(2, '0'));
	str = str.replace(/s|S/g, date.getSeconds());
	return str;
};

export const readFile = promisify(fs.readFile);
