import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  singup: FormGroup | any;
  singuser: any;
  constructor( private _route : Router , private _http :HttpClient , private _toast: ToastrService) { }

  ngOnInit(): void {
    this.singup = new FormGroup({
      'fname': new FormControl(null ,Validators.required),
      'lname' :new FormControl(null ,Validators.required),
      'email' : new FormControl(null ,Validators.required),
      'password' : new FormControl(null ,Validators.required)
    })
    
  }
  singupdata(singup : FormGroup){
    // console.log(this.singup.value );
    this.singuser = this.singup.value.fname ;
    this._http.post<any>("http://localhost:3000/singup" , this.singup.value)
    .subscribe(res=>{
      // this._toast.success(this.singuser , 'You are succefully Sinup');
      alert("Singup Sucessfull");
      this.singup.reset();
      this._route.navigate(['login']);
    } , err=>{
      alert('somthing went wrong');
    })
  }

  

}
