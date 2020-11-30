import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap, take, map,switchMap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departments = new BehaviorSubject({
   'D1||1||1': {
      id:'D1||1||1',
      name: 'HR Department',
      managerName: 'Manager1',
      dev: 3,
      qa:2,
      manager: []
    },
    'D2||1||1': {
      id:'D2||1||1',
      name: 'Finance Department',
      managerName: 'Manager2',
      dev: 0,
      qa: 0,
      manager:[{
        id:'D2||2||1',
        name:'Manager3'
      },
    {
      id: 'D2||2||2',
      name: 'Manager4'
    }]
    },
    'D2||2||1': {
    id:'D2||2||1',
    name: 'Finance Department',
    managerName: 'Manager3',
    dev:2,
    qa:5,
    manager:[]
  },
  'D2||2||2': {
    id:'D2||2||2',
    name:'Finance Department',
    managerName: 'Manager4',
    dev:4,
    qa:3,
    manager:[]
  },
  'D3||1||1': {
    id:'D3||1||1',
    name: 'Sales Department',
    managerName: 'Manager5',
    dev:3,
    qa:4,
    manager:[]
  }
});
  get departmentList(){
    return this.departments.asObservable();
  }
  constructor() { }
  addDepartMent(newDept, departId?){
   return this.departments.pipe(take(1),switchMap(dept =>{
     if(departId){
     for(var i in dept){
      
      if(dept[i].id === departId){
        const newMan = {
          id: newDept.id,
          name: newDept.managerName
        }
        dept[i].manager.push(newMan);
        
    }
     }
    }
    return this.departments;
   }),take(1),
   tap(dept =>{
     const newObj = {};
     newObj[newDept.id] = newDept;
      this.departments.next({...dept, ...newObj});
   }))
  }
  getDepartMent(id:string){
    return this.departments.pipe(take(1),map(dept =>{
      return  dept[id];
    }))
  }
  addDeveloper(id:string){
    return this.departments.pipe(take(1),switchMap(dept =>{
      for(var i in dept){
        if(dept[i].id === id){
          dept[i].dev ++;
        }
       }
     return this.departments;
    }),take(1),
    tap(dept =>{
       this.departments.next(dept);
    }))
  }
  addQA(id:string){
    return this.departments.pipe(take(1),switchMap(dept =>{
      for(var i in dept){
        if(dept[i].id === id){
          dept[i].qa ++;
        }
       }
     return this.departments;
    }),take(1),
    tap(dept =>{
       this.departments.next(dept);
    }))
  }

}
