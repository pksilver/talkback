import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  name: string;
  age: number;
  email: string;
  address: Address;
  hobbies: string[];
  users: Array<any>= [];
  constructor() { }

  ngOnInit() {
    this.name = "John doe";
    this.age = 23;
    this.email = "pk21395@gmail.com";
    this.address = {
      street: "Type I/126 SGPGIMS",
      city: "Delhi",
      state: "Delhi"
    }
    this.hobbies = ["Watch Movie","Write Code","Listen to Music"]
  }
  onSubmit(userForm: NgForm){
    this.users.push(userForm.value)
    //console.log(this.users);
  }

}

interface Address{
  street: string,
  city: string,
  state: string
}
