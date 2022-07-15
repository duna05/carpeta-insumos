const fetch = require('node-fetch');
const Parser = require('json2csv').Parser;
const fs = require('fs');
//const Ajv = require("ajv")

class CertificadoResidentesHandlerCsv {

	constructor() { }

	async datasource() {
		return new Promise((resolve, reject) => {
			resolve([
				{
					baid: "dd8bde05-d98b-a30c-e053-2e00660a8003",
					estado: "Pdte de revisión",
					patente: "ERX012",
					nombre: "Axel Lionel",
					apellido: "Blanco",
					cuil: "23352708259",
					calle: "ARENALES",
					altura: "2176",
					depto: "P 01 D 0005",
					lista: [
							"ARENALES 1901-2000",
							"ARENALES 2001-2100",
							"ARENALES 2101-2200",
							"ARENALES 2101-2200",
							"ARENALES 2201-2300",
							"ARENALES 2301-2400",
							"ARENALES 2401-2500",
							"AYACUCHO 1001-1100",
							"AYACUCHO 1101-1200",
							"AYACUCHO 1201-1300",
							"AYACUCHO 1301-1400",
							"AZCUENAGA 1001-1100",
							"AZCUENAGA 1101-1200",
							"AZCUENAGA 1201-1300",
							"AZCUENAGA 1301-1400",
							"BERUTI 2301-2400",
							"BERUTI 2301-2400"
					]
				}
			]);
		});
	}

	async generate(documentTypeId, url) {
		try {
			let datasource = await this.datasource();
			let datasourceMap = await this.datasourceMap(datasource, documentTypeId);
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

	async datasourceMap(datasource, documentTypeId) {
		let fields = ['baID', 'documentTypeId', 'contenido'];
		let opts = { fields };
		let parser = new Parser(opts);
		const csv = parser.parse(datasource
			.map(itemDatasource => {
				let content = this.makeContent(itemDatasource);
				return {
					baID: itemDatasource.baid,
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
			baid: itemDatasource.baid,
			estado: itemDatasource.estado,
			patente: itemDatasource.patente,
			nombre: itemDatasource.nombre,
			apellido: itemDatasource.apellido,
			cuil: itemDatasource.cuil,
			calle: itemDatasource.calle,
			altura: itemDatasource.altura,
			depto: itemDatasource.depto,
			lista: itemDatasource.lista
		}
		return content;
	}
}

module.exports = CertificadoResidentesHandlerCsv;