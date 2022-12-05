import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as uuid from 'uuid'
import * as fs from 'fs'

@Injectable()
export class FilesService {
	createFiles(file, type) {
		try {
			const fileName = uuid.v4() + '.jpeg'
			const filePath = path.resolve(__dirname, '..', 'static', type)
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true })
			}
			fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
			return type + '/' + fileName
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
	removeFile(filename: string, type) {
		try {
			const filePath = path.resolve(
				__dirname,
				'..',
				'static',
				type,
				`${filename}`,
			)
			fs.unlinkSync(filePath)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
