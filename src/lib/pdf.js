import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const pdfHelpers = {
  async generateHeroFrequencyPDF(heroData) {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Title
      pdf.setFontSize(24);
      pdf.setTextColor(244, 149, 88); // brand energy color
      pdf.text('Your Hero Frequency', pageWidth / 2, 30, { align: 'center' });

      // Superhero Identity
      pdf.setFontSize(18);
      pdf.setTextColor(16, 31, 31); // brand depth color
      pdf.text(heroData.identity.title, pageWidth / 2, 50, { align: 'center' });

      // Gates
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      let yPosition = 70;
      
      pdf.text(`Personality Sun: Gate ${heroData.gates.personalitySun}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Design Sun: Gate ${heroData.gates.designSun}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Evolution Gate: Gate ${heroData.gates.evolutionGate}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Purpose Gate: Gate ${heroData.gates.purposeGate}`, 20, yPosition);
      yPosition += 20;

      // Identity Details
      pdf.text(`Type: ${heroData.identity.type}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Strategy: ${heroData.identity.strategy}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Profile: ${heroData.identity.profile}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Authority: ${heroData.identity.authority}`, 20, yPosition);
      yPosition += 20;

      // Mantras
      pdf.setFontSize(16);
      pdf.setTextColor(244, 149, 88);
      pdf.text('Your Hero Mantras', 20, yPosition);
      yPosition += 15;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      heroData.mantras.forEach((mantra, index) => {
        const lines = pdf.splitTextToSize(mantra, pageWidth - 40);
        pdf.text(lines, 20, yPosition);
        yPosition += lines.length * 5 + 5;
      });

      // Story Arc (if it fits)
      if (heroData.story && yPosition < pageHeight - 60) {
        pdf.addPage();
        yPosition = 30;
        
        pdf.setFontSize(16);
        pdf.setTextColor(244, 149, 88);
        pdf.text('Your Personal Mythos', 20, yPosition);
        yPosition += 15;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        
        Object.entries(heroData.story).forEach(([stage, content]) => {
          pdf.setFontSize(12);
          pdf.setTextColor(64, 159, 161);
          pdf.text(stage, 20, yPosition);
          yPosition += 10;
          
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
          const lines = pdf.splitTextToSize(content, pageWidth - 40);
          pdf.text(lines, 20, yPosition);
          yPosition += lines.length * 5 + 10;
        });
      }

      return pdf;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  },

  async downloadPDF(heroData, filename = 'hero-frequency.pdf') {
    try {
      const pdf = await this.generateHeroFrequencyPDF(heroData);
      pdf.save(filename);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  },

  async generateShareableLink(heroData) {
    // In a real implementation, you would save the data to a shareable endpoint
    // For now, we'll create a URL with encoded data
    const encodedData = btoa(JSON.stringify(heroData));
    return `${window.location.origin}/shared/${encodedData}`;
  }
};