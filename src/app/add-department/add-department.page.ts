import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.page.html',
  styleUrls: ['./add-department.page.scss'],
})
export class AddDepartmentPage implements OnInit {
  departmentId:any;
  totalAmount = 0;
  managerCount = 1;
  managers = [];
  departMent:any;
  deptSubs:Subscription;
  selectedDepartMent:any;
  constructor(private route:ActivatedRoute, private deptService:DepartmentService, private alertController:AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('id')){
        return
      }
      this.departmentId =paramMap.get('id');
      this.deptSubs = this.deptService.getDepartMent(this.departmentId).subscribe(dept =>{
        this.departMent = dept;
      });
    });
  }
  addDeveloper(id){
    this.deptService.addDeveloper(id).subscribe();
  }
  addQA(id){
    this.deptService.addQA(id).subscribe();
  }
  addManager(department,data){
    const splitId =  department.id.split('||');
    const dept = splitId[0];
    const level = parseInt(splitId[1]) + 1;
    const node = parseInt(department.manager.length) + 1;
    const newDeptId = dept + '||' + level + '||'+ node; 
    const ManagerName = data.Manager;
    const newDept = {
      id: newDeptId,
      name: department.name,
      managerName: ManagerName,
      dev:0,
      qa:0,
      manager:[

      ]
    }
    this.deptService.addDepartMent(newDept, department.id).subscribe();
 
  }
  showManager(managerId:string){
    this.deptSubs = this.deptService.getDepartMent(managerId).subscribe(dept =>{
      this.selectedDepartMent = dept;
    });
  }
  showPrompt(department) {
    this.alertController.create({
      message: 'Enter Manager Name',
      inputs: [
        {
          name: 'Manager',
          placeholder: 'Manager',
          
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
            this.addManager(department, data)
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
