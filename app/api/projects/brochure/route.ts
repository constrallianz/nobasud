import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function GET() {
  try {
    // Fetch all projects from database
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Create PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // Add header with NOBASUD branding
    doc.setFillColor(15, 23, 42) // slate-900
    doc.rect(0, 0, 210, 40, 'F')
    
    // Add company name
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text('NOBASUD', 20, 20)
    
    // Add subtitle
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('Nos Réalisations', 20, 30)
    
    // Add yellow accent line
    doc.setDrawColor(234, 179, 8) // accent color
    doc.setLineWidth(2)
    doc.line(20, 35, 190, 35)

    // Add date
    doc.setTextColor(100, 116, 139) // slate-500
    doc.setFontSize(10)
    const today = new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    doc.text(`Généré le ${today}`, 20, 50)

    // Add summary statistics
    doc.setTextColor(51, 65, 85) // slate-700
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`Total de projets : ${projects.length}`, 20, 60)

    // Prepare table data
    const tableData = projects.map((project, index) => {
      // Format description
      let description = 'Aucune description'
      if (project.description) {
        description = project.description.length > 100 
          ? project.description.substring(0, 97) + '...' 
          : project.description
      }

      return [
        String(index + 1),
        project.name,
        project.type || 'N/A',
        project.location || 'N/A',
        description,
        new Date(project.createdAt).toLocaleDateString('fr-FR')
      ]
    })

    // Add table with projects
    autoTable(doc, {
      startY: 70,
      head: [['#', 'Projet', 'Type', 'Localisation', 'Description', 'Date']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [15, 23, 42], // slate-900
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [51, 65, 85], // slate-700
        cellPadding: 3
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252] // slate-50
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' }, // #
        1: { cellWidth: 40 }, // Projet
        2: { cellWidth: 25 }, // Type
        3: { cellWidth: 30 }, // Localisation
        4: { cellWidth: 60 }, // Description
        5: { cellWidth: 25, halign: 'center' } // Date
      },
      margin: { left: 20, right: 20 },
      didDrawPage: (data) => {
        // Add footer on each page
        const pageCount = doc.getNumberOfPages()
        const pageHeight = doc.internal.pageSize.height
        
        doc.setFontSize(8)
        doc.setTextColor(148, 163, 184) // slate-400
        doc.text(
          `Page ${data.pageNumber} / ${pageCount}`,
          doc.internal.pageSize.width / 2,
          pageHeight - 10,
          { align: 'center' }
        )
        
        // Add company info in footer
        doc.text(
          'NOBASUD - Construction et Aménagement du Sud',
          20,
          pageHeight - 10
        )
      }
    })

    // Add final page with contact info
    const finalY = (doc as any).lastAutoTable.finalY || 70
    
    if (finalY > 240) {
      doc.addPage()
    }

    const contactY = finalY > 240 ? 40 : finalY + 20

    // Contact section
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42) // slate-900
    doc.text('Contactez-nous', 20, contactY)
    
    doc.setDrawColor(234, 179, 8) // accent
    doc.setLineWidth(1)
    doc.line(20, contactY + 2, 70, contactY + 2)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105) // slate-600
    
    const contactInfo = [
      'Pour plus d\'informations sur nos projets ou pour',
      'discuter de vos besoins, n\'hésitez pas à nous contacter.',
      '',
      'Email : contact@nobasud.com',
      'Telephone : +216 XX XXX XXX',
      'Adresse : XXX, XXX',
      '',
      'Retrouvez tous nos projets sur : www.nobasud.com'
    ]

    let yPos = contactY + 10
    for (const line of contactInfo) {
      doc.text(line, 20, yPos)
      yPos += 6
    }

    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer')

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="NOBASUD-Realisations-${new Date().toISOString().split('T')[0]}.pdf"`
      }
    })

  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF brochure' },
      { status: 500 }
    )
  }
}
