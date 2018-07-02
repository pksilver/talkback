import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  title = 'Loginworks';
  public logindata = {
    email:null,
    password:null
  }
  constructor(private router: Router, private auth: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    // this.auth.
  }
  onSubmit(login: NgForm){
    let data = login.value;
    this.logindata={
      email:data.femail,
      password:data.fpassword
    }
    this.auth.login(this.logindata).subscribe(res => 
      {
        if(res.error == 0){
          //this.toastr.success(res.message,'Login');
          localStorage.setItem('user',JSON.stringify(res.details));
          this.router.navigate(['/dashboard']);
        }
        else if(res.error == 1){
          alert(res.message);
        }
      },
      err => { console.log(err);});
    // localStorage.setItem('user',JSON.stringify(this.logindata));
    // this.router.navigate(['/dashboard'])
    // console.log(this.logindata);
  }
}
