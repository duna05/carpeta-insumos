//Html insumos
const CertificadoResidentesHandlerHtml = require('./handlers/certificado-residentes-handler-html'); 
let certificadoResidentesHandlerHtml = new CertificadoResidentesHandlerHtml();
certificadoResidentesHandlerHtml.documentTypeCreateCommand(
    "Certificado Residentes", 
    2,
    "resource/certificado-residentes.html",
    "resource/certificado-residentes-document-type-create-command.json",
);
certificadoResidentesHandlerHtml.ingestCommand("dd8bde05-d98b-a30c-e053-2e00660a8003", 1, "resource/certificado-residentes-ingest-command.json");
certificadoResidentesHandlerHtml.rendererCommandTest(
    "resource/certificado-residentes.html",
    "resource/certificado-residentes-renderer-command.json"
);

//CSV Generator
const CertificadoResidentesHandlerCsv = require("./handlers/certificado-residentes-handler-csv");
let certificadoResidentesHandlerCsv = new CertificadoResidentesHandlerCsv();
certificadoResidentesHandlerCsv.generate(1, "resource/certificado-residentes.csv");
