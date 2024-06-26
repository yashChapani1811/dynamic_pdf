import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { htmlContenet } from './data';
import { AppService } from './pdf-viewr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  companyName: FormGroup;
  selectedFile: any;
  imageURL: any;

  htmlConetnt: string = htmlContenet

  constructor(private fb: FormBuilder,
    private _pdfService: AppService) {
    this._defineForm();
  }

  ngOnInit(): void {
  }

  _defineForm() {
    this.companyName = this.fb.group({
      companyName: [''],
      cssClass: [''],
    });
  }

  onFilesSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }



  generatePDFService() {
    this._pdfService.generatePDFFromHTMLContent(
      this.htmlConetnt, 
      this.selectedFile, 
      this.imageURL, 
      this.companyName.get('companyName').value, 
      this.companyName.get('cssClass').value, 
      )
  }





}
