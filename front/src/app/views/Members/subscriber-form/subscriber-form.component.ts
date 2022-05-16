import { Component, OnInit } from '@angular/core';
import { SubscribersService } from 'src/app/services/subscribers.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.scss']
})
export class SubscriberFormComponent implements OnInit {
  convertedJson!: string;

  constructor(private service: SubscribersService) { }

  ngOnInit(): void {
  }

  fileUpload(event){
    console.log(event.target.files)
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event ) =>{
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(sheet=>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data)
        //this.convertedJson = JSON.stringify(data,undefined,4);
        this.service.addSubscribersJSON(data).subscribe((result)=>{
          console.log('kik!, ' + result)
        }) 
      })
      console.log(workbook);
    }
  }

}
