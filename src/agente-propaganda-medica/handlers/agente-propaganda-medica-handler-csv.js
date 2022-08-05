const fetch = require('node-fetch');
const Parser = require('json2csv').Parser;
const fs = require('fs');
//const Ajv = require("ajv")

class AgentePropagandaMedicaHandlerCsv {

	constructor() { }

	async datasource() {
		return new Promise((resolve, reject) => {
			resolve([
				{

					nombre: "Scarlet",
					apellido: "Cortes",
					dni: "12345678",
					matriculacion: "02/08/2022",
					vencimiento: "02/08/2022"
					
				}
			]);
		});
	}

	async generate(baid,documentTypeId, url) {
		try {
			let datasource = await this.datasource();
			let datasourceMap = await this.datasourceMap(datasource, baid, documentTypeId);
			if (datasourceMap.length == 0) {
				console.log("DatasourceEmptyException");
				return;
			}
			fs.writeFileSync(url, datasourceMap);
		}
		catch (e) {
			console.log("generate errror", e);
		}
	}

	async datasourceMap(datasource,baid,documentTypeId) {
		let fields = ['baID', 'documentTypeId', 'contenido'];
		let opts = { fields };
		let parser = new Parser(opts);
		const csv = parser.parse(datasource
			.map(itemDatasource => {
				let content = this.makeContent(itemDatasource);
				return {
					baID: baid,
					documentTypeId: documentTypeId,
					contenido: JSON.stringify(content)
				}
			})
			.filter(x => x.baID != "_")
		);

		return fields.map(x => `"${x}"`).join(",") == csv ? "" : csv;
	}

	makeContent(itemDatasource) {
		let content = {
			nombre: itemDatasource.nombre,
			apellido: itemDatasource.apellido,
			dni: itemDatasource.dni,
			matriculacion: itemDatasource.matriculacion,
			vencimiento: itemDatasource.vencimiento
		}
		return content;
	}
}

module.exports = AgentePropagandaMedicaHandlerCsv;