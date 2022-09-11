import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SingupComponent } from '../singup/singup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup | any;

  constructor(private _http: HttpClient , private _route : Router) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      'fname' : new FormControl(null ,Validators.required),
      'password' : new FormControl(null ,Validators.required)
    })
    
  }
  logindata(login:FormGroup){
    console.log(this.login.value);
    this._http.get<any>("http://localhost:3000/singup")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.fname=== this.login.value.fname && a.password ===this.login.value.password
      });
      if(user){
        alert('you are successfully login');
        this.login.rest();
        this._route.navigate(['dashboard']);
      }else {
        alert ('User Not fund ');
        this._route.navigate(['login']);
      }
    } , res=>{
      alert('somthing was wrong');
    })
    
  }


}
