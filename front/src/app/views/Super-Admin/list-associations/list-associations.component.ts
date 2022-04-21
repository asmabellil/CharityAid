import { Component, OnInit } from '@angular/core';
import { Association } from '../../../models/Association';
import { AssociationsService } from '../../../services/associations.service';

@Component({
  selector: 'app-list-associations',
  templateUrl: './list-associations.component.html',
  styleUrls: ['./list-associations.component.scss']
})
export class ListAssociationsComponent implements OnInit {

  listAssociations: Association[];
  constructor(private service: AssociationsService) { }

  ngOnInit(): void {
    this.listAssociations = new Array;
    
    this.service.getAssociations().subscribe(
      (data: Association[]) => {
        this.listAssociations = data
      })
  }

}
