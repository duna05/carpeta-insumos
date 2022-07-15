const fs = require('fs');
const { Promise } = require('node-fetch');
const { Buffer } = require('buffer');

class CertificadoResidentesHandlerHtml {
	constructor() {}

	async documentTypeCreateCommand(name, documentTypeAreaId, templateUrl, documentTypeCreateCommandUrl) {

		try {
			let template = await this.readTemplate(templateUrl);
			let attrs = [];
			let schema = this.createSchema();
			let contentBase64 = Buffer.from(template).toString('base64');
			let request = {
				name: name,
				documentTypeAreaId: documentTypeAreaId,
				contentTemplate: template,
				contentBase64Template: contentBase64,
				attrs: attrs,
				schema: JSON.stringify(schema),
			}

			fs.writeFileSync(documentTypeCreateCommandUrl, JSON.stringify(request));
		}

		catch (e) {
			console.log("error", e);
		}
	}

	async readTemplate(url) {
		return new Promise((resolve, reject) => {
			fs.readFile(url, 'utf8', function (err, data) {
				if (err) reject(err);
				resolve(data);
			})
		});
	}

	createSchema() {
		let schemaTemplate = {
			type: "object",
			properties: {
				baid: { "$ref": "#/definitions/baidDef" },
				estado:{ "$ref": "#/definitions/estadoDef" },
				patente: { "$ref": "#/definitions/patenteDef" },
				nombre:{ "$ref": "#/definitions/nombreDef" },
				apellido:{ "$ref": "#/definitions/apellidoDef" },
				cuil: { "$ref": "#/definitions/cuilDef" },
				calle: { "$ref": "#/definitions/calleDef" },
				altura:{ "$ref": "#/definitions/alturaDef" },
				depto:{ "$ref": "#/definitions/deptoDef" },
				lista:{ "$ref": "#/definitions/listaDef" },
			},
			definitions: {
				baidDef: {
					type: "string"
				},
				estadoDef: {
					type: "string"
				},
				patenteDef: {
					type: "string"
				},
				nombreDef: {
					type: "string"
				},
				apellidoDef: {
					type: "string"
				},
				cuilDef: {
					type: "string"
				},
				calleDef: {
					type: "string"
				},
				alturaDef: {
					type: "string"
				},
				deptoDef: {
					type: "string"
				},
				listaDef: {
					type: "array",
					items: [{
						type: "string",
					}]
				},
			}
		}

		return schemaTemplate;
	}

	async rendererCommandTest(templateUrl, documentTypeCreateCommandUrl) {
		try {
			let template = await this.readTemplate(templateUrl);
			let schema = this.createSchema();
			let metaInfo = this.ingestCommandMetaData("22222222222222222");

			let request = {
				template: template,
				schema: JSON.stringify(schema),
				metaInfo: JSON.stringify(metaInfo)
			}

			fs.writeFileSync(documentTypeCreateCommandUrl, JSON.stringify(request));
		}

		catch(e) {
			console.log("error", e);
		}
	}

	ingestCommand(baid, documentTypeId, ingestCommandUrl) {
		let command = {
			baid: baid,
			documentTypeId: documentTypeId,
			documentTypeAttrValues: JSON.stringify(this.ingestCommandMetaData(baid))
		}

		fs.writeFileSync(ingestCommandUrl, JSON.stringify(command));
	}

	ingestCommandMetaData(baid) {
		return {
			baid: baid,
			estado: "Pdte de revisión",
			patente: "LZT927",
			nombre: "Uriel",
			apellido: "Ganz",
			cuil: "20249227316",
			calle: "PUEYRREDON AV.",
			altura: "773",
			depto: "P 04 D 0008",
			lista: [
					"LAVALLE 2501-2600",
					"PASO 401-500",
					"PASO 501-600",
					"PASO 601-700",
					"PASO 701-750",
					"PASO 751-800",
					"SAN LUIS 2401-2500",
					"SAN LUIS 2501-2600",
					"SAN LUIS 2601-2700",
					"TUCUMAN 2401-2500",
					"TUCUMAN 2501-2600",
					"TUCUMAN 2601-2700"
			]
		}
	}
}

module.exports = CertificadoResidentesHandlerHtml;