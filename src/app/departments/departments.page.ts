import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
})
export class DepartmentsPage implements OnInit {
  departments:any =[];
  uniqueDeptNames:any =[];
  uniqueDept:any = [];
  departmentSub:Subscription;
  newArr:any ={};
  constructor( private router:Router,private deptService:DepartmentService, private alertController:AlertController) { }

  ngOnInit() {
  this.refreshDepartMentList();
  }
  ionViewWillEnter(){
    console.log(this.departments);
    this.refreshDepartMentList();
  }
  refreshDepartMentList(){
    this.departmentSub = this.deptService.departmentList.subscribe(dept =>{
      this.departments = dept;
    });
    this.listDepartMent();
  }
  listDepartMent(){
    for (var i in this.departments) {
      if (!this.uniqueDeptNames.includes(this.departments[i].name)) {
        this.newArr[this.departments[i].name] = {}; 
        this.uniqueDeptNames.push(this.departments[i].name);
        this.uniqueDept.push(this.departments[i]);
      }
      this.newArr[this.departments[i].name][this.departments[i].id] = this.departments[i].dev * 1000 + this.departments[i].qa *500 + 300;
    }  
    this.calculateCosting();
  }
  calculateCosting(){
    var c =0;
    for(var i in this.newArr){
      var sum = 0;
      for(var j in this.newArr[i]){
       sum += this.newArr[i][j];
       this.uniqueDept[c]['cost'] = sum;
      }
      c++;
    }
    
  }
  addDepartment(data){
    const newDeptId = 'D'+ (parseInt(this.uniqueDept.length)+1) + '||1||1';
    const newDept = {
      id: newDeptId,
      name: data.Department,
      managerName: data.Manager,
      dev:0,
      qa:0,
      manager:[

      ]
    }
    this.deptService.addDepartMent(newDept).subscribe(dept =>{
      this.listDepartMent();
    });
  }
viewDept(id){
  this.router.navigate(['/','departments',id]);
}
showPrompt() {
  this.alertController.create({
    message: 'Enter Department Name',
    inputs: [
      {
        name: 'Department',
        placeholder: 'Department',
        
      },
      {
        name: 'Manager',
        placeholder: 'Manager',
        
      }
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
          this.addDepartment(data)
        }
      }
    ]
  }).then(res => {
    res.present();
  });
}

}
