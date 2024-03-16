import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  form!: FormGroup;

  constructor(public userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
    })
  }

  get f(){
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.userService.create(this.form.value).subscribe((response: any) => {
      alert('user created successfully');
      this.router.navigateByUrl('user/index');
    })
  }
}
