import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../shared/user';
import { UsersService } from '../shared/users.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  public form: FormGroup;
  public title: string;
  public user: User = new User();

  constructor(
      public  formBuilder:FormBuilder,
      private router:Router,
      private route: ActivatedRoute,
      private usersService: UsersService
  ) { 
    this.form = formBuilder.group({
      id:[''],
      name: ['',[
        Validators.required,
        Validators.minLength(3)
      ]],
      age: ['',[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern("(0|[1-9]\d*)")
      ]],
      salary: ['',[
        Validators.required,
        Validators.minLength(1)/*,
        Validators.pattern("(0|[1-9]\d*)?(\.\d+)?(?<=\d)")*/
      ]]
    })
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      this.title = id ? 'Edit User': "New User";
      
      if (!id)
        return;

      //this.user.id=id;
      this.form.value.id=id;
      this.usersService.getUser(id)
      .subscribe(
        user => this.user =user,
        response =>{
          if (response.status== 404){
            this.router.navigate(['NotFound']);
          }
        });
    });
  }

  save(){
    var result;
    /*this.user.name=this.form.value.name;
    this.user.age=this.form.value.age;
    this.user.salary=this.form.value.salary; */

    this.user=this.form.value;
    
    if(this.user.id){
      result = this.usersService.udpateUser(this.user);
    }else{
      result = this.usersService.addUser(this.user);
    }

    result.subscribe(data=>{
      this.router.navigate(['users'])
    });
  }



}
