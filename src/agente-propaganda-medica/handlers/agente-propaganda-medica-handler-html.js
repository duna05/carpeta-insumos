const fs = require('fs');
const { Promise } = require('node-fetch');
const { Buffer } = require('buffer');

class AgentePropagandaMedicaHandlerHtml {
	constructor() {}

	async documentTypeCreateCommand(name, documentTypeAreaId, templateUrl, documentTypeCreateCommandUrl) {

		try {
			let template = await this.readTemplate(templateUrl);
			let attrs = { "numeroVersiones": 10}; 
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
				nombre:{ "$ref": "#/definitions/nombreDef" },
				apellido:{ "$ref": "#/definitions/apellidoDef" },
				dni: { "$ref": "#/definitions/dniDef" },
				matriculacion: { "$ref": "#/definitions/matriculacionDef" },
				vencimiento:{ "$ref": "#/definitions/vencimientoDef" }
			},
			definitions: {
				nombreDef: {
					type: "string"
				},
				apellidoDef: {
					type: "string"
				},
				dniDef: {
					type: "string"
				},
				matriculacionDef: {
					type: "string"
				},
				vencimientoDef: {
					type: "string"
				}
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
			nombre: "Scarlet",
			apellido: "Cortes",
			dni: "12345678",
			matriculacion: "02/08/2022",
			vencimiento: "02/08/2022"
		}
	}
}

module.exports = AgentePropagandaMedicaHandlerHtml;