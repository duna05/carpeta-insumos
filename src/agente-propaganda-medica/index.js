//Html insumos
const AgentePropagandaMedicaHandlerHtml = require('./handlers/agente-propaganda-medica-handler-html'); 
let agentePropagandaMedicaHandlerHtml = new AgentePropagandaMedicaHandlerHtml();
agentePropagandaMedicaHandlerHtml.documentTypeCreateCommand(
    "Agente de Propaganda Medica", 
    1,
    "resource/APM.html",
    "resource/agente-propaganda-medica-document-type-create-command.json",
);
agentePropagandaMedicaHandlerHtml.ingestCommand("dd8bde05-d98b-a30c-e053-2e00660a8003", 6, "resource/agente-propaganda-medica-ingest-command.json");
agentePropagandaMedicaHandlerHtml.rendererCommandTest(
    "resource/APM.html",
    "resource/agente-propaganda-medica-renderer-command.json"
);

//CSV Generator
const AgentePropagandaMedicaHandlerCsv = require("./handlers/agente-propaganda-medica-handler-csv");
let agentePropagandaMedicaHandlerCsv = new AgentePropagandaMedicaHandlerCsv();
agentePropagandaMedicaHandlerCsv.generate("dd8bde05-d98b-a30c-e053-2e00660a8003", 6, "resource/agente-propaganda-medica.csv");
