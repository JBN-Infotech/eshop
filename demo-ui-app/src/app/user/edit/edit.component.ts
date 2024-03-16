import { Component } from '@angular/core';
import { User } from '../user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { routeConfig } from '../../app.routes';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  id!: number;
  user!: User;
  form!: FormGroup;
  loading!: Boolean;
  breadcrumbs!: {title: string}[];

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.breadcrumbs = [routeConfig.home, routeConfig.users];
    this.loading = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['userId'];

    this.userService.find(this.id).subscribe((data: User) => {
      this.user = data;
      this.breadcrumbs.push({title: `Edit ${data.username}`});
      this.loading = false;
    })

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required)
    });
  }

  

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.userService.update(this.id, this.form.value).subscribe((response: any) => {
      alert('User updated successfully');
      this.router.navigateByUrl('user/index');
    })
  }

}
