import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() { }

  public generatePDFFromHTMLContent(
    htmlContent: string,
    selectedFile: any,
    imageURL: any,
    companyName: string,
    customStyles: string 
  ) {    
    const content = htmlToPdfmake(htmlContent, {
      defaultStyles: { 
        a: { 
          color: 'purple', 
          decoration: '' 
        },
        h1: {
          color: customStyles.toLowerCase(),
        },
        li: ''
      }
    });
    

    const docDefinition = {
      content: [
        ...content.map((item, index) => { 
          if (item.table) { 
            return {
              ...item,
              pageBreakBefore: index === 0 ? false : true, 
              pageBreakAfter: true
            };
          } else {
            return item;
          }
        })
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center'
        },
        roundedImage: {
          borderRadius: 50 / 2
        },
        h1: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          color: customStyles || '#000', 
        }
      },
      footer: function (currentPage, pageCount) {
        return {
          text: `Page ${currentPage.toString()} of ${pageCount}`,
          alignment: 'center',
          margin: [20, 0, 20, 0]
        };
      },
      header: {
        columns: [
          {
            image: imageURL, 
            width: 50,
            height: 50,
            style: 'roundedImage'
          },
          {
            text: companyName,
            style: 'header'
          }
        ],
        margin: [10, 10, 10, 10]
      },
      pageMargins: [40, 120, 40, 60] 
    };


    console.log('docDefinition: ', docDefinition);
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download("test.pdf");
  }

}