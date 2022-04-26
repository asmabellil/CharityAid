import { Component, OnInit } from '@angular/core';
import { Association } from '../../../models/Association';
import { AssociationsService } from '../../../services/associations.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AssociationFormComponent } from '../association-form/association-form.component';

@Component({
  selector: 'app-list-associations',
  templateUrl: './list-associations.component.html',
  styleUrls: ['./list-associations.component.scss']
})
export class ListAssociationsComponent implements OnInit {
  associationToUpdate: Association;
  listAssociations: Association[];
  show: Boolean;
  val: String;
  action: boolean;
  bsModalRef: BsModalRef;  
  constructor(private service: AssociationsService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listAssociations = new Array;
    
    this.service.getAssociations().subscribe(
      (data: Association[]) => {
        this.listAssociations = data
      })
    this.associationToUpdate = new Association;
  }

  onUpdate (association){
    this.show = ! this.show;
    this.val = "Update Association";
    this.associationToUpdate = association;
    this.action =false;
    
    this.bsModalRef = this.modalService.show(AssociationFormComponent, {
      initialState :  {
        associationToUpdate : this.associationToUpdate,
        val1: this.val,
        action1: this.action
      }
    });
  }

  onAdd (member){
    this.associationToUpdate = new Association;
    this.show = ! this.show;
    this.val = "Add Association";
    this.action= true;

    this.bsModalRef = this.modalService.show(AssociationFormComponent,{
      initialState: {
        val1: this.val,
        action1: this.action
      }   
    });
  }

  deletMember(association){
    let i= this.listAssociations.indexOf(association);
    this.service.deleteAssociation(this.listAssociations[i]._id).subscribe(
      () => this.listAssociations = this.listAssociations.filter(association => association._id != this.listAssociations[i]._id)
    ); 
  }

}
