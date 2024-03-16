import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { routeConfig } from '../../app.routes';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  users: User[] = [];
  loading!: Boolean;
  breadcrumbs!: {title: string}[];

  constructor(public userService: UserService){
    this.breadcrumbs = [routeConfig.home, routeConfig.users];
    this.loading = true;
  }

  ngOnInit(): void{
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data
      this.loading = false;
      console.log(data)
    })
  }

  deleteUser(id: number) {
    return this.userService.delete(id).subscribe((response) => {
      this.users = this.users.filter((item) => item.id !== id);
      alert('user deleted successfully');
    })
  }
}
