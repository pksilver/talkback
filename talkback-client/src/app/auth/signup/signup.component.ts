import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'Loginworks';
  public signupdata = {
    email:null,
    password:null,
    username:null,
    mobile:null,
    name:null
  }
  constructor(private router: Router, private auth: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(signup: NgForm){
    let data = signup.value;
    this.signupdata={
      email:data.semail,
      password:data.spassword,
      username:data.susername,
      mobile:data.smobile,
      name:data.sname
    }
    
    this.auth.signup(this.signupdata).subscribe(res => 
      {
        if(res.error == 0){
          //this.toastr.success(res.message,'Signup');
          //localStorage.setItem('user',JSON.stringify(res.details));
          this.router.navigate(['/login']);
        }
        else if(res.error == 1){
          alert(res.message);
        }
      },
      err => { console.log(err);});
    //console.log(this.signupdata);
  }
}
