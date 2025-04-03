const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

const wizardModel = require("../models/wizardModel");

const exportWizardsCSV = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        res.setHeader("Content-Disposition", "attachment; filename=wizards.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        // Adicionando os dados ao CSV
        wizards.forEach((wizard) => {
            csvStream.write({
                ID: wizard.id,
                Nome: wizard.name,
                Casa: wizard.house_name || "Sem casa"
            });
        });

        csvStream.end(); // Finaliza o stream do CSV
    } catch (error) {
        console.error("Erro ao gerar relatório:", error);
        res.status(500).json({ message: "Erro ao gerar relatório." });
    }
};


const exportWizardsPDF = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        // Configurar a resposta HTTP para PDF
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=wizards.pdf");

        // Criar o documento PDF
        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Bruxos", { align: "center" });
        doc.moveDown();

        // Cabeçalho da tabela
        doc.fontSize(12).text("ID | Nome | Casa", { underline: true });
        doc.moveDown(0.5);

        // Adicionar os dados dos bruxos
        wizards.forEach((wizard) => {
            doc.text(
                `${wizard.id} | ${wizard.name} | ${wizard.house_name || "Sem casa"}`
            );
        });

        doc.end(); // Finalizar e enviar o PDF

    } catch (error) {
        console.error("Erro ao gerar relatório em PDF:", error);
        res.status(500).json({ message: "Erro ao gerar relatório em PDF." });
    }
};

module.exports = { exportWizardsCSV, exportWizardsPDF };

